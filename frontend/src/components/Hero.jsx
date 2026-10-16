import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { COURSE, VIDEOS } from "@/data/course";
import { scrollToId } from "@/lib/scroll";

const EASE = [0.22, 1, 0.36, 1];

const HeroLine = ({ children, delay, className = "" }) => (
  <span className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => (
  <section
    className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-32"
    data-testid="hero-section"
  >
    {/* full-bleed video banner */}
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
      data-testid="hero-video"
    >
      <source src={VIDEOS.focusWebm} type="video/webm" />
      <source src={VIDEOS.focus} type="video/mp4" />
    </video>

    {/* legibility overlays: soft veil + darker gradient toward the right where the text sits */}
    <div className="absolute inset-0 bg-[#0B060F]/40" aria-hidden="true" />
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(to right, rgba(11,6,15,0.15) 0%, rgba(11,6,15,0.72) 52%, rgba(11,6,15,0.94) 100%)",
      }}
    />
    <div
      className="absolute inset-x-0 bottom-0 h-40"
      aria-hidden="true"
      style={{ background: "linear-gradient(to top, #0B060F 10%, transparent 100%)" }}
    />
    <div
      className="absolute inset-x-0 top-0 h-28"
      aria-hidden="true"
      style={{ background: "linear-gradient(to bottom, rgba(11,6,15,0.7), transparent)" }}
    />

    {/* content — right side, over the dark gradient */}
    <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lg:ml-auto lg:w-[54%]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-7 flex items-center gap-3 font-mono2 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#D4AF37]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
          </span>
          {COURSE.eyebrow}
        </motion.div>

        <h1
          className="font-display text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[0.98] tracking-tight text-[#F4F1F8]"
          data-testid="hero-heading"
        >
          <HeroLine delay={0.2}>Quantum</HeroLine>
          <HeroLine delay={0.32}>
            <span className="text-gold-grad">Foundations</span>
          </HeroLine>
          <HeroLine delay={0.44}>
            <span className="text-stroke">Certificate</span>
          </HeroLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-[#D8CFE4] sm:text-lg"
          data-testid="hero-description"
        >
          {COURSE.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-enquire-cta"
            onClick={() => scrollToId("enquire")}
            className="group inline-flex items-center gap-2 rounded-full bg-[#FF5E36] px-7 py-4 font-display text-sm sm:text-base font-semibold text-[#0B060F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E04822] hover:shadow-[0_18px_44px_rgba(255,94,54,0.45)]"
          >
            Book Your Free Consultation
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            data-testid="hero-curriculum-cta"
            onClick={() => scrollToId("curriculum")}
            className="group inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#0B060F]/40 px-7 py-4 font-display text-sm sm:text-base font-semibold text-[#F4F1F8] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            <Download className="h-4 w-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0.5" />
            View Curriculum
          </button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
          className="mt-12 grid max-w-xl grid-cols-2 gap-y-6 border-t border-[#D4AF37]/25 pt-7 sm:grid-cols-4"
          data-testid="hero-stats"
        >
          {COURSE.stats.map((s) => (
            <div key={s.label}>
              <dt className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-[#C9BCA0]">
                {s.label}
              </dt>
              <dd
                className="mt-1.5 font-display text-lg font-bold text-[#F4F1F8] sm:text-xl"
                data-testid={`hero-stat-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </div>
  </section>
);
