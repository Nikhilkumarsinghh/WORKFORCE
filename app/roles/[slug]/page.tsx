import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ROLES, getRole } from "../../../lib/content/roles";
import { INDUSTRIES } from "../../../lib/content/industries";
import { getService } from "../../../lib/content/services";
import { Checks, CtaBand, DetailHero, Faq, Related, crumbLd, faqLd } from "../../../components/wf/blocks";
import { SITE_URL } from "../../../lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => ROLES.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = getRole((await params).slug);
  if (!r) return {};
  return { title: `${r.title}: Duties, Skills & Jobs`, description: `${r.summary} Qualification: ${r.qualification}.`.slice(0, 158), alternates: { canonical: `/roles/${r.slug}` } };
}

export default async function RolePage({ params }: { params: Promise<{ slug: string }> }) {
  const r = getRole((await params).slug);
  if (!r) notFound();
  const svc = getService(r.service);
  const inds = INDUSTRIES.filter((i) => r.industries.includes(i.slug));
  const track = r.level === "Skilled" ? "skilled" : r.level === "Fresher" ? "fresher" : "non-skilled";
  const others = ROLES.filter((x) => x.family === r.family && x.slug !== r.slug).concat(ROLES.filter((x) => x.family !== r.family)).slice(0, 3);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd(r.faq), crumbLd(SITE_URL, [{ name: "Home", path: "" }, { name: "Roles", path: "/roles" }, { name: r.title, path: `/roles/${r.slug}` }])]) }} />
      <DetailHero crumbs={[["Roles", "/roles"], [r.title]]} eyebrow={`${r.family} · ${r.level}`} title={r.title} text={r.summary}
        actions={<><Link href={`/candidates?track=${track}#register`} className="wf-btn wf-btn-light">Register for this role <ArrowRight size={16} /></Link><Link href="/employers#requirement" className="wf-btn wf-btn-outline-light">Hire this role</Link></>} />
      <section className="wf-section"><div className="wf-shell wf-split">
        <div className="wf-split-main">
          <div className="wf-factbar" data-reveal=""><div><small>Level</small><b>{r.level}</b></div><div><small>Qualification</small><b>{r.qualification}</b></div><div><small>Shifts</small><b>{r.shifts}</b></div></div>
          <h2 className="wf-h3" style={{ marginTop: 40 }}>What the job involves</h2><Checks items={r.duties} />
          <h2 className="wf-h3" style={{ marginTop: 40 }}>Skills that help</h2><div className="wf-pills">{r.skills.map((s) => <span key={s}>{s}</span>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 40 }}>Career growth</h2><p className="wf-prose-lg"><span style={{ fontSize: 18, lineHeight: 1.8, color: "var(--wf-body)" }}>{r.growth}</span></p>
          <h2 className="wf-h3" style={{ marginTop: 40 }}>Where this role is in demand</h2><div className="wf-pills">{inds.map((i) => <Link key={i.slug} href={`/industries/${i.slug}`}>{i.title}</Link>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 40 }}>Frequently asked questions</h2><Faq items={r.faq} />
          <p style={{ marginTop: 28, color: "var(--wf-body)", fontSize: 14.5, lineHeight: 1.7 }}>Registration does not guarantee a job. Employers decide on selection, pay and joining. Never pay anyone for a job. <Link href="/candidates/avoid-job-scams" className="wf-link">How to avoid job scams</Link></p>
        </div>
        <aside className="wf-aside">
          <div className="wf-aside-card dark"><h3>Interested in this role?</h3><p>Register once and we will consider you for matching openings.</p><Link href={`/candidates?track=${track}#register`} className="wf-btn wf-btn-light">Register for jobs <ArrowRight size={16} /></Link></div>
          {svc && <div className="wf-aside-card"><h3>Related service</h3><p>{svc.short}</p><Link href={`/services/${svc.slug}`} className="wf-link">{svc.title} <ArrowRight size={15} /></Link></div>}
        </aside>
      </div></section>
      <Related eyebrow="Related roles" title="Explore similar roles" items={others.map((o) => ({ href: `/roles/${o.slug}`, kicker: o.level, title: o.title, text: o.summary }))} />
      <CtaBand title="Ready to take the next step?" text="Register your profile or contact us with questions." primary={["Register for jobs", "/candidates#register"]} secondary={["Contact us", "/contact"]} />
    </main>
  );
}
