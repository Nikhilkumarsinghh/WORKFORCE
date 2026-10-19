import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES, getIndustry } from "../../../lib/content/industries";
import { SERVICES } from "../../../lib/content/services";
import { ROLES } from "../../../lib/content/roles";
import { Checks, CtaBand, DetailHero, Faq, Related, crumbLd, faqLd } from "../../../components/wf/blocks";
import { SITE_URL } from "../../../lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => INDUSTRIES.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return { title: `${i.title} Staffing & Recruitment in India`, description: `${i.short} ${i.intro}`.slice(0, 158), alternates: { canonical: `/industries/${i.slug}` } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();
  const svcs = SERVICES.filter((s) => i.services.includes(s.slug));
  const roles = ROLES.filter((r) => r.industries.includes(i.slug));
  const others = INDUSTRIES.filter((x) => x.slug !== i.slug).slice(0, 3);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd(i.faq), crumbLd(SITE_URL, [{ name: "Home", path: "" }, { name: "Industries", path: "/industries" }, { name: i.title, path: `/industries/${i.slug}` }])]) }} />
      <DetailHero crumbs={[["Industries", "/industries"], [i.title]]} eyebrow="Industry" title={`${i.title} workforce`} text={i.intro} image={i.image}
        actions={<><Link href="/employers#requirement" className="wf-btn wf-btn-light">Post a requirement <ArrowRight size={16} /></Link><Link href="/candidates#register" className="wf-btn wf-btn-outline-light">Register for jobs</Link></>} />
      <section className="wf-section"><div className="wf-shell wf-split">
        <div className="wf-split-main">
          <h2 className="wf-h3">Where demand comes from</h2><Checks items={i.demand} />
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Challenges we help with</h2>
          <div className="wf-capgrid">{i.challenges.map((c) => <div key={c} className="wf-cap" data-reveal=""><h3>{c}</h3><p>Planned for in the requirement brief and staffing model.</p></div>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 44 }}>How UniqueToo helps</h2><Checks items={i.help} />
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Roles in this industry</h2>
          <div className="wf-pills">{roles.length ? roles.map((r) => <Link key={r.slug} href={`/roles/${r.slug}`}>{r.title}</Link>) : i.roles.map((r) => <span key={r}>{r}</span>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Frequently asked questions</h2><Faq items={i.faq} />
        </div>
        <aside className="wf-aside">
          <div className="wf-aside-card dark"><h3>Hiring in {i.title.toLowerCase()}?</h3><p>Share roles, headcount, shift and location.</p><Link href="/employers#requirement" className="wf-btn wf-btn-light">Post a requirement <ArrowRight size={16} /></Link></div>
          <div className="wf-aside-card"><h3>Related services</h3><ul className="wf-aside-links">{svcs.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.title}<ArrowRight size={15} /></Link></li>)}</ul></div>
        </aside>
      </div></section>
      <Related eyebrow="More industries" title="Explore other industries" items={others.map((o) => ({ href: `/industries/${o.slug}`, kicker: "Industry", title: o.title, text: o.short }))} />
      <CtaBand title="Let's staff your operation." text="Tell us what you need and we'll respond with next steps." primary={["Contact us", "/contact"]} secondary={["Post a requirement", "/employers#requirement"]} />
    </main>
  );
}
