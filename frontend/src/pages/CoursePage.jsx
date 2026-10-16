import { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Overview, Audience } from "@/components/Overview";
import { Curriculum } from "@/components/Curriculum";
import { Labs } from "@/components/Labs";
import { Enquiry } from "@/components/Enquiry";
import { Footer } from "@/components/Footer";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export default function CoursePage({ theme = "dark" }) {
  useEffect(() => {
    document.title =
      theme === "light"
        ? "Quantum Foundations Certificate · IMMUTA Technologies (Light)"
        : "Quantum Foundations Certificate · IMMUTA Technologies";
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (t) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div
      className={`relative min-h-screen bg-ink text-textmain ${theme === "light" ? "theme-light" : ""}`}
      data-testid={theme === "light" ? "course-page-light" : "course-page"}
      data-theme={theme}
    >
      <div
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: NOISE }}
        aria-hidden="true"
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Overview />
        <Curriculum />
        <Labs />
        <Audience />
        <Enquiry />
      </main>
      <Footer />
    </div>
  );
}
