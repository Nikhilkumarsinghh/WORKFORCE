import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROLES } from "../../lib/content/roles";
import { CtaBand, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Roles We Hire For: Skilled & Entry-Level",
  description: "Role guides for production operators, CNC operators, fitters, welders, security guards, warehouse associates, housekeeping staff, drivers, trainees and more, with skills, qualifications and growth paths.",
  alternates: { canonical: "/roles" },
};

export default function RolesPage() {
  const families = Array.from(new Set(ROLES.map((r) => r.family)));
  return (
    <main id="main">
      <PageHero crumbs={[["Roles"]]} eyebrow="Roles" title={<>Roles we hire for, <em>explained.</em></>} text="Plain-language guides to the jobs we fill every day: what the work involves, what skills and qualifications help, and where each role can lead." actions={<Link href="/candidates#register" className="wf-btn wf-btn-primary">Register for jobs <ArrowRight size={16} /></Link>} />
      {families.map((f) => (
        <section key={f} className="wf-section" style={{ paddingBottom: 0 }}><div className="wf-shell">
          <h2 className="wf-h3" data-reveal="">{f}</h2>
          <div className="wf-grid3">{ROLES.filter((r) => r.family === f).map((r, n) => (
            <Link key={r.slug} href={`/roles/${r.slug}`} className="wf-tile" data-reveal="" style={{ ["--d" as string]: `${(n % 3) * 0.06}s` }}><small>{r.level}</small><h3>{r.title}</h3><p>{r.summary}</p><span className="wf-link">Role guide <ArrowRight size={15} /></span></Link>
          ))}</div>
        </div></section>
      ))}
      <div style={{ height: 80 }} />
      <CtaBand title="Looking for work, or for workers?" text="Register your profile or share a requirement. We respond to both." primary={["Register for jobs", "/candidates#register"]} secondary={["Post a requirement", "/employers#requirement"]} />
    </main>
  );
}
