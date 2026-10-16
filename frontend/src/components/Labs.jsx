import { Terminal } from "lucide-react";
import { LABS } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

export const Labs = () => (
  <section
    id="labs"
    className="relative overflow-hidden border-y border-[#D4AF37]/12 bg-[#0E0714] py-24 sm:py-32"
    data-testid="labs-section"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-70"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 50% 45% at 10% 90%, rgba(43,11,30,0.9), transparent 70%), radial-gradient(ellipse 40% 40% at 95% 15%, rgba(154,54,227,0.14), transparent 70%)",
      }}
    />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="03">Practical Labs</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          Build, measure, entangle — hands-on with Qiskit.
        </SectionTitle>
      </Reveal>

      <div className="mt-14 flex flex-col gap-4">
        {LABS.map((lab, i) => (
          <Reveal key={lab.name} delay={0.07 * i}>
            <article
              className="group overflow-hidden rounded-xl border border-[#D4AF37]/18 bg-[#0B060F] transition-all duration-500 hover:-translate-y-1 hover:border-[#9A36E3]/50 hover:shadow-[0_20px_50px_rgba(154,54,227,0.2)]"
              data-testid={`lab-card-${i + 1}`}
            >
              <div className="flex items-center gap-2 border-b border-[#D4AF37]/12 bg-[#180C1F]/70 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5E36]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#9A36E3]/70" />
                <span className="ml-2 truncate font-mono2 text-[10px] uppercase tracking-[0.15em] text-[#7A6D8C]">
                  {lab.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.immuta
                </span>
                <Terminal className="ml-auto h-3.5 w-3.5 text-[#D4AF37]/60" />
              </div>
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <div className="sm:w-2/5">
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#F4F1F8]">
                    {lab.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#B3A7C2]">{lab.body}</p>
                </div>
                <pre className="flex-1 rounded-lg border border-[#9A36E3]/25 bg-[#12081A] p-3.5 font-mono2 text-[11px] leading-5 text-[#B3A7C2]">
                  {lab.code}
                </pre>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
