import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

export const Faq = () => (
  <section id="faq" className="relative py-24 sm:py-32" data-testid="faq-section">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <div className="flex justify-center">
          <Eyebrow no="08">FAQ</Eyebrow>
        </div>
        <SectionTitle className="mt-5">Frequently Asked Questions</SectionTitle>
      </Reveal>

      <div className="mt-12">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={0.06 * i}>
              <AccordionItem
                value={`faq-${i}`}
                data-testid={`faq-accordion-item-${i + 1}`}
                className="rounded-xl border border-[#D4AF37]/18 bg-gradient-to-br from-[#2B0B1E]/40 to-[#180C1F]/70 px-6 py-1 transition-colors duration-300 data-[state=open]:border-[#D4AF37]/45 sm:px-7"
              >
                <AccordionTrigger className="group py-5 text-left hover:no-underline [&>svg]:hidden">
                  <span className="flex flex-1 items-center gap-4 pr-4">
                    <span className="font-mono2 text-xs text-[#D4AF37]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base sm:text-lg font-semibold text-[#F4F1F8]">
                      {f.q}
                    </span>
                  </span>
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-transform duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-10 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);
