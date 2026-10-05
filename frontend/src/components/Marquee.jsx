import { MARQUEE_ITEMS } from "@/data/course";

export const Marquee = () => (
  <div
    className="relative overflow-hidden border-y border-[#D4AF37]/15 bg-[#2B0B1E]/30 py-5"
    data-testid="marquee-band"
    aria-label="Course topics marquee"
  >
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0B060F] to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0B060F] to-transparent" />
    <div className="marquee-track flex w-max items-center">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className="flex items-center"
          aria-hidden={copy === 1}
        >
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={`${copy}-${item}`}
              className="flex items-center font-mono2 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B3A7C2]"
            >
              <span className="px-6">{item}</span>
              <span className="text-[#D4AF37] text-[9px]" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
