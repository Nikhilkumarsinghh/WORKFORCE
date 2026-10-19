"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SERVICES_DATA = {
  "workforce-solutions": {
    title: "Workforce Solutions",
    icon: "👷",
    tagline: "Workforce planning shaped around your operating requirements.",
    desc: "Discuss skilled, semi-skilled and frontline workforce needs for manufacturing, logistics and operational environments. Role scope, screening, onboarding, reporting and statutory responsibilities are agreed before engagement.",
    features: ["Role and skill definition", "Screening scope agreed upfront", "Named communication owner", "Replacement process defined in scope", "Deployment coordination", "Agreed reporting expectations"],
    process: ["Share your requirements", "Confirm roles and screening criteria", "Agree a realistic mobilisation plan", "Review delivery and operating needs"],
    industries: ["Manufacturing", "Warehouse", "Logistics", "Construction"],
  },
  "engineering-hiring": {
    title: "Engineering Hiring",
    icon: "⚙️",
    tagline: "Technical hiring built around skills, project needs and work context.",
    desc: "Define the engineering roles, required qualifications, hands-on skills, location, shift pattern and interview process. Candidate sourcing and evaluation scope are agreed against the actual role brief.",
    features: ["Role and skill mapping", "Qualification and experience criteria", "Technical screening plan", "Interview coordination", "Offer and joining follow-up", "Clear requirement feedback"],
    process: ["Share role briefs and success criteria", "Agree sourcing and screening plan", "Review suitable candidate profiles", "Coordinate interviews and next steps"],
    industries: ["Manufacturing", "Automotive", "Engineering", "Technology"],
  },
  "recruitment": {
    title: "Recruitment Services",
    icon: "🎯",
    tagline: "Permanent & contract hiring across blue, grey, and white collar roles.",
    desc: "Our recruitment team specialises in identifying the right talent for your permanent, contract, and seasonal hiring needs. From factory floor to corporate office — we source, screen, and deliver.",
    features: ["Multi-channel sourcing", "Skill-based screening", "Background verification", "Reference checks", "Interview coordination", "Offer management"],
    process: ["Share job description and requirements", "Agree sourcing and screening criteria", "Review shortlisted candidate profiles", "Coordinate interviews and selection", "Support offer and joining follow-up"],
    industries: ["IT & BPO", "Manufacturing", "Retail", "Healthcare"],
  },
  "staffing": {
    title: "Staffing Services",
    icon: "📋",
    tagline: "Flexible temp staffing, payroll management & statutory compliance.",
    desc: "Discuss temporary staffing, temp-to-hire, payroll coordination and workforce reporting. The exact service scope and statutory responsibilities are defined in writing for each engagement.",
    features: ["Contract staffing options", "Temp-to-hire planning", "Payroll coordination by scope", "Compliance responsibilities documented", "Attendance and workforce reports", "Regular operating reviews"],
    process: ["Assess staffing requirements", "Agree hiring and deployment stages", "Confirm payroll and compliance ownership", "Review reports and operating needs"],
    industries: ["Manufacturing", "FMCG", "E-commerce", "Hospitality"],
  },
  "security": {
    title: "Security Services",
    icon: "🛡️",
    tagline: "Security workforce requirements planned around the site and scope.",
    desc: "Discuss security staffing needs for offices, industrial plants, retail sites, healthcare facilities and residential environments. Licensing, permitted duties, supervision and site requirements must be confirmed before engagement.",
    features: ["Site and duty requirements", "Role and verification criteria", "Supervision and escalation plan", "Shift and attendance coordination", "Site-specific briefing", "Reporting expectations agreed"],
    process: ["Review the site and duties", "Confirm licensing and role requirements", "Agree staffing and shift plan", "Set reporting and escalation routines"],
    industries: ["Corporate Offices", "Industrial Plants", "Malls & Retail", "Residential Societies"],
  },
  "housekeeping": {
    title: "Housekeeping Services",
    icon: "🏨",
    tagline: "Facilities workforce coordinated around your service standards.",
    desc: "Discuss housekeeping and facilities staffing for offices, hospitality, healthcare, retail and industrial environments. Training, uniforms, equipment, consumables, supervision and quality checks are defined according to the agreed scope.",
    features: ["Role-specific briefing", "Supervision plan", "Equipment scope defined upfront", "Quality review checklist", "Shift planning", "Clear escalation process"],
    process: ["Review the site and service needs", "Define roles and service standards", "Plan staffing and supervision", "Review quality and feedback"],
    industries: ["Corporate Offices", "Hotels & Resorts", "Hospitals", "Industrial Facilities"],
  },
};

