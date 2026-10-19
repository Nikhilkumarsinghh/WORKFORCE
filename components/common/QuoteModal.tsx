"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock3, MapPin, Send, ShieldCheck, X } from "lucide-react";

type Props = { open: boolean; onClose: () => void; title: string; subtitle: string; accent?: string; context: string };
type Form = { name: string; company: string; email: string; phone: string; workers: string; location: string; message: string };
const empty: Form = { name: "", company: "", email: "", phone: "", workers: "", location: "", message: "" };

export default function QuoteModal({ open, onClose, title, subtitle, accent = "#1268f3", context }: Props) {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("service-modal-open");
    const key = (e: KeyboardEvent) => e.key === "Escape" && status !== "sending" && onClose();
    document.addEventListener("keydown", key);
    return () => { document.body.classList.remove("service-modal-open"); document.removeEventListener("keydown", key); };
  }, [open, onClose, status]);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  }
  function validate() {
    const e: Partial<Record<keyof Form, string>> = {};
    if (form.name.trim().length < 2) e.name = "Enter your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.workers) e.workers = "Select an approximate requirement.";
    if (!form.location.trim()) e.location = "Add the primary location.";
    if (form.message.trim().length < 10) e.message = "Add a little more detail.";
    setErrors(e); return !Object.keys(e).length;
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setServerError(""); if (!validate()) return; setStatus("sending");
    try {
      const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, website: honeypotRef.current?.value || "", industry: context, service: context }) });
      const data = await r.json(); if (!r.ok) throw new Error(data.error || "Unable to send the request."); setStatus("done");
    } catch (err) { setServerError(err instanceof Error ? err.message : "Unable to send the request."); setStatus("idle"); }
  }
  function close() { if (status === "sending") return; setStatus("idle"); setServerError(""); setErrors({}); setForm(empty); if (honeypotRef.current) honeypotRef.current.value = ""; onClose(); }

  return <AnimatePresence>{open && <div className="service-modal-root">
    <motion.button className="service-modal-backdrop" aria-label="Close quote form" onClick={close} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
    <motion.div className="service-modal" role="dialog" aria-modal="true" initial={{ opacity: 0, y: 26, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .985 }}>
      <aside className="service-modal-side">
        <button className="service-modal-close mobile-only" onClick={close} aria-label="Close"><X size={18} /></button>
        <span className="service-overline light">BUSINESS ENQUIRY</span>
        <h2>{title}</h2><p>{subtitle}</p>
        <div className="service-modal-points"><span><CheckCircle2 size={16} /> No obligation</span><span><ShieldCheck size={16} /> Private & secure</span><span><Clock3 size={16} /> Requirement reviewed by the team</span></div>
        <div className="service-modal-contact"><MapPin size={16} /> India-wide enquiries</div>
      </aside>
      <section className="service-modal-main">
        <button className="service-modal-close desktop-only" onClick={close} aria-label="Close"><X size={18} /></button>
        {status === "done" ? <div className="service-form-success"><div><CheckCircle2 size={31} /></div><span className="service-overline">REQUEST RECEIVED</span><h3>Thanks. Your requirement is with our team.</h3><p>We&apos;ll review the details and contact you using the information you provided.</p><button className="service-primary" onClick={close}>Done</button></div> : <form className="service-form" noValidate onSubmit={submit}>
          <input ref={honeypotRef} className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="service-form-head"><span>YOUR REQUIREMENT</span><p>Fields marked * are required.</p></div>
          <div className="service-form-grid">
            <Field label="Full name *" error={errors.name}><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" /></Field>
            <Field label="Company"><input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" /></Field>
            <Field label="Work email *" error={errors.email}><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" /></Field>
            <Field label="Mobile number *" error={errors.phone}><input inputMode="numeric" value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile" /></Field>
            <Field label="Primary location *" error={errors.location}><input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="City / state / site" /></Field>
            <Field label="Approx. requirement *" error={errors.workers}><select value={form.workers} onChange={(e) => set("workers", e.target.value)}><option value="">Select range</option><option>1–5</option><option>6–20</option><option>21–50</option><option>51–100</option><option>100+</option><option>Not decided yet</option></select></Field>
            <Field label="Describe requirement *" wide error={errors.message}><textarea value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Roles, skills, shift, timeline, site details or anything important…" /></Field>
          </div>
          {serverError && <div className="service-form-error">{serverError}</div>}
          <div className="service-form-submit"><span>We use these details only to respond to your business enquiry.</span><button className="service-primary" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Send enquiry <Send size={15} /></>}</button></div>
        </form>}
      </section>
    </motion.div>
  </div>}</AnimatePresence>;
}
function Field({ label, error, wide, children }: { label: string; error?: string; wide?: boolean; children: React.ReactNode }) { return <label className={`service-field ${wide ? "wide" : ""}`}><span>{label}</span>{children}{error && <small>{error}</small>}</label>; }
