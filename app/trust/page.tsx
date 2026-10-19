import type { Metadata } from "next";
import { ShieldCheck, FileText, UserCheck, AlertTriangle } from "lucide-react";
import { Checks, CtaBand, Faq, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Trust, Compliance & Candidate Safety",
  description: "How UniqueToo handles compliance, data protection and candidate safety: written scope, no candidate fees and responsible data handling.",
  alternates: { canonical: "/trust" },
};

export default function TrustPage() {
  return (
    <main id="main">
      <PageHero crumbs={[["Who we are", "/about"], ["Trust & compliance"]]} eyebrow="Trust & compliance" title={<>Hiring done <em>responsibly.</em></>} text="The standards we follow for employers, candidates and data, and what to do if something doesn't look right." />
      <section className="wf-section"><div className="wf-shell"><div className="wf-grid3">
        {[[FileText, "Written scope", "Responsibilities, screening scope and statutory items are defined in writing for each engagement."], [UserCheck, "Fair to candidates", "Candidates are never charged for registration, interviews or placement."], [ShieldCheck, "Data protection", "Personal data is collected for hiring purposes, handled with access controls and retained only as needed."]].map(([I, t, d]) => { const Icon = I as typeof FileText; return <div key={t as string} className="wf-tile" data-reveal=""><Icon size={28} color="#176b87" /><h3>{t as string}</h3><p>{d as string}</p></div>; })}
      </div></div></section>
      <section className="wf-section alt"><div className="wf-shell wf-split">
        <div className="wf-split-main">
          <h2 className="wf-h3">For employers</h2>
          <Checks items={["Role briefs, screening criteria and timelines confirmed before work starts", "Statutory responsibilities such as PF, ESI and other applicable items stated in the agreement", "Verification coordinated as per the agreed scope and applicable rules", "Honest communication if a requirement is unrealistic"]} />
          <h2 className="wf-h3" style={{ marginTop: 40 }}>For candidates</h2>
          <Checks items={["No fee for registration, interview or placement", "Clear communication on role, location, shift and pay before you accept", "You decide what to share; resume is optional", "No promise of a job, salary or joining date on registration"]} />
          <h2 className="wf-h3" style={{ marginTop: 40 }}>Frequently asked</h2>
          <Faq items={[["How is my data used?", "Your details are used to contact you about suitable jobs and may be shared with an employer when you apply or agree. See our Privacy Policy."], ["Who do I contact about a concern?", "Email contact@uniquetoo.in with details. For payment fraud, also call the cyber crime helpline 1930."], ["Does UniqueToo guarantee placement?", "No. Placement depends on employer demand and candidate fit. We coordinate the process honestly."]]} />
        </div>
        <aside className="wf-aside"><div className="wf-aside-card" style={{ background: "#fff7ec", borderColor: "#f6d9b4" }}><h3 style={{ display: "flex", gap: 8, alignItems: "center" }}><AlertTriangle size={20} /> Fraud alert</h3><p style={{ color: "#7a4a12" }}>UniqueToo never asks candidates for money. If anyone does so in our name, stop, keep a record and email contact@uniquetoo.in.</p></div></aside>
      </div></section>
      <CtaBand title="Questions about how we work?" text="We're happy to explain our process in detail." primary={["Contact us", "/contact"]} secondary={["Privacy Policy", "/privacy-policy"]} />
    </main>
  );
}
