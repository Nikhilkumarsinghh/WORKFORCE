import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Check, GraduationCap, Handshake } from "lucide-react";
import EnquiryForm, { type EnquiryField } from "../../components/wf/EnquiryForm";

export const metadata: Metadata = {
  title: "Campus Placement & Campus Hiring",
  description: "Campus placement for employers, colleges, ITIs and polytechnics, plus student registration for skilled and entry-level jobs.",
  alternates: { canonical: "/campus-hiring" },
};

const employer: EnquiryField[] = [
  { name: "company", label: "Company name", required: true }, { name: "name", label: "Contact person", required: true },
  { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "email", label: "Work email", type: "email", required: true },
  { name: "students", label: "Students / trainees needed", type: "number", required: true }, { name: "stream", label: "Qualification", type: "select", options: ["ITI", "Diploma", "Graduate (non-engineering)", "Engineering", "Mixed"] },
  { name: "skills", label: "Skills / trades required", required: true, full: true }, { name: "location", label: "Location" }, { name: "date", label: "Preferred drive date", type: "date" },
];
const college: EnquiryField[] = [
  { name: "company", label: "College / institute name", required: true }, { name: "name", label: "Contact person (TPO / principal)", required: true },
  { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "email", label: "Official email", type: "email", required: true },
  { name: "city", label: "City / state", required: true }, { name: "type", label: "Institute type", type: "select", options: ["ITI", "Polytechnic / Diploma", "Degree college", "Engineering college", "Skill training centre"] },
  { name: "students", label: "Final-year students (approx.)", type: "number" }, { name: "streams", label: "Streams / trades", full: true },
];

const steps = [["01", "Requirement or partnership", "Employers share headcount, skills and timeline. Colleges share streams, batch size and availability."], ["02", "Match & plan", "We match requirement with suitable institutes and plan the drive."], ["03", "Shortlist & pre-screen", "Student shortlisting, basic screening and scheduling."], ["04", "Campus drive", "Registration, assessments, interviews and offers coordinated on the day."], ["05", "Joining support", "Documentation and joining follow-up."]];

export default function CampusPage() {
  return (
    <main id="main">
      <section className="wf-page-hero">
        <div className="wf-shell">
          <nav className="wf-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>/<span>Campus placement</span></nav>
          <span className="wf-eyebrow">Campus placement</span>
          <h1>Campus drives that turn <em>students into employees.</em></h1>
          <p className="wf-lead">We coordinate placement between employers and colleges, ITIs and polytechnics, for skilled and entry-level roles alike.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="#employers" className="wf-btn wf-btn-primary">I&apos;m an employer <ArrowRight size={16} /></a>
            <a href="#colleges" className="wf-btn wf-btn-ghost">I&apos;m a college / TPO</a>
            <Link href="/candidates?track=fresher#register" className="wf-btn wf-btn-ghost">I&apos;m a student</Link>
          </div>
        </div>
      </section>

      <section className="wf-section">
        <div className="wf-shell wf-campus">
          <div className="wf-campus-img" data-reveal="zoom"><Image src="/media/user/campus-hiring.webp" alt="Students attending a campus placement drive" fill priority sizes="(max-width:900px) 100vw, 50vw" /></div>
          <div data-reveal="">
            <span className="wf-eyebrow">Three ways in</span>
            <h2 className="wf-h2">One program, <em>three audiences.</em></h2>
            <ul className="wf-checks">
              <li><Building2 size={18} /><span><strong>Employers</strong>: hire trained freshers in volume without running campus logistics yourself.</span></li>
              <li><Handshake size={18} /><span><strong>Colleges &amp; placement cells</strong>: get regular employer drives, from skilled to entry-level hiring.</span></li>
              <li><GraduationCap size={18} /><span><strong>Students</strong>: register once, including 10th/12th pass, ITI, diploma, graduates and engineers.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="wf-section dark">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow light">How a drive works</span><h2 className="wf-h2">Five steps, <em>one coordinator.</em></h2></div></div>
          <div className="wf-svc-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
            {steps.map(([n, t, d], i) => <div key={n} className="wf-steps" data-reveal="" style={{ ["--d" as string]: `${i * 0.07}s`, padding: 22 }}><strong style={{ color: "#79b7c7", fontSize: 26 }}>{n}</strong><h3 style={{ margin: "10px 0 8px", fontSize: 18 }}>{t}</h3><span>{d}</span></div>)}
          </div>
        </div>
      </section>

      <section className="wf-section" id="employers">
        <div className="wf-shell wf-form-wrap">
          <div className="wf-side" data-reveal="left"><span className="wf-eyebrow">For employers</span><h2 className="wf-h2">Request a <em>campus drive.</em></h2><p className="wf-lead">Tell us how many students you need and what skills they should have. We plan the drive with suitable institutes.</p></div>
          <div className="wf-form-card" data-reveal="right"><h3>Campus hiring request</h3><div style={{ marginTop: 18 }}><EnquiryForm fields={employer} type="Campus Hiring" source="Campus Hiring Page" subject="Campus hiring request" button="Request campus drive" success="Thank you. Our campus team will contact you to plan the drive." /></div></div>
        </div>
      </section>

      <section className="wf-section alt" id="colleges">
        <div className="wf-shell wf-form-wrap">
          <div className="wf-side" data-reveal="left"><span className="wf-eyebrow">For colleges &amp; TPOs</span><h2 className="wf-h2">Bring employer drives to <em>your campus.</em></h2><p className="wf-lead">Share your institute details and streams. When a matching employer requirement comes in, we reach out to plan a drive. We cannot guarantee drives or placements for every institute.</p></div>
          <div className="wf-form-card" data-reveal="right"><h3>College partnership</h3><div style={{ marginTop: 18 }}><EnquiryForm fields={college} type="College Partnership" source="Campus Hiring Page - College" subject="College placement partnership" button="Submit college details" success="Thank you. Our team will review your institute details and get in touch." /></div></div>
        </div>
      </section>

      <section className="wf-section">
        <div className="wf-shell"><div className="wf-cta" data-reveal="zoom"><div><h2>Students: register once.</h2><p>Final-year or passed out, skilled or not, tell us about yourself and be considered for upcoming drives and openings.</p></div><div className="wf-cta-actions"><Link href="/candidates?track=fresher#register" className="wf-btn wf-btn-light">Student registration <ArrowRight size={16} /></Link><Link href="/candidates/fresher-jobs" className="wf-btn wf-btn-outline-light">Fresher job guide</Link></div></div></div>
      </section>
    </main>
  );
}
