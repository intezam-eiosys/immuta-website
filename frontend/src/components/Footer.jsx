import { ArrowUp } from "lucide-react";
import { COURSE, NAV_LINKS, TRACKS } from "@/data/course";
import { scrollToId } from "@/lib/scroll";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[#D4AF37]/15 bg-[#070409]" data-testid="footer">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src={COURSE.logo} alt="IMMUTA Technologies" className="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#B3A7C2]">
              IMMUTA Technologies trains professionals for the quantum era — starting with the
              Quantum Foundations Certificate: Qubits, Bloch Sphere, Gates &amp; Circuits, and
              Entanglement &amp; Bell States.
            </p>
            <p className="mt-6 font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#7A6D8C]">
              Progression: L1 → L2 → L3
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    data-testid={`footer-link-${l.id}`}
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-[#B3A7C2] transition-colors hover:text-[#D4AF37]"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
              Tracks
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {TRACKS.map((s) => (
                <li key={s} className="text-sm text-[#B3A7C2]" data-testid={`footer-track-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
              Contact
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-[#B3A7C2]">
              <li data-testid="footer-phone">{COURSE.contact.phone}</li>
              <li data-testid="footer-email">{COURSE.contact.email}</li>
              <li data-testid="footer-address">{COURSE.contact.address}</li>
            </ul>
            <button
              data-testid="footer-cta-btn"
              onClick={() => scrollToId("enquire")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF5E36] px-6 py-3 font-display text-sm font-semibold text-[#0B060F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E04822]"
            >
              Book Your Free Consultation
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#D4AF37]/10 pt-7 sm:flex-row">
          <p className="text-xs text-[#7A6D8C]" data-testid="footer-copyright">
            © {year} IMMUTA Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-[#7A6D8C]">
            <span data-testid="footer-help-link" className="cursor-pointer transition-colors hover:text-[#D4AF37]">
              Help
            </span>
            <span aria-hidden="true">|</span>
            <span data-testid="footer-privacy-link" className="cursor-pointer transition-colors hover:text-[#D4AF37]">
              Privacy Policy
            </span>
            <span aria-hidden="true">|</span>
            <button
              data-testid="footer-contact-link"
              onClick={() => scrollToId("enquire")}
              className="transition-colors hover:text-[#D4AF37]"
            >
              Contact Us
            </button>
          </div>
          <button
            data-testid="footer-back-to-top"
            onClick={() =>
              window.__lenis
                ? window.__lenis.scrollTo(0, { duration: 1.2 })
                : window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D4AF37]/10"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