type ServiceKey = keyof typeof SERVICES_DATA;

type InquiryForm = { name: string; company: string; phone: string; email: string; requirement: string; workers: string; location: string; };
type FormErrors = Partial<Record<keyof InquiryForm, string>>;

function ServicePageContent({ serviceKey }: { serviceKey: ServiceKey }) {
  const s = SERVICES_DATA[serviceKey];
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<InquiryForm>({ name: "", company: "", phone: "", email: "", requirement: "", workers: "", location: "" });
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = "Valid 10-digit number required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.workers.trim()) e.workers = "Please select the approximate requirement";
    if (!form.location.trim()) e.location = "Please add the primary location";
    if (form.requirement.trim().length < 10) e.requirement = "Please describe your requirement in at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          phone: form.phone,
          email: form.email,
          workers: form.workers,
          location: form.location,
          website: honeypotRef.current?.value || "",
          message: form.requirement,
          service: s.title,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to submit your request.");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full text-sm outline-none transition-colors rounded-xl px-4 py-3";

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", paddingTop: "3rem" }}>

      {/* Breadcrumb */}
      <div style={{ padding: "0 3rem 1rem", maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "12px", color: "var(--text3)" }}>
          <Link href="/" style={{ color: "var(--text3)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/services" style={{ color: "var(--text3)", textDecoration: "none" }}>Services</Link>
          <span>/</span>
          <span style={{ color: "#1268f3" }}>{s.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="service-simple-hero" style={{ padding: "2rem 3rem 4rem", maxWidth: "86rem", margin: "0 auto", position: "relative" }}>
        <div className="service-simple-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "3rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ position: "relative" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{s.icon}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}><div style={{ width: "2rem", height: "1px", background: "#176B87" }} /><span style={{ color: "#176B87", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 800 }}>Workforce services</span></div>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.96, marginBottom: "1.25rem", letterSpacing: "-2px" }}>{s.title}</h1>
            <p style={{ color: "#b62d35", fontSize: "1.08rem", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.5 }}>{s.tagline}</p>
            <p style={{ color: "var(--text2)", fontSize: "15px", lineHeight: 1.8, maxWidth: "600px", marginBottom: "2rem" }}>{s.desc}</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}><button onClick={() => { setShowForm(true); setSubmitted(false); setSubmitError(""); setErrors({}); }} style={{ padding: "13px 24px", borderRadius: "3px", background: "#176B87", color: "#fff", fontWeight: 800, fontSize: "12px", border: "1px solid #176B87", cursor: "pointer" }}>Request a quote →</button><Link href="/contact?type=workforce" style={{ padding: "13px 24px", borderRadius: "3px", border: "1px solid var(--border)", color: "var(--text)", fontWeight: 700, fontSize: "12px", textDecoration: "none" }}>Talk to the team</Link></div>
          </motion.div>
          <div className="service-simple-photo" style={{ position: "relative", minHeight: "420px", overflow: "hidden", background: "#081726" }}>
            <Image src={serviceKey === "security" ? "/media/user/security-services.webp" : serviceKey === "housekeeping" ? "/media/user/facility-housekeeping.webp" : serviceKey === "engineering-hiring" ? "/media/user/engineering-hiring.webp" : "/media/user/industrial-staffing.webp"} alt={`${s.title} professional service environment`} fill priority sizes="(max-width: 900px) 100vw, 45vw" quality={88} style={{ objectFit: "cover" }}/>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(4,13,24,.86),rgba(4,13,24,.03) 70%)" }}/>
            <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, color: "white" }}><span style={{ fontSize: "9px", fontWeight: 900, letterSpacing: ".17em", color: "#ffb8bc" }}>REQUIREMENT → PLAN → DELIVERY</span><p style={{ fontSize: "clamp(22px,2.8vw,34px)", fontWeight: 800, lineHeight: 1.1, marginTop: 10, maxWidth: 420 }}>Clear scope. Accountable delivery.</p></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "3rem", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 900, marginBottom: "2rem" }}>What&apos;s included</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {s.features.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem", border: "1px solid var(--border)", borderRadius: "0.75rem", background: "var(--card)" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(18,104,243,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#1268f3"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span style={{ color: "var(--text)", fontSize: "13.5px", fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "4rem 3rem", maxWidth: "80rem", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 900, marginBottom: "2.5rem" }}>How it works</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {s.process.map((step, i) => (
            <motion.div key={step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "1.25rem 1.5rem", border: "1px solid var(--border)", borderRadius: "1rem", background: "var(--card)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#1268f3", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "14px", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <span style={{ color: "var(--text)", fontWeight: 600, fontSize: "15px" }}>{step}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section style={{ padding: "0 3rem 4rem", maxWidth: "80rem", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "1.25rem" }}>Industries we serve this for</h2>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {s.industries.map(ind => (
            <Link key={ind} href="/industries" style={{ padding: "8px 18px", border: "1px solid var(--border)", borderRadius: "999px", fontSize: "13px", color: "var(--text2)", textDecoration: "none", fontWeight: 500 }}>
              {ind}
            </Link>
          ))}
        </div>
      </section>

      {/* All Services */}
      <section style={{ padding: "3rem", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "1.5rem" }}>Explore other services</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {(Object.keys(SERVICES_DATA) as ServiceKey[]).filter(k => k !== serviceKey).map(k => (
              <Link key={k} href={`/services/${k}`} style={{ padding: "10px 20px", border: "1px solid var(--border)", borderRadius: "999px", fontSize: "13px", color: "var(--text2)", textDecoration: "none", fontWeight: 600 }}>
                {SERVICES_DATA[k].icon} {SERVICES_DATA[k].title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY MODAL ── */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-[var(--bg)]/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[9991] overflow-y-auto"
              style={{ borderRadius: "1.5rem" }}>
              <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "1.5rem", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <h3 style={{ color: "var(--text)", fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>Request a quote</h3>
                    <p style={{ color: "var(--text2)", fontSize: "12px", margin: 0, marginTop: "2px" }}>{s.title} — your requirement will be reviewed by the team</p>
                  </div>
                  <button onClick={() => setShowForm(false)} style={{ width: "32px", height: "32px", border: "1px solid var(--border)", borderRadius: "0.5rem", background: "transparent", color: "var(--text2)", cursor: "pointer", fontSize: "14px" }}>✕</button>
                </div>

                {/* Form */}
                <div style={{ padding: "1.5rem" }}>
                  {!submitted ? (
                    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <input ref={honeypotRef} className="contact-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        {[
                          { field: "name" as const, label: "Full Name *", ph: "Your name" },
                          { field: "company" as const, label: "Company", ph: "Company name" },
                          { field: "phone" as const, label: "Phone *", ph: "10-digit mobile" },
                          { field: "email" as const, label: "Email *", ph: "your@email.com" },
                        ].map(({ field, label, ph }) => (
                          <div key={field}>
                            <label style={{ color: "var(--text2)", fontSize: "11px", display: "block", marginBottom: "5px" }}>{label}</label>
                            <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                              placeholder={ph} className={inp}
                              style={{ background: "var(--input)", border: `1px solid ${errors[field] ? "rgba(239,68,68,0.6)" : "var(--input-b)"}`, color: "var(--text)", outline: "none" }} />
                            {errors[field] && <p style={{ color: "#1268f3", fontSize: "11px", marginTop: "3px" }}>{errors[field]}</p>}
                          </div>
                        ))}
                      </div>

                      <div>
                        <label style={{ color: "var(--text2)", fontSize: "11px", display: "block", marginBottom: "5px" }}>Primary Location *</label>
                        <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, state or site" className={inp} style={{ background: "var(--input)", border: `1px solid ${errors.location ? "rgba(239,68,68,0.6)" : "var(--input-b)"}`, color: "var(--text)", outline: "none" }} />
                        {errors.location && <p style={{ color: "#176B87", fontSize: "11px", marginTop: "3px" }}>{errors.location}</p>}
                      </div>

                      <div>
                        <label style={{ color: "var(--text2)", fontSize: "11px", display: "block", marginBottom: "5px" }}>Number of Workers / Positions Needed *</label>
                        <select value={form.workers} onChange={e => setForm(f => ({ ...f, workers: e.target.value }))}
                          className={inp} style={{ background: "var(--input)", border: "1px solid var(--input-b)", color: "var(--text)", outline: "none" }}>
                          <option value="">Select range</option>
                          {["1–5", "6–15", "16–30", "31–50", "51–100", "100+"].map(o => <option key={o}>{o}</option>)}
                        </select>
                      </div>

                      <div>
                        <label style={{ color: "var(--text2)", fontSize: "11px", display: "block", marginBottom: "5px" }}>Describe Your Requirement *</label>
                        <textarea value={form.requirement} onChange={e => setForm(f => ({ ...f, requirement: e.target.value }))}
                          rows={3} placeholder="Tell us your specific needs, location, timeline..."
                          className={inp} style={{ background: "var(--input)", border: `1px solid ${errors.requirement ? "rgba(239,68,68,0.6)" : "var(--input-b)"}`, color: "var(--text)", outline: "none", resize: "none" }} />
                        {errors.requirement && <p style={{ color: "#1268f3", fontSize: "11px", marginTop: "3px" }}>{errors.requirement}</p>}
                      </div>

                      <button type="submit" disabled={loading}
                        style={{ padding: "13px", borderRadius: "999px", background: "#1268f3", color: "#fff", fontWeight: 700, fontSize: "14px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, boxShadow: "0 0 25px rgba(239,68,68,0.35)" }}>
                        {loading ? "Sending..." : "Submit Inquiry →"}
                      </button>
                    </form>
                  ) : (
                    <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                      <h3 style={{ color: "var(--text)", fontWeight: 800, marginBottom: "0.5rem" }}>Inquiry Received!</h3>
                      <p style={{ color: "var(--text2)", fontSize: "13px" }}>Our team will review your requirement and use the contact details you provided to follow up.</p>
                      <button onClick={() => { setShowForm(false); setSubmitted(false); setForm({ name: "", company: "", phone: "", email: "", requirement: "", workers: "", location: "" }); setErrors({}); }} style={{ marginTop: "1.5rem", color: "#176B87", background: "transparent", border: "none", cursor: "pointer", fontSize: "13px" }}>Close</button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

// ── Individual page exports (each service sub-page) ──
export function WorkforceSolutionsPage() { return <ServicePageContent serviceKey="workforce-solutions" />; }
export function RecruitmentPage() { return <ServicePageContent serviceKey="recruitment" />; }
export function EngineeringHiringPage() { return <ServicePageContent serviceKey="engineering-hiring" />; }
export function StaffingPage() { return <ServicePageContent serviceKey="staffing" />; }
export function SecurityPage() { return <ServicePageContent serviceKey="security" />; }
export function HousekeepingPage() { return <ServicePageContent serviceKey="housekeeping" />; }