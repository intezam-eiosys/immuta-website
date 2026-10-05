import { Quote } from "lucide-react";
import { WHY, AUDIENCE, IMAGES } from "@/data/course";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

export const WhyImmuta = () => (
  <section
    id="why"
    className="relative border-y border-[#D4AF37]/12 bg-[#0E0714] py-24 sm:py-32"
    data-testid="why-section"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow no="05">Why Choose Immuta?</Eyebrow>
        <SectionTitle className="mt-5 max-w-3xl">
          The critical bridge between quantum theory and quantum-safe enterprise.
        </SectionTitle>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-4">
            {WHY.map((w, i) => (
              <Reveal key={w.no} delay={0.06 * i}>
                <article
                  className="group flex gap-6 rounded-2xl border border-[#D4AF37]/15 bg-gradient-to-r from-[#2B0B1E]/50 to-[#180C1F]/60 p-6 transition-all duration-500 hover:border-[#9A36E3]/45 hover:shadow-[0_18px_44px_rgba(154,54,227,0.15)] sm:gap-8 sm:p-8"
                  data-testid={`why-card-${i + 1}`}
                >
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-transparent transition-all duration-500 group-hover:text-[#D4AF37]"
                    style={{ WebkitTextStroke: "1px rgba(212,175,55,0.6)" }}
                    aria-hidden="true"
                  >
                    {w.no}
                  </span>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#F4F1F8]">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                      {w.body}
                    </p>
                  </div>
                </article>
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
                  alt="Security analyst working at dark screens"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  data-testid="why-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B060F] via-[#2B0B1E]/30 to-transparent" />
                <div className="absolute inset-0 bg-[#9A36E3]/15 mix-blend-overlay" />
              </div>
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1F8]">
                  Who Should Enroll?
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {AUDIENCE.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-3 rounded-lg border border-[#D4AF37]/15 bg-[#2B0B1E]/40 px-4 py-3 text-sm sm:text-base text-[#F4F1F8]"
                      data-testid={`audience-${a.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-auto pt-7">
                  <Quote className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
                  <p className="mt-3 text-sm sm:text-base italic leading-relaxed text-[#B3A7C2]">
                    This track is for cybersecurity professionals who must understand both the
                    threat and the technical solution to the problem.
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
