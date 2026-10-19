"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES_DATA: Record<string, {
  icon: string; title: string; badge?: string;
  tagline: string; desc: string; color: string;
  included: string[]; steps: string[];
  related: { icon: string; title: string; href: string }[];
}> = {
  recruitment: {
    icon: "👥", title: "Recruitment Services", badge: "Most Popular",
    tagline: "End-to-end hiring for blue-collar, grey-collar & white-collar roles",
    color: "#1268f3",
    desc: "We help define the role, sourcing criteria, screening process and interview flow so candidates can be assessed against the actual requirement.",
    included: ["Job requirement analysis", "CV sourcing & shortlisting", "Screening scope agreed upfront", "Interview scheduling", "Offer coordination", "Replacement terms defined in scope"],
    steps: ["Share the role requirement", "Agree sourcing and screening criteria", "Review candidate profiles", "Coordinate selection and joining steps"],
    related: [
      { icon: "🏭", title: "Industrial Staffing", href: "/services/staffing" },
      { icon: "🎯", title: "Campus Hiring", href: "/campus-hiring" },
      { icon: "⚡", title: "Workforce Solutions", href: "/services/workforce-solutions" },
    ],
  },
  staffing: {
    icon: "🏭", title: "Industrial Staffing",
    tagline: "Contractual & permanent staffing for manufacturing & logistics",
    color: "#1268f3",
    desc: "Discuss skilled and semi-skilled workforce requirements for factories, warehouses and logistics operations. Role scope, locations, screening, mobilisation and reporting are agreed before an engagement begins.",
    included: ["Contract staffing options", "Permanent placement where agreed", "Flexible staffing scope", "Compliance responsibilities documented", "Attendance reporting scope", "Replacement process defined in the service scope"],
    steps: ["Confirm headcount and roles", "Agree screening and mobilisation plan", "Define reporting and attendance", "Review payroll and compliance ownership"],
    related: [
      { icon: "👥", title: "Recruitment", href: "/services/recruitment" },
      { icon: "🛡️", title: "Security Services", href: "/services/security" },
      { icon: "🧹", title: "Housekeeping", href: "/services/housekeeping" },
    ],
  },
  security: {
    icon: "🛡️", title: "Security Services",
    tagline: "Security workforce requirements planned around the site and agreed scope",
    color: "#64748b",
    desc: "Discuss security staffing needs for offices, industrial plants, retail sites, healthcare facilities and residential environments. Licensing, permitted duties, supervision and site requirements must be confirmed before engagement.",
    included: ["Site and duty requirements", "Role and verification criteria", "Supervision and escalation plan", "Shift and attendance coordination", "Site-specific briefing", "Reporting expectations agreed"],
    steps: ["Review the site and duties", "Confirm licensing and role requirements", "Agree staffing and shift plan", "Set reporting and escalation routines"],
    related: [
      { icon: "🏭", title: "Industrial Staffing", href: "/services/staffing" },
      { icon: "🧹", title: "Housekeeping", href: "/services/housekeeping" },
      { icon: "⚡", title: "Workforce Solutions", href: "/services/workforce-solutions" },
    ],
  },
  housekeeping: {
    icon: "🧹", title: "Housekeeping Services",
    tagline: "Trained housekeeping & facility management for hotels, malls & offices",
    color: "#22c55e",
    desc: "Discuss housekeeping and facilities staffing for offices, healthcare, hospitality, retail and industrial environments. Training, uniforms, equipment, supervision and quality checks depend on the agreed service scope.",
    included: ["Office housekeeping", "Hospital & clinic cleaning scope", "Hotel room attendants", "Industrial cleaning scope", "Pantry & cafeteria staff", "Supervision plan by scope"],
    steps: ["Facility assessment", "Staff selection & training", "Deployment with uniforms", "Supervisor oversight & reporting"],
    related: [
      { icon: "🛡️", title: "Security Services", href: "/services/security" },
      { icon: "🏭", title: "Industrial Staffing", href: "/services/staffing" },
      { icon: "⚡", title: "Workforce Solutions", href: "/services/workforce-solutions" },
    ],
  },
  "workforce-solutions": {
    icon: "⚡", title: "Workforce Solutions",
    tagline: "Workforce operations and HR coordination by agreed scope",
    color: "#1268f3",
    desc: "Discuss workforce operations such as onboarding coordination, payroll workflows, attendance reporting and HR records. Responsibilities and compliance scope are defined in writing for each engagement.",
    included: ["Payroll coordination by scope", "Compliance ownership documented", "Employee onboarding workflow", "Attendance management", "Workforce records", "HR reporting requirements"],
    steps: ["Share current workforce requirements", "Agree process and responsibility boundaries", "Plan the transition of records", "Review reports and operating needs"],
    related: [
      { icon: "👥", title: "Recruitment", href: "/services/recruitment" },
      { icon: "🏭", title: "Industrial Staffing", href: "/services/staffing" },
      { icon: "🎯", title: "Campus Hiring", href: "/campus-hiring" },
    ],
  },
};

