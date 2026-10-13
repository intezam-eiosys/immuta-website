from fastapi import FastAPI, APIRouter, Request, HTTPException, Depends, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from typing import List, Optional
import os
import re
import ipaddress
import uuid
import logging
import bcrypt
import jwt
import httpx
from pathlib import Path
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"


# ---------- Models ----------

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    course: str = Field(min_length=1, max_length=200)
    message: Optional[str] = Field(default="", max_length=2000)


class EnquiryOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    enquiry_id: str
    name: str
    email: str
    phone: str
    course: str
    message: str
    status: str
    created_at: str


class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


# ---------- Auth helpers ----------

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, user_id: str, email: str):
    response.set_cookie(
        key="access_token", value=create_access_token(user_id, email),
        httponly=True, secure=True, samesite="none", max_age=900, path="/",
    )
    response.set_cookie(
        key="refresh_token", value=create_refresh_token(user_id),
        httponly=True, secure=True, samesite="none", max_age=604800, path="/",
    )


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"user_id": payload["sub"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    user.pop("password_hash", None)
    return user


async def get_admin_user(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ---------- Email (Emergent managed Resend integration) ----------

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code}): {e.response.json().get('message', '')}")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


def enquiry_notification_html(enquiry: EnquiryCreate, created_at: str) -> str:
    rows = [
        ("Full Name", enquiry.name),
        ("Email ID", enquiry.email),
        ("Phone Number", enquiry.phone),
        ("Interested Course", enquiry.course),
        ("Message", enquiry.message or "-"),
    ]
    cells = "".join(
        f'<tr>'
        f'<td style="padding:8px 16px 8px 0;font-family:Arial,sans-serif;font-size:13px;color:#7A6D8C;vertical-align:top">{escape(label)}</td>'
        f'<td style="padding:8px 0;font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a"><strong>{escape(value)}</strong></td>'
        f'</tr>'
        for label, value in rows
    )
    return (
        '<table role="presentation" width="100%" style="background:#f6f2f8">'
        '<tr><td style="padding:24px">'
        '<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #e5dce8;border-radius:10px">'
        f'<tr><td style="padding:20px 24px;border-bottom:1px solid #eee2f2;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;color:#2B0B1E">New course enquiry</td></tr>'
        f'<tr><td style="padding:16px 24px;font-family:Arial,sans-serif;font-size:13px;color:#7A6D8C">Received {escape(created_at)} (UTC)</td></tr>'
        f'<tr><td style="padding:8px 24px 20px"><table role="presentation" width="100%">{cells}</table></td></tr>'
        '<tr><td style="padding:16px 24px;border-top:1px solid #eee2f2;font-family:Arial,sans-serif;font-size:12px;color:#888">Open your admin dashboard to manage this enquiry. '
        f'Sent by {escape(EMAIL_FROM_NAME)}. We never ask for your password or card details by email.</td></tr>'
        '</table></td></tr></table>'
    )


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/enquiries", response_model=EnquiryOut)
async def create_enquiry(input: EnquiryCreate):
    now = datetime.now(timezone.utc)
    enquiry = EnquiryOut(
        enquiry_id=str(uuid.uuid4()),
        name=input.name.strip(),
        email=input.email.lower(),
        phone=input.phone.strip(),
        course=input.course,
        message=input.message.strip() if input.message else "",
        status="new",
        created_at=now.isoformat(),
    )
    await db.enquiries.insert_one(enquiry.model_dump())

    email_status = "sent"
    try:
        await send_email(
            to=os.environ["OWNER_EMAIL"],
            subject="New course enquiry - IMMUTA Technologies",
            html=enquiry_notification_html(input, now.strftime("%d %b %Y, %H:%M")),
        )
    except Exception as e:
        email_status = "failed"
        logger.warning(f"Owner notification not sent for enquiry {enquiry.enquiry_id}: {e}")

    return {**enquiry.model_dump(), "email_status": email_status}


@api_router.get("/enquiries", response_model=List[EnquiryOut])
async def list_enquiries(admin: dict = Depends(get_admin_user)):
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


@api_router.patch("/enquiries/{enquiry_id}", response_model=EnquiryOut)
async def toggle_enquiry_status(enquiry_id: str, admin: dict = Depends(get_admin_user)):
    doc = await db.enquiries.find_one({"enquiry_id": enquiry_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    new_status = "handled" if doc.get("status") == "new" else "new"
    await db.enquiries.update_one({"enquiry_id": enquiry_id}, {"$set": {"status": new_status}})
    return {**doc, "status": new_status}


@api_router.post("/auth/login")
async def login(input: LoginIn, request: Request, response: Response):
    email = input.email.lower().strip()
    identifier = f"{_client_ip(request)}:{email}"

    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("locked_until"):
        locked_until = attempt["locked_until"]
        if isinstance(locked_until, str):
            locked_until = datetime.fromisoformat(locked_until)
        if datetime.now(timezone.utc) < locked_until:
            raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(input.password, user.get("password_hash", "")):
        if attempt and attempt.get("locked_until") is None:
            count = attempt.get("count", 0) + 1
        elif attempt:
            count = 1
        else:
            count = 1
        update = {
            "identifier": identifier,
            "count": count,
            "locked_until": None,
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
        if count >= 5:
            update["count"] = 0
            update["locked_until"] = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
        await db.login_attempts.update_one(
            {"identifier": identifier}, {"$set": update}, upsert=True
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})
    set_auth_cookies(response, user["user_id"], user["email"])
    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "name": user.get("name", "Admin"),
        "role": user.get("role", "admin"),
    }


@api_router.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"user_id": payload["sub"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    set_auth_cookies(response, user["user_id"], user["email"])
    return {"status": "refreshed"}


@api_router.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"status": "logged out"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    try:
        admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
        admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
        existing = await db.users.find_one({"email": admin_email})
        if existing is None:
            await db.users.insert_one({
                "user_id": str(uuid.uuid4()),
                "email": admin_email,
                "password_hash": hash_password(admin_password),
                "name": "Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
            logger.info("Admin user seeded")
        elif not verify_password(admin_password, existing.get("password_hash", "")):
            await db.users.update_one(
                {"email": admin_email},
                {"$set": {"password_hash": hash_password(admin_password)}},
            )
            logger.info("Admin password hash updated from env")

        await db.users.create_index("email", unique=True)
        await db.login_attempts.create_index("identifier")
        await db.enquiries.create_index("created_at")
    except Exception as e:
        logger.error(f"Startup seeding/indexing error: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
