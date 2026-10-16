export const COURSE = {
  provider: "IMMUTA Technologies",
  name: "Immuta Quantum Foundations Certificate",
  eyebrow: "IMMUTA Technologies — L1 Certification Track",
  description:
    "Learn quantum concepts and build quantum circuits.",
  stats: [
    { label: "Hours", value: "19" },
    { label: "Tuition", value: "₱9,900" },
    { label: "Founding", value: "₱6,900" },
    { label: "Level", value: "L1" },
  ],
  competency: "L1 — Quantum Beginner + Quantum Practitioner",
  price: "₱9,900",
  foundingPrice: "₱6,900",
  duration: "19 Hours",
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

export const VIDEOS = {
  focus: "/videos/focus.mp4",
  focusWebm: "/videos/focus.webm",
  labs: "/videos/labs.mp4",
  labsWebm: "/videos/labs.webm",
};

export const NAV_LINKS = [
  { label: "Overview", id: "overview" },
  { label: "Curriculum", id: "curriculum" },
  { label: "Labs", id: "labs" },
  { label: "Audience", id: "audience" },
];

export const MARQUEE_ITEMS = [
  "Qubits",
  "Bloch Sphere",
  "Superposition",
  "Hadamard",
  "CNOT",
  "Multi-Qubit Systems",
  "Bell States",
  "Quantum Teleportation",
  "Qiskit",
  "Quantum Correlation",
];

export const FEATURES = [
  {
    title: "Practical focus",
    body: "Learn quantum concepts and build quantum circuits.",
    tag: "QISKIT · HANDS-ON",
  },
  {
    title: "Coverage",
    body: "Modules 1, 2 and 3. Progression: L1 → L2 → L3.",
    tag: "3 MODULES · 19 HOURS",
  },
  {
    title: "Credential",
    body: "Immuta Quantum Foundations Certificate, awarded at L1 — Quantum Beginner + Quantum Practitioner.",
    tag: "FOUNDING ₱6,900",
  },
];

export const CURRICULUM = [
  {
    id: "m1",
    no: "Module 01",
    title: "Quantum Foundations",
    hours: "5 hr",
    body: "",
    topics: ["Qubits", "Bloch Sphere", "Superposition"],
  },
  {
    id: "m2",
    no: "Module 02",
    title: "Quantum Gates & Circuits",
    hours: "6 hr",
    body: "",
    topics: ["X · Y · Z", "Hadamard", "CNOT", "Multi-Qubit Systems"],
  },
  {
    id: "m3",
    no: "Module 03",
    title: "Entanglement & Bell States",
    hours: "8 hr",
    body: "",
    topics: ["Quantum Correlation", "Bell States", "Quantum Teleportation"],
  },
];

export const LABS = [
  {
    name: "Qubit & Bloch Sphere Lab",
    body: "Initialize your first qubit and explore the Bloch sphere.",
    code: "$ qubit init --qubits 1\n> bloch vector θ=0, φ=0\n> state: |0⟩ ▓▓▓▓▓▓▓▓ 100%",
  },
  {
    name: "Superposition & Measurement Lab",
    body: "Put qubits in superposition and measure what collapses.",
    code: "$ measure --shots 1024\n> |0⟩ 512 · |1⟩ 512\n> superposition confirmed ✓",
  },
  {
    name: "Entanglement & Bell States Lab",
    body: "Create Bell pairs and teleport a qubit across the circuit.",
    code: "$ bell pair --qubits 2\n> correlation 1.00\n> teleportation complete ✓",
  },
];

export const AUDIENCE = [
  "Cybersecurity Professionals",
  "SOC Analysts",
  "Security Engineers",
  "IT Professionals",
  "Technology Researchers",
  "Students entering quantum technology",
  "Professionals preparing for advanced quantum-security training",
  "Enterprise teams beginning their quantum readiness journey",
];

export const PROGRESSION = [
  { step: "Quantum Foundations", level: "L1", current: true },
  { step: "Quantum Security Specialist", level: "L2", current: false },
  { step: "Quantum Enterprise Architect", level: "L3", current: false },
];

export const TRACKS = [
  "L1 — Quantum Foundations",
  "L2 — Quantum Security Specialist",
  "L3 — Quantum Enterprise Architect",
];
