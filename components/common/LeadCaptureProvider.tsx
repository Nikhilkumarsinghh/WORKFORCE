"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

type LeadKind = "workforce" | "technology" | "partnership" | "job" | "general";

type LeadState = {
  open: boolean;
  kind: LeadKind;
  source: string;
};

const copy: Record<LeadKind, { label: string; title: string; subject: string; hint: string }> = {
  workforce: { label: "WORKFORCE", title: "Tell us what your team needs.", subject: "Workforce requirement", hint: "Headcount, roles, location, shift, timeline or deployment requirement." },
  technology: { label: "TECHNOLOGY", title: "Tell us what you want to build.", subject: "Technology project enquiry", hint: "Website, app, SaaS, AI, automation, cloud or integration requirement." },
  partnership: { label: "PARTNERSHIP", title: "Let’s explore a partnership.", subject: "Partnership enquiry", hint: "Tell us about your organization and what you would like to collaborate on." },
  job: { label: "CAREERS", title: "Tell us what opportunity you’re looking for.", subject: "Job enquiry", hint: "Role, experience, location and anything else the hiring team should know." },
  general: { label: "TALK TO UNIQUETOO", title: "Let’s start with the requirement.", subject: "General enquiry", hint: "Give us a little context and we’ll route it to the right team." },
};


export default function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [lead, setLead] = useState<LeadState>({ open: false, kind: "general", source: "Website" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const open = (event: Event) => {
      const detail = (event as CustomEvent<{ kind?: LeadKind; source?: string }>).detail || {};
      setLead({ open: true, kind: detail.kind || "general", source: detail.source || "Website" });
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
      setStatus("idle");
      setError("");
      if (honeypotRef.current) honeypotRef.current.value = "";
      document.body.classList.add("lead-modal-open");
    };
    window.addEventListener("ut:open-lead", open);
    return () => window.removeEventListener("ut:open-lead", open);
  }, []);

  useEffect(() => {
    const key = (event: KeyboardEvent) => { if (event.key === "Escape" && lead.open) close(); };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [lead.open]);

  const close = () => {
    setLead((x) => ({ ...x, open: false }));
    document.body.classList.remove("lead-modal-open");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: copy[lead.kind].subject,
          type: lead.kind,
          source: lead.source,
          website: honeypotRef.current?.value || "",
          message: form.message,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send your enquiry.");
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Unable to send your enquiry.");
    }
  };

  return (
    <>
      {children}
      {lead.open && (
        <div className="lead-modal-root" role="dialog" aria-modal="true" aria-label="Contact UniqueToo">
          <button className="lead-modal-backdrop" onClick={close} aria-label="Close enquiry form" />
          <div className="lead-modal">
            <div className="lead-modal-head">
              <div>
                <span className="lead-modal-kicker">{copy[lead.kind].label}</span>
                <h2>{copy[lead.kind].title}</h2>
                <p>{copy[lead.kind].hint}</p>
              </div>
              <button className="lead-close" onClick={close} aria-label="Close"><X size={18} /></button>
            </div>
            {status === "success" ? (
              <div className="lead-success">
                <div className="lead-success-icon"><CheckCircle2 size={30} /></div>
                <span className="lead-modal-kicker">REQUEST RECEIVED</span>
                <h3>Thanks — your enquiry is with the right team.</h3>
                <p>We’ll review the details and contact you using the information you provided.</p>
                <button className="button primary" onClick={close}>Done <ArrowRight size={16} /></button>
              </div>
            ) : (
              <form className="lead-form" onSubmit={submit}>
                <input ref={honeypotRef} className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="lead-field-grid">
                  <label>Full name *<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" /></label>
                  <label>Work email *<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" /></label>
                  <label>Phone *<input required inputMode="numeric" pattern="[6-9][0-9]{9}" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit mobile" /></label>
                  <label>Company<input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" /></label>
                </div>
                <label>Requirement *<textarea required minLength={10} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={copy[lead.kind].hint} /></label>
                {error && <p className="lead-error">{error}</p>}
                <div className="lead-form-foot">
                  <span>Your details stay with UniqueToo and are used to respond to this enquiry.</span>
                  <button className="button primary" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Send enquiry"} <ArrowRight size={16} /></button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
