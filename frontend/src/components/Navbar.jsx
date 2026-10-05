import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { COURSE, NAV_LINKS } from "@/data/course";
import { scrollToId } from "@/lib/scroll";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0B060F]/85 backdrop-blur-xl border-b border-[#D4AF37]/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            data-testid="navbar-logo-link"
            onClick={(e) => {
              e.preventDefault();
              if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center"
            aria-label="IMMUTA Technologies home"
          >
            <img
              src={COURSE.logo}
              alt="IMMUTA Technologies"
              className="h-9 sm:h-11 w-auto"
              width="1536"
              height="495"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className="group relative font-display text-sm font-medium text-[#B3A7C2] transition-colors hover:text-[#F4F1F8]"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              data-testid="navbar-cta-btn"
              onClick={() => go("enquire")}
              className="group inline-flex items-center gap-1.5 rounded-full bg-[#FF5E36] px-5 py-2.5 font-display text-sm font-semibold text-[#0B060F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E04822] hover:shadow-[0_10px_30px_rgba(255,94,54,0.4)]"
            >
              Book Free Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>

          <button
            data-testid="navbar-mobile-toggle"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/25 text-[#F4F1F8] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#0B060F]/98 px-8 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  data-testid={`mobile-nav-link-${l.id}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(l.id)}
                  className="text-left font-display text-4xl font-bold text-[#F4F1F8] py-2"
                >
                  <span className="mr-3 font-mono2 text-sm text-[#D4AF37]">0{i + 1}</span>
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                data-testid="mobile-nav-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                onClick={() => go("enquire")}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#FF5E36] px-8 py-4 font-display text-base font-semibold text-[#0B060F]"
              >
                Book Free Consultation
                <ArrowUpRight className="h-5 w-5" />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
