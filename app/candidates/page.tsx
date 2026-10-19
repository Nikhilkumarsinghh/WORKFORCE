import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info, ShieldCheck, Clock, PhoneCall } from "lucide-react";
import CandidateForm from "../../components/wf/CandidateForm";
import { GUIDES } from "../../data/candidate-guides";

export const metadata: Metadata = {
  title: "Register for Jobs: Skilled & Non-Skilled",
  description: "Register with UniqueToo for skilled, semi-skilled, non-skilled and fresher jobs across India. 10th, 12th, ITI, diploma and graduates welcome.",
  alternates: { canonical: "/candidates" },
};

const FAMILIES = [
  { t: "Manufacturing & production", d: "Machine operator, production helper, packing, quality checker, line supervisor.", tags: ["10th pass", "ITI", "Diploma"] },
  { t: "Warehouse & logistics", d: "Picker, packer, loader, inventory assistant, forklift operator, dispatch executive.", tags: ["10th pass", "12th pass"] },
  { t: "Security & facility", d: "Security guard, supervisor, housekeeping, pantry and MEP helper.", tags: ["10th pass", "Training provided"] },
  { t: "Technical & engineering", d: "Fitter, welder, electrician, CNC/VMC, maintenance, diploma and graduate engineers.", tags: ["ITI", "Diploma", "Engineer"] },
  { t: "Customer support & office", d: "BPO, data entry, back-office, receptionist, accounts assistant.", tags: ["12th pass", "Graduate"] },
  { t: "Sales, retail & delivery", d: "Store associate, field sales, billing, delivery executive, driver.", tags: ["10th pass", "12th pass", "Graduate"] },
];

export default function CandidatesPage() {
  return (
    <main id="main">
      <section className="wf-page-hero">
        <div className="wf-shell">
          <nav className="wf-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>/<span>For candidates</span></nav>
          <span className="wf-eyebrow">For candidates</span>
          <h1>Jobs for <em>every skill level.</em> Register once, get matched.</h1>
          <p className="wf-lead">Skilled, semi-skilled, non-skilled or a fresher: tell us about yourself and our team matches your profile to employer requirements. It takes about two minutes, and a resume is optional.</p>
          <div className="wf-hero-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
            <a href="#register" className="wf-btn wf-btn-primary">Register your profile <ArrowRight size={16} /></a>
            <Link href="/jobs" className="wf-btn wf-btn-ghost">Browse openings</Link>
          </div>
        </div>
      </section>

      <section className="wf-section" id="register">
        <div className="wf-shell wf-form-wrap">
          <div className="wf-side" data-reveal="left">
            <span className="wf-eyebrow">Register</span>
            <h2 className="wf-h2">Tell us about <em>yourself.</em></h2>
            <p className="wf-lead">No degree needed for many roles. Choose the track closest to you and share the city where you want to work.</p>
            <div className="wf-info"><Clock size={20} /><div><strong>Takes about 2 minutes</strong><span>Only name, mobile, city, education and experience are required.</span></div></div>
            <div className="wf-info"><PhoneCall size={20} /><div><strong>We contact you</strong><span>If a requirement matches, the team calls the mobile number you share.</span></div></div>
            <div className="wf-info"><ShieldCheck size={20} /><div><strong>Never pay for a job</strong><span>Do not pay money or share OTPs or bank details with anyone. <Link href="/candidates/avoid-job-scams" className="wf-link">Read how to stay safe</Link></span></div></div>
            <div className="wf-note"><Info size={18} /><span>Registration does not guarantee a job, salary or joining date. Employers make the final decision.</span></div>
          </div>
          <div className="wf-form-card" data-reveal="right"><h3>Candidate registration</h3><p style={{ margin: 0, color: "var(--wf-body)" }}>Fields marked * are required.</p><div style={{ marginTop: 18 }}><CandidateForm /></div></div>
        </div>
      </section>

      <section className="wf-section alt">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">Role families</span><h2 className="wf-h2">Where candidates <em>get placed.</em></h2></div></div>
          <div className="wf-roles">
            {FAMILIES.map((r, i) => (
              <article key={r.t} className="wf-role" data-reveal="" style={{ ["--d" as string]: `${(i % 3) * 0.07}s` }}>
                <h3>{r.t}</h3><p>{r.d}</p><div className="wf-tags">{r.tags.map((x) => <span key={x}>{x}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wf-section">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">Guides</span><h2 className="wf-h2">Job guides <em>by qualification.</em></h2></div></div>
          <div className="wf-posts">
            {GUIDES.map((g, i) => (
              <Link key={g.slug} href={`/candidates/${g.slug}`} className="wf-post" data-reveal="" style={{ ["--d" as string]: `${(i % 3) * 0.07}s` }}>
                <small>Candidate guide</small><h3>{g.h1}</h3><p>{g.description}</p><span className="wf-link">Read guide <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
