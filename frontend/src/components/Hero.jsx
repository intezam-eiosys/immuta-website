import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowUpRight, Download, ShieldCheck } from "lucide-react";
import { COURSE, IMAGES } from "@/data/course";
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

export const Hero = () => {
  const sectionRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 60, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 60, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const onMouseMove = (e) => {
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32"
      data-testid="hero-section"
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div style={{ y: glowY }} className="absolute inset-0">
          <div className="absolute -top-40 left-[-15%] h-[42rem] w-[42rem] rounded-full bg-[#2B0B1E]/70 blur-[140px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-[#9A36E3]/20 blur-[160px]" />
        </motion.div>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.7) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 35%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 35%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* copy */}
        <div className="lg:col-span-7">
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
            className="font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-extrabold leading-[0.98] tracking-tight text-[#F4F1F8]"
            data-testid="hero-heading"
          >
            <HeroLine delay={0.2}>Quantum Security</HeroLine>
            <HeroLine delay={0.32}>
              <span className="text-gold-grad">Specialist</span>
            </HeroLine>
            <HeroLine delay={0.44}>
              <span className="text-stroke">Certificate</span>
            </HeroLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-[#B3A7C2] sm:text-lg"
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
              className="group inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 px-7 py-4 font-display text-sm sm:text-base font-semibold text-[#F4F1F8] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              <Download className="h-4 w-4 text-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0.5" />
              View Curriculum
            </button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-y-6 border-t border-[#D4AF37]/15 pt-7 sm:grid-cols-4"
            data-testid="hero-stats"
          >
            {COURSE.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-[#7A6D8C]">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-bold text-[#F4F1F8] sm:text-xl" data-testid={`hero-stat-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                  {s.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="relative lg:col-span-5"
          style={{ perspective: 1200 }}
          data-testid="hero-visual"
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative mx-auto max-w-md lg:max-w-none"
          >
            <motion.div style={{ y: imgY }} className="relative">
              <div
                className="absolute -inset-3 translate-x-4 translate-y-4 rounded-2xl border border-[#D4AF37]/25"
                aria-hidden="true"
              />
              <div
                className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#180C1F]"
                style={{ clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)" }}
              >
                <img
                  src={IMAGES.hero}
                  alt="Quantum processor structure"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                  data-testid="hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B0B1E]/90 via-transparent to-[#0B060F]/30" />
                <div className="absolute inset-0 bg-[#9A36E3]/15 mix-blend-overlay" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 45% at 30% 20%, rgba(212,175,55,0.18), transparent 70%)",
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                      Track
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold text-[#F4F1F8]">
                      Quantum Security Specialist
                    </p>
                  </div>
                  <ShieldCheck className="h-7 w-7 text-[#D4AF37]" />
                </div>
              </div>

              {/* floating terminal */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
                style={{ transform: "translateZ(60px)" }}
                className="absolute -bottom-8 -left-4 w-[19rem] rounded-xl border border-[#D4AF37]/25 bg-[#180C1F]/90 p-4 shadow-[0_24px_60px_rgba(11,6,15,0.7)] backdrop-blur-md sm:-left-10"
                data-testid="hero-terminal-card"
              >
                <div className="mb-2.5 flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5E36]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#9A36E3]/80" />
                  <span className="ml-2 font-mono2 text-[10px] text-[#7A6D8C]">shor@immuta-lab</span>
                </div>
                <pre className="font-mono2 text-[11px] leading-5 text-[#B3A7C2]">
                  <span className="text-[#D4AF37]">$</span> shor run --N 15{"\n"}
                  <span className="text-[#7A6D8C]">&gt;</span> factors found → {"{"}3, 5{"}"}{"\n"}
                  <span className="text-[#7A6D8C]">&gt;</span> RSA status:{" "}
                  <span className="text-[#FF5E36]">VULNERABLE</span>
                </pre>
              </motion.div>

              {/* floating badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.25, ease: EASE }}
                style={{ transform: "translateZ(80px)" }}
                className="absolute -top-5 right-6 flex items-center gap-2 rounded-full border border-[#9A36E3]/40 bg-[#0B060F]/85 px-4 py-2 backdrop-blur-md"
                data-testid="hero-level-badge"
              >
                <span className="h-2 w-2 rounded-full bg-[#9A36E3]" />
                <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#F4F1F8]">
                  L2 · Advanced Track
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
