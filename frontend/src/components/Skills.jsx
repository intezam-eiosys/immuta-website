import { Check } from "lucide-react";
import { SKILLS } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

export const Skills = () => (
  <section id="skills" className="relative py-24 sm:py-32" data-testid="skills-section">
    <div
      className="pointer-events-none absolute inset-0 opacity-60"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 55% 40% at 85% 10%, rgba(154,54,227,0.12), transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="02">Skills You Will Learn</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          Four competencies, from quantum theory to enterprise migration.
        </SectionTitle>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {SKILLS.map((s, i) => (
          <Reveal key={s.no} delay={0.07 * i} className="h-full">
            <article
              className="group flex h-full flex-col rounded-2xl border border-[#D4AF37]/18 bg-gradient-to-b from-[#180C1F] to-[#0B060F]/40 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]/45 hover:shadow-[0_24px_60px_rgba(212,175,55,0.12)]"
              data-testid={`skill-card-${i + 1}`}
            >
              <span className="font-mono2 text-sm text-[#D4AF37]">{s.no}</span>
              <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-[#F4F1F8]">
                {s.title}
              </h3>
              <span className="mt-4 block h-px w-10 bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-500 group-hover:w-16" />
              <ul className="mt-5 flex flex-1 flex-col gap-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#B3A7C2]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
