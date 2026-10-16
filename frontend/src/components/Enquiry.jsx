import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { Phone, Mail, MapPin, CheckCircle2, Send, AlertCircle } from "lucide-react";
import { COURSE } from "@/data/course";
import { API_BASE, formatApiErrorDetail } from "@/lib/api";
import { Reveal, Eyebrow, SectionTitle } from "@/components/Reveal";

const initialForm = { name: "", email: "", phone: "", course: COURSE.name, message: "" };

export const Enquiry = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) err.email = "Please enter a valid email address";
    if (!/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) err.phone = "Please enter a valid phone number";
    if (!form.course.trim()) err.course = "Please choose a course";
    return err;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setSending(true);
    try {
      await axios.post(`${API_BASE}/api/enquiries`, {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        course: form.course,
        message: form.message.trim(),
      });
      setSubmitted(true);
      toast.success("Enquiry received — our programme advisors will reach out within one working day.");
    } catch (ex) {
      toast.error(formatApiErrorDetail(ex.response?.data?.detail));
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#0B060F]/70 px-4 py-3.5 text-sm sm:text-base text-[#F4F1F8] placeholder-[#7A6D8C] outline-none transition-all duration-300 focus:border-[#D4AF37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)]";

  const contactRows = [
    { icon: Phone, label: "Phone", value: COURSE.contact.phone, tid: "contact-phone" },
    { icon: Mail, label: "Email", value: COURSE.contact.email, tid: "contact-email" },
    { icon: MapPin, label: "Address", value: COURSE.contact.address, tid: "contact-address" },
  ];

  return (
    <section
      id="enquire"
      className="relative overflow-hidden border-y border-[#D4AF37]/12 bg-[#12071A] py-24 sm:py-32"
      data-testid="enquiry-section"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 15% 20%, rgba(154,54,227,0.16), transparent 70%), radial-gradient(ellipse 45% 45% at 90% 85%, rgba(255,94,54,0.1), transparent 70%)",
        }}
      />
      <Toaster position="bottom-right" theme="dark" richColors />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow no="06">Enquiry</Eyebrow>
              <SectionTitle className="mt-5">
                Book your free consultation.
              </SectionTitle>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                Tell us where your team stands — we will map the route from your first qubit to a
                full quantum-ready skillset, and answer every question about the certificate.
              </p>
            </Reveal>
            <div className="mt-10 flex flex-col gap-4">
              {contactRows.map((row, i) => (
                <Reveal key={row.label} delay={0.08 * i}>
                  <div
                    className="group flex items-center gap-4 rounded-xl border border-[#D4AF37]/18 bg-[#0B060F]/60 px-5 py-4 transition-all duration-300 hover:border-[#D4AF37]/40"
                    data-testid={row.tid}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/30 bg-[#2B0B1E]/60 text-[#D4AF37] transition-transform duration-300 group-hover:scale-110">
                      <row.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-[#7A6D8C]">
                        {row.label}
                      </p>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-[#F4F1F8]">
                        {row.value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="relative rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#2B0B1E]/70 to-[#180C1F]/90 p-7 shadow-[0_30px_90px_rgba(11,6,15,0.6)] sm:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    data-testid="enquiry-success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#10B981]/50 bg-[#10B981]/10"
                    >
                      <CheckCircle2 className="h-9 w-9 text-[#10B981]" />
                    </motion.span>
                    <h3 className="mt-7 font-display text-2xl sm:text-3xl font-bold text-[#F4F1F8]">
                      Enquiry received.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm sm:text-base leading-relaxed text-[#B3A7C2]">
                      Thank you, {form.name.split(" ")[0]}. Our programme advisors will reach out
                      to <span className="text-[#F4F1F8]">{form.email}</span> within one working
                      day.
                    </p>
                    <button
                      data-testid="enquiry-reset-btn"
                      onClick={reset}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 px-6 py-3 font-display text-sm font-semibold text-[#F4F1F8] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    data-testid="enquiry-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={onSubmit}
                    noValidate
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1F8]">
                        Course Enquiry
                      </h3>
                      <span className="rounded-full border border-[#9A36E3]/40 bg-[#9A36E3]/10 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#C77DFF]">
                        Founding {COURSE.foundingPrice}
                      </span>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <label htmlFor="enq-name" className="mb-2 block font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#B3A7C2]">
                          Full Name *
                        </label>
                        <input
                          id="enq-name"
                          data-testid="enquiry-name-input"
                          className={inputCls}
                          placeholder="Ada Lovelace"
                          value={form.name}
                          onChange={set("name")}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-[#FF5E36]" data-testid="enquiry-error-name">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-1">
                        <label htmlFor="enq-email" className="mb-2 block font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#B3A7C2]">
                          Email ID *
                        </label>
                        <input
                          id="enq-email"
                          type="email"
                          data-testid="enquiry-email-input"
                          className={inputCls}
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={set("email")}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-[#FF5E36]" data-testid="enquiry-error-email">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-1">
                        <label htmlFor="enq-phone" className="mb-2 block font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#B3A7C2]">
                          Phone Number *
                        </label>
                        <input
                          id="enq-phone"
                          type="tel"
                          data-testid="enquiry-phone-input"
                          className={inputCls}
                          placeholder="+63 917 000 0000"
                          value={form.phone}
                          onChange={set("phone")}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-[#FF5E36]" data-testid="enquiry-error-phone">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-1">
                        <label htmlFor="enq-course" className="mb-2 block font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#B3A7C2]">
                          Interested Course *
                        </label>
                        <select
                          id="enq-course"
                          data-testid="enquiry-course-input"
                          className={`${inputCls} appearance-none`}
                          value={form.course}
                          onChange={set("course")}
                        >
                          <option value={COURSE.name}>Quantum Foundations Certificate (L1)</option>
                          <option value="Quantum Security Specialist Certificate (L2)">Quantum Security Specialist Certificate (L2)</option>
                          <option value="Quantum Enterprise Architect (L3)">Quantum Enterprise Architect (L3)</option>
                          <option value="Custom Corporate Training">Custom Corporate Training</option>
                        </select>
                        {errors.course && (
                          <p className="mt-1.5 text-xs text-[#FF5E36]" data-testid="enquiry-error-course">
                            {errors.course}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="enq-message" className="mb-2 block font-mono2 text-[10px] uppercase tracking-[0.2em] text-[#B3A7C2]">
                          Message <span className="text-[#7A6D8C]">(optional)</span>
                        </label>
                        <textarea
                          id="enq-message"
                          data-testid="enquiry-message-input"
                          rows={4}
                          className={`${inputCls} resize-none`}
                          placeholder="Tell us about your team, your goals, or your timeline…"
                          value={form.message}
                          onChange={set("message")}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      data-testid="enquiry-submit-btn"
                      disabled={sending}
                      className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5E36] px-8 py-4 font-display text-base font-semibold text-[#0B060F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E04822] hover:shadow-[0_18px_44px_rgba(255,94,54,0.4)] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                    >
                      {sending ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0B060F]/30 border-t-[#0B060F]" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Submit Enquiry
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                    <p className="mt-4 flex items-center gap-2 text-xs text-[#7A6D8C]" data-testid="enquiry-privacy-note">
                      <AlertCircle className="h-3.5 w-3.5 text-[#D4AF37]" />
                      Your details are stored securely and only used to answer this enquiry.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
