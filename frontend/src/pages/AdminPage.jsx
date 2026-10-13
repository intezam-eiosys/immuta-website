import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import axios from "axios";
import {
  ShieldCheck, LogOut, Mail, Phone, BookOpen, MessageSquare,
  Clock, CheckCheck, Inbox, Lock,
} from "lucide-react";
import { COURSE } from "@/data/course";
import { API_BASE, formatApiErrorDetail } from "@/lib/api";

const loginInputCls =
  "w-full rounded-lg border border-white/10 bg-[#0B060F]/70 px-4 py-3.5 text-sm sm:text-base text-[#F4F1F8] placeholder-[#7A6D8C] outline-none transition-all duration-300 focus:border-[#D4AF37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)]";

function LoginView({ onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_BASE}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success(`Welcome back, ${data.name}.`);
      onLoggedIn(data);
    } catch (ex) {
      setError(formatApiErrorDetail(ex.response?.data?.detail) || ex.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B060F] px-4" data-testid="admin-login-view">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 15%, rgba(154,54,227,0.14), transparent 70%), radial-gradient(ellipse 45% 40% at 85% 85%, rgba(43,11,30,0.9), transparent 70%)",
        }}
      />
      <Toaster position="bottom-right" theme="dark" richColors />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#2B0B1E]/70 to-[#180C1F]/90 p-8 sm:p-10"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1F8]">Admin Dashboard</h1>
            <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
              {COURSE.provider}
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="mt-8 flex flex-col gap-5" data-testid="admin-login-form">
          <div>
            <label htmlFor="admin-email" className="mb-2 block font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#B3A7C2]">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              data-testid="admin-email-input"
              className={loginInputCls}
              placeholder="admin@immuta.tech"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-2 block font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#B3A7C2]">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              data-testid="admin-password-input"
              className={loginInputCls}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="rounded-lg border border-[#FF5E36]/40 bg-[#FF5E36]/10 px-4 py-3 text-sm text-[#FF5E36]" data-testid="admin-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            data-testid="admin-login-btn"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5E36] px-8 py-4 font-display text-base font-semibold text-[#0B060F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E04822] hover:shadow-[0_18px_44px_rgba(255,94,54,0.4)] disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <img src={COURSE.logo} alt="IMMUTA" className="mx-auto mt-8 h-8 w-auto opacity-80" />
      </motion.div>
    </div>
  );
}

const ENQUIRY_ROWS = [
  { icon: Mail, key: "email", label: "Email" },
  { icon: Phone, key: "phone", label: "Phone" },
  { icon: BookOpen, key: "course", label: "Course" },
];

function EnquiryCard({ enquiry, index, onToggle }) {
  const isNew = enquiry.status === "new";
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className={`rounded-2xl border p-6 transition-colors duration-300 ${
        isNew
          ? "border-[#9A36E3]/40 bg-gradient-to-br from-[#2B0B1E]/60 to-[#180C1F]"
          : "border-[#D4AF37]/12 bg-[#180C1F]/50 opacity-75"
      }`}
      data-testid={`admin-enquiry-card-${index + 1}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-[#F4F1F8]" data-testid={`admin-enquiry-name-${index + 1}`}>
            {enquiry.name}
          </p>
          <p className="mt-1 flex items-center gap-1.5 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#7A6D8C]">
            <Clock className="h-3 w-3" />
            {new Date(enquiry.created_at).toLocaleString()}
          </p>
        </div>
        <button
          data-testid={`admin-enquiry-toggle-${index + 1}`}
          onClick={() => onToggle(enquiry.enquiry_id)}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono2 text-[10px] uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-0.5 ${
            isNew
              ? "border-[#9A36E3]/50 bg-[#9A36E3]/15 text-[#E4CBFF] hover:bg-[#9A36E3]/25"
              : "border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20"
          }`}
        >
          <CheckCheck className="h-3.5 w-3.5" />
          {isNew ? "Mark handled" : "Handled"}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {ENQUIRY_ROWS.map(({ icon: Icon, key, label }) => (
          <div key={key} className="rounded-lg border border-[#D4AF37]/15 bg-[#0B060F]/50 px-4 py-3">
            <p className="flex items-center gap-1.5 font-mono2 text-[9px] uppercase tracking-[0.2em] text-[#7A6D8C]">
              <Icon className="h-3 w-3 text-[#D4AF37]" />
              {label}
            </p>
            <p className="mt-1 break-words text-sm text-[#F4F1F8]" data-testid={`admin-enquiry-${key}-${index + 1}`}>
              {enquiry[key]}
            </p>
          </div>
        ))}
      </div>
      {enquiry.message && (
        <div className="mt-3 rounded-lg border border-[#D4AF37]/15 bg-[#0B060F]/50 px-4 py-3">
          <p className="flex items-center gap-1.5 font-mono2 text-[9px] uppercase tracking-[0.2em] text-[#7A6D8C]">
            <MessageSquare className="h-3 w-3 text-[#D4AF37]" />
            Message
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#B3A7C2]">{enquiry.message}</p>
        </div>
      )}
    </motion.article>
  );
}

