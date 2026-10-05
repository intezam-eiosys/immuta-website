export const COURSE = {
  provider: "IMMUTA Technologies",
  name: "Immuta Quantum Security Specialist Certificate",
  eyebrow: "IMMUTA Technologies — Certification Track",
  description:
    "Here lies the point where quantum computing is a cybersecurity necessity. Cybersecurity professionals advance from quantum theory to Shor's algorithm, quantum threats, post-quantum cryptography, and enterprise migration strategies.",
  stats: [
    { label: "Tuition", value: "$1,499" },
    { label: "Duration", value: "8 Weeks" },
    { label: "Level", value: "L2 · Advanced" },
    { label: "Hands-on Labs", value: "4" },
  ],
  competency: "L2 — Quantum Security Analyst + PQC Migration Specialist",
  price: "$1,499",
  duration: "8 Weeks",
  contact: {
    phone: "+123 456 789",
    email: "domain@gmail.com",
    address: "123 Creative Lane London, SW1A 1AA UK",
  },
  logo: "/brand/immuta-logo.webp",
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1735744583234-ff1829001965?crop=entropy&cs=srgb&fm=jpg&q=85",
  servers:
    "https://images.unsplash.com/photo-1639066648921-82d4500abf1a?crop=entropy&cs=srgb&fm=jpg&q=85",
  fiber:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=srgb&fm=jpg&q=85",
  analyst:
    "https://images.unsplash.com/photo-1623479322729-28b25c16b011?crop=entropy&cs=srgb&fm=jpg&q=85",
};

export const NAV_LINKS = [
  { label: "Overview", id: "overview" },
  { label: "Skills", id: "skills" },
  { label: "Labs", id: "labs" },
  { label: "Curriculum", id: "curriculum" },
  { label: "FAQ", id: "faq" },
];

export const MARQUEE_ITEMS = [
  "Shor's Algorithm",
  "NIST FIPS 203 · Kyber",
  "Dilithium",
  "Falcon",
  "Harvest Now, Decrypt Later",
  "Quantum Threat Modeling",
  "PQC Migration",
  "Grover's Algorithm",
  "QFT",
  "RSA Impact",
];

export const FEATURES = [
  {
    title: "Shor's Algorithm & Cryptography Implications",
    body: "Understand the Quantum Fourier Transform and Shor's Algorithm — including their implications for integer factorization and RSA cryptography.",
    tag: "RSA-2048 · FACTORING RISK",
  },
  {
    title: "Quantum Security Analysis",
    body: "Analyze the major cybersecurity threats associated with quantum computing — from Harvest Now, Decrypt Later to long-term confidentiality exposure.",
    tag: "THREAT ANALYSIS",
  },
  {
    title: "Post-Quantum Cryptography",
    body: "Explore post-quantum cryptography and the migration from classical cryptographic systems to quantum-resistant security. The curriculum covers NIST-standardized post-quantum algorithms and their enterprise adoption.",
    tag: "NIST FIPS 203 · 204 · 205",
  },
];

export const SKILLS = [
  {
    no: "01",
    title: "Quantum Algorithms",
    points: [
      "Understanding the Quantum Fourier Transform",
      "Principles of Shor's Algorithm & period finding",
      "Impact of quantum algorithms on cryptography",
      "Grover's Algorithm and its security implications",
    ],
  },
  {
    no: "02",
    title: "Quantum Threat Analysis",
    points: [
      "Determine quantum threats to classical cryptography",
      "Examine RSA threats in the quantum world",
      "Recognize Harvest Now, Decrypt Later attacks",
      "Analyze threats to long-term confidentiality",
      "Design quantum-resistant security measures",
    ],
  },
  {
    no: "03",
    title: "Post-Quantum Cryptography",
    points: [
      "Comprehend core aspects of post-quantum cryptography",
      "Study Kyber, Dilithium and Falcon in depth",
      "Analyze enterprise adoption of PQC",
      "Formulate guidelines for migration to PQC",
    ],
  },
  {
    no: "04",
    title: "Cryptographic Migration",
    points: [
      "Review existing cryptography dependencies",
      "Identify vulnerabilities to quantum computing",
      "Establish migration strategy priorities",
      "Weigh testing and implementation factors",
      "Plan for future quantum-safe security",
    ],
  },
];

