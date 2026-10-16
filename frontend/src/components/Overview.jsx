import {
  Code2, Layers, Award,
  ShieldCheck, ScanEye, ShieldHalf, Server, FlaskConical, GraduationCap, TrendingUp, Building2,
} from "lucide-react";
import { FEATURES, AUDIENCE } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

const FEATURE_ICONS = [Code2, Layers, Award];

const AUDIENCE_ICONS = [
  ShieldCheck,
  ScanEye,
  ShieldHalf,
  Server,
  FlaskConical,
  GraduationCap,
  TrendingUp,
  Building2,
];

export const Overview = () => (
  <section id="overview" className="relative py-24 sm:py-32" data-testid="overview-section">
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 50% 40% at 85% 0%, rgba(154,54,227,0.1), transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="01">Course Overview</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          Nineteen hours from your first qubit to Bell states.
        </SectionTitle>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = FEATURE_ICONS[i];
          const accent = i === 1 ? "#C77DFF" : "#D4AF37";
          const accentBorder = i === 1 ? "hover:border-[#9A36E3]/50 hover:shadow-[0_20px_50px_rgba(154,54,227,0.18)]" : "hover:border-[#D4AF37]/50 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]";
          return (
            <Reveal key={f.title} delay={0.07 * i} className="h-full">
              <article
                className={`flex h-full flex-col rounded-2xl border border-[#D4AF37]/18 bg-gradient-to-br from-[#2B0B1E]/50 to-[#180C1F] p-7 transition-all duration-500 sm:p-8 ${accentBorder}`}
                data-testid={`feature-card-${i + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={{ borderColor: `${accent}55`, background: `${accent}14`, color: accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#7A6D8C]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg sm:text-xl font-bold text-[#F4F1F8]">
                  {f.title}
                </h3>
                <p className="mt-3 flex-1 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                  {f.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(i === 1
                    ? ["Qubits", "Bloch Sphere", "Bell States"]
                    : i === 2
                      ? ["₱9,900", "₱6,900 Founding", "19 Hours"]
                      : ["Qiskit", "Circuits", "Simulated Labs"]
                  ).map((a) => (
                    <span
                      key={a}
                      className="rounded-full border px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.15em]"
                      style={{ borderColor: `${accent}40`, background: `${accent}0f`, color: accent }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export const Audience = () => (
  <section
    id="audience"
    className="relative border-y border-[#D4AF37]/12 bg-[#0E0714] py-24 sm:py-32"
    data-testid="audience-section"
  >
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 45% 40% at 10% 100%, rgba(43,11,30,0.8), transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="04">Audience</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          Who should take this certificate?
        </SectionTitle>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCE.map((a, i) => {
          const Icon = AUDIENCE_ICONS[i % AUDIENCE_ICONS.length];
          return (
            <Reveal key={a} delay={0.05 * i} className="h-full">
              <div
                className="group flex h-full flex-col gap-4 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-b from-[#2B0B1E]/50 to-[#180C1F]/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9A36E3]/45 hover:shadow-[0_14px_36px_rgba(154,54,227,0.14)]"
                data-testid={`audience-item-${i + 1}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#9A36E3]/35 bg-[#9A36E3]/10 text-[#C77DFF] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm sm:text-base font-medium leading-snug text-[#F4F1F8]">
                  {a}
                </span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
