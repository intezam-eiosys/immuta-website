import { motion } from "framer-motion";
import { ShieldAlert, ScanSearch, LockKeyhole, Quote } from "lucide-react";
import { FEATURES, IMAGES, LABS_NOTE, AUDIENCE } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

const ICONS = [ShieldAlert, ScanSearch, LockKeyhole];

export const Overview = () => (
  <section id="overview" className="relative py-24 sm:py-32" data-testid="overview-section">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="01">Course Overview</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          Nineteen hours from your first qubit to Bell states.
        </SectionTitle>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7 lg:row-span-2" delay={0.05}>
          <article
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/18 bg-gradient-to-br from-[#2B0B1E]/60 to-[#180C1F]"
            data-testid="feature-card-1"
          >
            <div className="relative h-64 overflow-hidden sm:h-72">
              <img
                src={IMAGES.servers}
                alt="High-density computing hardware"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180C1F] via-[#2B0B1E]/40 to-transparent" />
              <div className="absolute inset-0 bg-[#9A36E3]/15 mix-blend-overlay" />
              <span className="absolute left-5 top-5 rounded-full border border-[#FF5E36]/40 bg-[#0B060F]/80 px-3.5 py-1.5 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#FF5E36] backdrop-blur-sm">
                {FEATURES[0].tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1F8]">
                {FEATURES[0].title}
              </h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                {FEATURES[0].body}
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.12}>
          <article
            className="group h-full rounded-2xl border border-[#D4AF37]/18 bg-gradient-to-br from-[#2B0B1E]/50 to-[#180C1F] p-7 transition-all duration-500 hover:border-[#9A36E3]/50 hover:shadow-[0_20px_50px_rgba(154,54,227,0.18)] sm:p-8"
            data-testid="feature-card-2"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F1F8]">
                {FEATURES[1].title}
              </h3>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#9A36E3]/35 bg-[#9A36E3]/10 text-[#C77DFF] transition-transform duration-500 group-hover:rotate-6">
                <ScanSearch className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
              {FEATURES[1].body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Qubits", "Bloch Sphere", "Bell States"].map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-[#9A36E3]/15 border border-[#9A36E3]/35 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.15em] text-[#C77DFF]"
                >
                  {a}
                </span>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.19}>
          <article
            className="group h-full rounded-2xl border border-[#D4AF37]/18 bg-gradient-to-br from-[#2B0B1E]/50 to-[#180C1F] p-7 transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] sm:p-8"
            data-testid="feature-card-3"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F1F8]">
                {FEATURES[2].title}
              </h3>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/35 bg-[#D4AF37]/10 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-6">
                <LockKeyhole className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
              {FEATURES[2].body}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["₱9,900", "₱6,900 Founding", "19 Hours"].map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.15em] text-[#D4AF37]"
                >
                  {a}
                </span>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal className="lg:col-span-12" delay={0.26}>
          <div
            className="flex flex-col gap-6 rounded-2xl border border-[#D4AF37]/18 bg-[#0B060F]/60 p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
            data-testid="feature-card-4"
          >
            <p className="max-w-2xl font-display text-lg sm:text-xl font-semibold text-[#F4F1F8]">
              “<span className="text-gold-grad">Hands-on using Qiskit</span> and simulated quantum
              environments, with optional real quantum hardware access where available.”
            </p>
            <div className="flex shrink-0 items-center gap-5">
              {ICONS.map((Icon, i) => (
                <motion.span
                  key={i}
                  whileHover={{ y: -4 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#2B0B1E]/60 text-[#D4AF37]"
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="04">Audience</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          Who should take this certificate?
        </SectionTitle>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AUDIENCE.map((a, i) => (
              <Reveal key={a} delay={0.05 * i} className="h-full">
                <div
                  className="flex h-full items-center gap-3 rounded-xl border border-[#D4AF37]/15 bg-gradient-to-r from-[#2B0B1E]/50 to-[#180C1F]/60 px-5 py-4 transition-all duration-300 hover:border-[#9A36E3]/45 hover:shadow-[0_14px_36px_rgba(154,54,227,0.14)]"
                  data-testid={`audience-item-${i + 1}`}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  <span className="text-sm sm:text-base text-[#F4F1F8]">{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0B060F]">
              <div className="relative h-56 shrink-0 overflow-hidden">
                <img
                  src={IMAGES.analyst}
                  alt="Professional learning quantum development"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  data-testid="audience-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B060F] via-[#2B0B1E]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#9A36E3]/15 mix-blend-overlay" />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1F8]">
                  Practical Learning
                </h3>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {["Qubit & Bloch Sphere Lab", "Superposition & Measurement Lab", "Entanglement & Bell States Lab"].map((l) => (
                    <li
                      key={l}
                      className="flex items-center gap-3 rounded-lg border border-[#D4AF37]/15 bg-[#2B0B1E]/40 px-4 py-3 text-sm sm:text-base text-[#F4F1F8]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#9A36E3]" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-auto pt-7">
                  <Quote className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
                  <p className="mt-3 text-sm sm:text-base italic leading-relaxed text-[#B3A7C2]">
                    {LABS_NOTE}
                  </p>
                </blockquote>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