interface Props { slug: string; }

export default function ServicePageClient({ slug }: Props) {
  const svc = SERVICES_DATA[slug];
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", workers: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  if (!svc) {
    return (
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 48 }}>🔍</div>
        <h1 style={{ fontWeight: 800, fontSize: 28 }}>Service not found</h1>
        <Link href="/services" style={{ color: "#1268f3", fontWeight: 700, textDecoration: "none" }}>← Back to Services</Link>
      </main>
    );
  }

  async function submitQuote(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg("");
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service: svc.title }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("done");
      } else {
        setErrMsg(data.error || "Something went wrong. Please try again.");
        setStatus("idle");
      }
    } catch {
      setErrMsg("Network error. Please check your connection.");
      setStatus("idle");
    }
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Hero */}
      <section style={{ padding: "100px 24px 72px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28 }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
            {" / "}
            <Link href="/services" style={{ color: "var(--muted)", textDecoration: "none" }}>Services</Link>
            {" / "}
            <span style={{ color: svc.color }}>{svc.title}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "start" }}>
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16, fontSize: 28,
                background: `${svc.color}18`, border: `1.5px solid ${svc.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                {svc.icon}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 28, height: 2, background: svc.color }} />
                <span style={{ color: svc.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Service</span>
                {svc.badge && (
                  <span style={{ background: svc.color, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{svc.badge}</span>
                )}
              </div>

              <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.12, marginBottom: 14 }}>
                {svc.title}
              </h1>
              <p style={{ color: svc.color, fontSize: 16, fontWeight: 600, marginBottom: 20 }}>{svc.tagline}</p>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>{svc.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                <button
                  onClick={() => setQuoteOpen(true)}
                  style={{
                    background: svc.color, color: "#fff", border: "none",
                    padding: "14px 28px", borderRadius: 50, fontWeight: 700,
                    fontSize: 15, cursor: "pointer",
                    boxShadow: `0 0 24px ${svc.color}55`,
                    fontFamily: "inherit",
                  }}
                >
                  Request a quote →
                </button>
                <a
                  href={`https://wa.me/919975315002?text=Hi, I need ${encodeURIComponent(svc.title)} for my company`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    background: "#22c55e", color: "#fff",
                    padding: "14px 24px", borderRadius: 50, fontWeight: 700,
                    fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                  }}
                >
                  💬 WhatsApp
                </a>
                <Link href="/contact" style={{
                  border: "1.5px solid var(--border)", color: "var(--text)",
                  padding: "14px 24px", borderRadius: 50, fontWeight: 600,
                  fontSize: 15, textDecoration: "none",
                }}>
                  Talk to Expert
                </Link>
              </div>
            </motion.div>

            {/* Right — What's Included */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div style={{ background: "var(--card-bg)", border: "1.5px solid var(--border)", borderRadius: 20, padding: 28, marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 18 }}>What's included</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {svc.included.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${svc.color}20`, border: `1.5px solid ${svc.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: svc.color, fontWeight: 700 }}>✓</div>
                      <span style={{ fontSize: 14, color: "var(--text)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to action mini */}
              <div style={{ background: svc.color, borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Requirement reviewed by the team</div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Call: +91 99753 15002</div>
                </div>
                <a href="tel:+919975315002" style={{ background: "#fff", color: svc.color, padding: "10px 18px", borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  📞 Call Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "72px 24px", background: "var(--section-alt)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>How it works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {svc.steps.map((step, i) => (
              <div key={step} style={{ textAlign: "center" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${svc.color}, ${svc.color}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", color: "#fff", fontWeight: 800, fontSize: 18,
                  boxShadow: `0 8px 24px ${svc.color}40`,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.5 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section style={{ padding: "72px 24px 96px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 28, textAlign: "center" }}>Explore other services</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {svc.related.map((r) => (
              <Link key={r.href} href={r.href} style={{
                background: "var(--card-bg)", border: "1.5px solid var(--border)",
                borderRadius: 14, padding: "16px 22px", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = svc.color; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                <span style={{ fontSize: 24 }}>{r.icon}</span>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{r.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Modal ── */}
      <AnimatePresence>
        {quoteOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { if (status !== "sending") setQuoteOpen(false); }}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", zIndex: 9000, backdropFilter: "blur(6px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{
                position: "fixed", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: 9001,
                background: "var(--card-bg)",
                border: "1.5px solid var(--border)",
                borderRadius: 22, width: "min(580px, 96vw)",
                maxHeight: "92vh", overflowY: "auto",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Modal header */}
              <div style={{
                position: "sticky", top: 0, background: "var(--card-bg)",
                borderBottom: "1px solid var(--border)", padding: "22px 28px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                zIndex: 1,
              }}>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 3 }}>Request a quote</h3>
                  <p style={{ color: "var(--muted)", fontSize: 13 }}>{svc.title} — Requirement reviewed by the team</p>
                </div>
                <button
                  onClick={() => setQuoteOpen(false)}
                  style={{ background: "var(--section-alt)", border: "1px solid var(--border)", borderRadius: 8, width: 36, height: 36, cursor: "pointer", color: "var(--text)", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: "28px" }}>
                {status === "done" ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                    </motion.div>
                    <h3 style={{ fontWeight: 800, fontSize: 24, marginBottom: 10 }}>Request Sent!</h3>
                    <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 6 }}>
                      Our team will call you within 4 business hours.
                    </p>
                    <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 28 }}>
                      For urgent needs, WhatsApp us at <strong>+91 99753 15002</strong>
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                      <button
                        onClick={() => { setQuoteOpen(false); setStatus("idle"); setForm({ name: "", phone: "", email: "", company: "", workers: "", message: "" }); }}
                        style={{ background: svc.color, color: "#fff", border: "none", padding: "12px 24px", borderRadius: 50, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                      >
                        Close
                      </button>
                      <a
                        href={`https://wa.me/919975315002?text=Hi, I submitted a quote request for ${encodeURIComponent(svc.title)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ background: "#22c55e", color: "#fff", padding: "12px 24px", borderRadius: 50, fontWeight: 700, textDecoration: "none", fontSize: 14, display: "inline-block" }}
                      >
                        💬 WhatsApp Follow-up
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submitQuote}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      {[
                        { key: "name", label: "Full Name *", placeholder: "Your full name", type: "text", required: true },
                        { key: "phone", label: "Phone Number *", placeholder: "10-digit mobile", type: "tel", required: true },
                        { key: "email", label: "Email Address *", placeholder: "your@email.com", type: "email", required: true },
                        { key: "company", label: "Company Name", placeholder: "Your company (optional)", type: "text", required: false },
                      ].map((f) => (
                        <div key={f.key}>
                          <label style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: 6, letterSpacing: "0.04em" }}>{f.label}</label>
                          <input
                            type={f.type}
                            required={f.required}
                            placeholder={f.placeholder}
                            value={form[f.key as keyof typeof form]}
                            onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                            style={{
                              width: "100%", background: "var(--input-bg)",
                              border: "1.5px solid var(--border)", borderRadius: 10,
                              padding: "11px 14px", fontSize: 14, color: "var(--text)",
                              outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: 6 }}>Number of Workers Needed *</label>
                      <select
                        required
                        value={form.workers}
                        onChange={(e) => setForm((p) => ({ ...p, workers: e.target.value }))}
                        style={{ width: "100%", background: "var(--input-bg)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "var(--text)", fontFamily: "inherit" }}
                      >
                        <option value="">Select range</option>
                        <option value="1-10">1 – 10 workers</option>
                        <option value="11-50">11 – 50 workers</option>
                        <option value="51-200">51 – 200 workers</option>
                        <option value="200+">200+ workers</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: 22 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", display: "block", marginBottom: 6 }}>Describe Your Requirement *</label>
                      <textarea
                        required
                        rows={4}
                        minLength={10}
                        placeholder="Tell us the job role, location, timeline, any specific requirements..."
                        value={form.message}
                        onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                        style={{ width: "100%", background: "var(--input-bg)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "var(--text)", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
                      />
                    </div>

                    {errMsg && (
                      <div style={{ background: "rgba(18,104,243,0.08)", border: "1px solid rgba(18,104,243,0.18)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#1268f3", fontSize: 13 }}>
                        ⚠️ {errMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      style={{
                        width: "100%", background: svc.color, color: "#fff",
                        border: "none", padding: "15px", borderRadius: 50,
                        fontWeight: 700, fontSize: 16, cursor: status === "sending" ? "not-allowed" : "pointer",
                        opacity: status === "sending" ? 0.75 : 1,
                        boxShadow: `0 0 24px ${svc.color}44`, fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      {status === "sending" ? "⏳ Sending..." : "Submit Request →"}
                    </button>

                    <p style={{ color: "var(--muted)", fontSize: 12, textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" style={{ color: svc.color }}>Privacy Policy</Link>.
                      Your data is secure and never shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .service-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </main>
  );
}