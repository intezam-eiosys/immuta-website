import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CURRICULUM } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

export const Curriculum = () => (
  <section id="curriculum" className="relative py-24 sm:py-32" data-testid="curriculum-section">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow no="04">Course Curriculum</Eyebrow>
            <SectionTitle className="mt-5">Three modules. One quantum-ready defender.</SectionTitle>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
              Core topics move from quantum algorithms to NIST-standardized post-quantum
              cryptography, and finally to the enterprise threat models that decide what you
              migrate first.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-xl border border-[#D4AF37]/20 bg-[#2B0B1E]/40 p-5">
              <span className="font-display text-4xl font-extrabold text-gold-grad">8</span>
              <p className="text-sm leading-relaxed text-[#B3A7C2]">
                weeks, part-time friendly — <span className="text-[#F4F1F8]">8 modules of labs &amp; theory</span> delivered online.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Accordion type="single" collapsible defaultValue="m1" className="flex flex-col gap-4">
            {CURRICULUM.map((m, i) => (
              <Reveal key={m.id} delay={0.07 * i}>
                <AccordionItem
                  value={m.id}
                  data-testid={`curriculum-accordion-item-${i + 1}`}
                  className="rounded-2xl border border-[#D4AF37]/18 bg-gradient-to-br from-[#2B0B1E]/40 to-[#180C1F] px-6 sm:px-8 py-2 transition-colors duration-300 data-[state=open]:border-[#D4AF37]/45"
                >
                  <AccordionTrigger className="group py-5 text-left hover:no-underline [&>svg]:hidden">
                    <span className="flex flex-1 items-center gap-4 sm:gap-6 pr-4">
                      <span className="font-mono2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                        {m.no}
                      </span>
                      <span className="font-display text-lg sm:text-2xl font-bold text-[#F4F1F8]">
                        {m.title}
                      </span>
                    </span>
                    <span
                      data-testid={`curriculum-chevron-${i + 1}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-transform duration-300 group-data-[state=open]:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-7">
                    <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                      {m.body}
                    </p>
                    <p className="mt-6 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#7A6D8C]">
                      Core Topics
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[#9A36E3]/35 bg-[#9A36E3]/10 px-3.5 py-1.5 text-xs sm:text-sm text-[#E4CBFF]"
                          data-testid={`curriculum-topic-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </section>
);