export const LABS = [
  {
    name: "Quantum Fourier Transform Lab",
    body: "Build and run the QFT circuit, then use period finding to set up the factoring attack.",
    code: "$ qft simulate --qubits 4\n> period finding … r = 4\n> state collapse ▓▓▓▓▓▓░░ 78%",
  },
  {
    name: "Shor's Algorithm Lab",
    body: "Factor real integers with Shor's Algorithm and watch RSA fall apart at toy scale.",
    code: "$ shor run --N 15\n> factors found → {3, 5}\n> RSA status: VULNERABLE",
  },
  {
    name: "PQC Migration Lab",
    body: "Discover quantum-resistant cryptographic migration with Kyber and Dilithium.",
    code: "$ pqc migrate --suite kyber\n> classical: RSA-2048 ✗\n> quantum-safe: ML-KEM-768 ✓",
  },
  {
    name: "Quantum Threat Modeling Lab",
    body: "Learn about quantum attacks and discover the security exposure in cryptographic environments.",
    code: "$ threat-scan --env prod\n> 214 crypto assets found\n> 3 critical · HNDL exposure",
  },
];

export const CURRICULUM = [
  {
    id: "m1",
    no: "Module 01",
    title: "QFT & Shor's Algorithm",
    body: "Understand the Quantum Fourier Transform and Shor's Algorithm, including their implications for integer factorization and RSA cryptography.",
    topics: ["Quantum Fourier Transform", "Shor's Algorithm", "Period Finding", "RSA Impact"],
  },
  {
    id: "m2",
    no: "Module 02",
    title: "PQC Standards",
    body: "Explore post-quantum cryptography and the migration from classical cryptographic systems to quantum-resistant security. The curriculum specifically covers NIST-standardized post-quantum algorithms and their enterprise adoption.",
    topics: ["Cryptographic Fundamentals", "Quantum Threats", "Migration Planning", "Risk Assessment", "Falcon"],
  },
  {
    id: "m3",
    no: "Module 03",
    title: "Quantum Threat Modeling",
    body: "Analyze the major cybersecurity threats associated with quantum computing.",
    topics: [
      "Shor's Algorithm",
      "Grover's Algorithm",
      "Harvest Now, Decrypt Later",
      "Cryptographic Exposure",
      "Quantum-Safe Security Strategies",
    ],
  },
];

export const WHY = [
  {
    no: "01",
    title: "Threat and solution, one track",
    body: "This track is for cybersecurity professionals who must understand both the threat and the technical solution to the problem.",
  },
  {
    no: "02",
    title: "Enterprise-first PQC",
    body: "The programme teaches post-quantum cryptography and migration as enterprise security skills — not abstract physics.",
  },
  {
    no: "03",
    title: "OffSec-style labs",
    body: "The Immuta lab curriculum is based on hands-on learning in the OffSec style. You attack, measure and migrate — for real.",
  },
  {
    no: "04",
    title: "Built for quantum-threatened enterprises",
    body: "This program meets the needs of enterprises facing quantum threats today, with skills they can apply to current cryptography.",
  },
];

export const AUDIENCE = [
  "SOC & security analysts",
  "Security engineers & architects",
  "Cryptography & PKI teams",
  "Risk, compliance & CISO leaders",
];

export const CAREERS = [
  { role: "Quantum Security Analyst", icon: "radar" },
  { role: "Quantum Cryptography Specialist", icon: "key" },
  { role: "Quantum SOC Analyst", icon: "scan" },
  { role: "PQC Migration Engineer", icon: "route" },
];

export const PROGRESSION = [
  { step: "Quantum Foundations", level: "L1", current: false },
  { step: "Quantum Security Specialist", level: "L2", current: true },
  { step: "Quantum Enterprise Architect", level: "L3", current: false },
];

export const FAQS = [
  {
    q: "What modules are included?",
    a: "The certificate covers three core modules — QFT & Shor's Algorithm, PQC Standards, and Quantum Threat Modeling — backed by four hands-on labs: the Quantum Fourier Transform Lab, Shor's Algorithm Lab, PQC Migration Lab and Quantum Threat Modeling Lab.",
  },
  {
    q: "What is the competency level?",
    a: "The Immuta Quantum Security Specialist Certificate is awarded at L2 — Quantum Security Analyst + PQC Migration Specialist.",
  },
  {
    q: "Does it cover post-quantum cryptography?",
    a: "Yes. The curriculum specifically covers NIST-standardized post-quantum algorithms — including Kyber, Dilithium and Falcon — and their enterprise adoption, alongside full migration planning and risk assessment.",
  },
  {
    q: "Who should take this certification?",
    a: "Cybersecurity professionals who must understand both the quantum threat and the technical solution: SOC and security analysts, security engineers, cryptography and PKI teams, and risk or compliance leaders responsible for crypto-agility.",
  },
];
