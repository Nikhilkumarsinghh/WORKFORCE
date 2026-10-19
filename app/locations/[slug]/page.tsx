import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CITIES, getCity } from "../../../lib/content/cities";
import { INDUSTRIES } from "../../../lib/content/industries";
import { ROLES } from "../../../lib/content/roles";
import { Checks, CtaBand, DetailHero, Related, crumbLd } from "../../../components/wf/blocks";
import { SITE_URL } from "../../../lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => CITIES.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCity((await params).slug);
  if (!c) return {};
  return { title: `Manpower & Recruitment Agency in ${c.name}`, description: `Recruitment, industrial staffing and campus placement for employers in ${c.name}, ${c.state}. Jobs for skilled, semi-skilled and entry-level candidates.`, alternates: { canonical: `/locations/${c.slug}` } };
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCity((await params).slug);
  if (!c) notFound();
  const inds = INDUSTRIES.filter((i) => c.industries.includes(i.slug));
  const roles = ROLES.filter((r) => c.roles.includes(r.slug));
  const others = CITIES.filter((x) => x.slug !== c.slug).slice(0, 3);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd(SITE_URL, [{ name: "Home", path: "" }, { name: "Locations", path: "/locations" }, { name: c.name, path: `/locations/${c.slug}` }])) }} />
      <DetailHero crumbs={[["Locations", "/locations"], [c.name]]} eyebrow={c.state} title={`Manpower & recruitment in ${c.name}`} text={c.intro} image="/media/user/workforce-solutions.webp"
        actions={<><Link href="/employers#requirement" className="wf-btn wf-btn-light">Post a requirement <ArrowRight size={16} /></Link><Link href="/candidates#register" className="wf-btn wf-btn-outline-light">Register for jobs</Link></>} />
      <section className="wf-section"><div className="wf-shell wf-split">
        <div className="wf-split-main">
          <h2 className="wf-h3">Industrial and business clusters</h2><Checks items={c.clusters} />
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Industries we support here</h2><div className="wf-pills">{inds.map((i) => <Link key={i.slug} href={`/industries/${i.slug}`}>{i.title}</Link>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Roles in demand</h2><div className="wf-pills">{roles.map((r) => <Link key={r.slug} href={`/roles/${r.slug}`}>{r.title}</Link>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Coverage note</h2><p className="wf-prose-lg"><span style={{ fontSize: 18, lineHeight: 1.8, color: "var(--wf-body)" }}>{c.note} Timelines and availability depend on the roles, headcount and skill level required, so we confirm what is possible after understanding your brief.</span></p>
        </div>
        <aside className="wf-aside">
          <div className="wf-aside-card dark"><h3>Hiring in {c.name}?</h3><p>Share your requirement and we'll respond with next steps.</p><Link href="/employers#requirement" className="wf-btn wf-btn-light">Post a requirement <ArrowRight size={16} /></Link></div>
          <div className="wf-aside-card"><h3>Looking for work?</h3><p>Register once and we'll consider you for matching openings.</p><Link href="/candidates#register" className="wf-link">Register for jobs <ArrowRight size={15} /></Link></div>
        </aside>
      </div></section>
      <Related eyebrow="Other regions" title="More locations" items={others.map((o) => ({ href: `/locations/${o.slug}`, kicker: o.state, title: o.name, text: o.intro }))} />
      <CtaBand title="Let's talk about your site." text="Tell us the location, roles and timeline." primary={["Contact us", "/contact"]} secondary={["All locations", "/locations"]} />
    </main>
  );
}
