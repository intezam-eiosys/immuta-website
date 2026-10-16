import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { PROGRESSION, COURSE } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

export const Pathway = () => (
  <section id="pathway" className="relative py-24 sm:py-32" data-testid="pathway-section">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="05">Certification Pathway</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          The first rung of the Immuta certification ladder.
        </SectionTitle>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5" delay={0.05}>
          <motion.div
            whileHover={{ rotate: 0, scale: 1.015 }}
            initial={{ rotate: -1.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border-2 border-[#D4AF37]/45 bg-gradient-to-br from-[#2B0B1E] via-[#180C1F] to-[#0B060F] p-8 shadow-[0_30px_80px_rgba(43,11,30,0.6)]"
            data-testid="certificate-preview"
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.12), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center text-center">
              <img src={COURSE.logo} alt="IMMUTA" className="h-10 w-auto" />
              <span className="mt-6 font-mono2 text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
                Certificate of Competency
              </span>
              <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold text-[#F4F1F8]">
                {COURSE.name}
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#9A36E3]/40 bg-[#9A36E3]/12 px-4 py-2 font-mono2 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-[#E4CBFF]">
                <BadgeCheck className="h-3.5 w-3.5 text-[#C77DFF]" />
                {COURSE.competency}
              </span>
              <div className="mt-8 flex w-full items-end justify-between border-t border-[#D4AF37]/20 pt-5">
                <span className="font-mono2 text-[10px] tracking-[0.2em] text-[#7A6D8C]">
                  ID · IMM-QF-L1-2026
                </span>
                <span
                  className="h-12 w-12 rounded-full border-2 border-[#D4AF37]/60"
                  style={{
                    background:
                      "conic-gradient(from 200deg, #D4AF37 0%, #2B0B1E 35%, #9A36E3 65%, #D4AF37 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl border border-[#D4AF37]/18 bg-gradient-to-br from-[#2B0B1E]/50 to-[#180C1F] p-7 sm:p-8"
              data-testid="tuition-card"
            >
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Tuition
              </p>
              <div className="mt-4 flex flex-wrap items-end gap-4">
                <span className="font-display text-4xl font-extrabold text-[#F4F1F8]" data-testid="tuition-price">
                  {COURSE.price}
                </span>
                <span className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#FF5E36]/40 bg-[#FF5E36]/10 px-4 py-1.5 font-mono2 text-[10px] uppercase tracking-[0.15em] text-[#FF5E36]" data-testid="founding-price-badge">
                  Founding {COURSE.foundingPrice}
                </span>
              </div>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                19 hours across three modules — Qubits, Gates &amp; Circuits, Entanglement &amp;
                Bell States.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="mt-6 rounded-2xl border border-[#D4AF37]/18 bg-[#0B060F]/70 p-7 sm:p-8"
              data-testid="progression-path"
            >
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Progression Path
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                {PROGRESSION.map((p, i) => (
                  <div key={p.step} className="flex flex-1 items-center gap-4 sm:gap-3">
                    <div
                      className={`flex-1 rounded-xl border p-4 transition-colors ${
                        p.current
                          ? "border-[#FF5E36]/50 bg-[#FF5E36]/10"
                          : "border-[#D4AF37]/15 bg-[#2B0B1E]/30"
                      }`}
                      data-testid={`progression-step-${i + 1}`}
                    >
                      <span
                        className={`font-mono2 text-[10px] uppercase tracking-[0.2em] ${
                          p.current ? "text-[#FF5E36]" : "text-[#7A6D8C]"
                        }`}
                      >
                        {p.level} {p.current ? "· You are here" : ""}
                      </span>
                      <p className="mt-1.5 font-display text-sm sm:text-base font-bold text-[#F4F1F8]">
                        {p.step}
                      </p>
                    </div>
                    {i < PROGRESSION.length - 1 && (
                      <ArrowRight
                        className="hidden h-4 w-4 shrink-0 text-[#D4AF37]/50 sm:block"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                Progression: L1 → L2 → L3. The Quantum Security Specialist and Quantum Enterprise
                Architect levels build on this foundation.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