function Dashboard({ user, onLogout }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API_BASE}/api/enquiries`, { withCredentials: true });
      setEnquiries(data);
    } catch (ex) {
      setError(formatApiErrorDetail(ex.response?.data?.detail) || ex.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id) => {
    try {
      const { data } = await axios.patch(`${API_BASE}/api/enquiries/${id}`, {}, { withCredentials: true });
      setEnquiries((list) => list.map((e) => (e.enquiry_id === id ? data : e)));
    } catch (ex) {
      toast.error(formatApiErrorDetail(ex.response?.data?.detail) || "Could not update enquiry");
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
    } finally {
      onLogout();
    }
  };

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="min-h-screen bg-[#0B060F] text-[#F4F1F8]" data-testid="admin-dashboard">
      <Toaster position="bottom-right" theme="dark" richColors />
      <header className="border-b border-[#D4AF37]/15 bg-[#0B060F]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={COURSE.logo} alt="IMMUTA" className="h-8 w-auto" />
            <span className="hidden font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] sm:block">
              Enquiries · {user.email}
            </span>
          </div>
          <button
            data-testid="admin-logout-btn"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 px-5 py-2.5 font-display text-sm font-semibold text-[#F4F1F8] transition-all duration-300 hover:border-[#FF5E36] hover:bg-[#FF5E36]/10 hover:text-[#FF5E36]"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center gap-3" data-testid="admin-stats">
          <span className="rounded-full border border-[#D4AF37]/30 bg-[#2B0B1E]/50 px-4 py-2 font-mono2 text-xs tracking-[0.1em] text-[#F4F1F8]" data-testid="admin-stat-total">
            Total · {enquiries.length}
          </span>
          <span className="rounded-full border border-[#9A36E3]/40 bg-[#9A36E3]/10 px-4 py-2 font-mono2 text-xs tracking-[0.1em] text-[#E4CBFF]" data-testid="admin-stat-new">
            New · {newCount}
          </span>
          <span className="rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-4 py-2 font-mono2 text-xs tracking-[0.1em] text-[#10B981]" data-testid="admin-stat-handled">
            Handled · {enquiries.length - newCount}
          </span>
        </div>

        {loading ? (
          <div className="mt-14 flex items-center justify-center gap-3 text-[#7A6D8C]" data-testid="admin-loading">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37]" />
            Loading enquiries…
          </div>
        ) : error ? (
          <p className="mt-10 rounded-xl border border-[#FF5E36]/40 bg-[#FF5E36]/10 px-5 py-4 text-sm text-[#FF5E36]" data-testid="admin-error">
            {error}
          </p>
        ) : enquiries.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#D4AF37]/25 py-20 text-center" data-testid="admin-empty">
            <Inbox className="h-10 w-10 text-[#D4AF37]/50" />
            <p className="font-display text-lg font-semibold text-[#F4F1F8]">No enquiries yet</p>
            <p className="max-w-sm text-sm text-[#7A6D8C]">
              New submissions from the course page enquiry form will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {enquiries.map((enquiry, i) => (
              <EnquiryCard key={enquiry.enquiry_id} enquiry={enquiry} index={i} onToggle={toggle} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-[#D4AF37]/10 py-8 text-center">
        <p className="flex items-center justify-center gap-2 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#7A6D8C]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
          {COURSE.provider} · Admin
        </p>
      </footer>
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/auth/me`, { withCredentials: true })
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B060F]" data-testid="admin-checking">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37]" />
      </div>
    );
  }
  if (user) return <Dashboard user={user} onLogout={() => setUser(null)} />;
  return <LoginView onLoggedIn={setUser} />;
}
