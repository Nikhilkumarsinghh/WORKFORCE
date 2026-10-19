import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SERVICES, getService } from "../../../lib/content/services";
import { INDUSTRIES } from "../../../lib/content/industries";
import { ROLES } from "../../../lib/content/roles";
import { Checks, CtaBand, DetailHero, Faq, Related, crumbLd, faqLd } from "../../../components/wf/blocks";
import { SITE_URL } from "../../../lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: `${s.title} in India`, description: `${s.short} ${s.tagline}`, alternates: { canonical: `/services/${s.slug}` }, openGraph: { title: `${s.title} | UniqueToo`, description: s.short, url: `/services/${s.slug}`, type: "website" } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const inds = INDUSTRIES.filter((i) => s.industries.includes(i.slug));
  const roles = ROLES.filter((r) => r.service === s.slug).slice(0, 6);
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const ld = [
    { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.short, provider: { "@type": "EmploymentAgency", name: "UniqueToo Workforce Pvt. Ltd.", url: SITE_URL }, areaServed: { "@type": "Country", name: "India" }, serviceType: s.title },
    faqLd(s.faq), crumbLd(SITE_URL, [{ name: "Home", path: "" }, { name: "Services", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }]),
  ];
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <DetailHero crumbs={[["Services", "/services"], [s.title]]} eyebrow="Service" title={s.title} text={s.tagline} image={s.image}
        actions={<><Link href="/employers#requirement" className="wf-btn wf-btn-light">Post a requirement <ArrowRight size={16} /></Link><Link href="/contact" className="wf-btn wf-btn-outline-light">Talk to us</Link></>} />
      <section className="wf-section"><div className="wf-shell wf-split">
        <div className="wf-split-main">
          <div className="wf-prose-lg" data-reveal="">{s.overview.map((p) => <p key={p} style={{ marginBottom: 18 }}>{p}</p>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 44 }}>What is included</h2>
          <div className="wf-capgrid">{s.capabilities.map(([t, d], i) => <div key={t} className="wf-cap" data-reveal="" style={{ ["--d" as string]: `${(i % 2) * 0.06}s` }}><h3>{t}</h3><p>{d}</p></div>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 44 }}>How it works</h2>
          <div className="wf-proc" data-reveal="">{s.process.map(([t, d]) => <div key={t}><strong>{t}</strong><span>{d}</span></div>)}</div>
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Typical roles</h2>
          <div className="wf-pills">{s.roles.map((r) => <span key={r}>{r}</span>)}</div>
          {roles.length > 0 && <><h2 className="wf-h3" style={{ marginTop: 44 }}>Role guides</h2><div className="wf-pills">{roles.map((r) => <Link key={r.slug} href={`/roles/${r.slug}`}>{r.title}</Link>)}</div></>}
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Commitments</h2>
          <Checks items={["Scope, screening and responsibilities agreed in writing", "No fee from candidates, ever", "A named coordinator for every engagement", "Transparent communication on progress and replacements"]} />
          <h2 className="wf-h3" style={{ marginTop: 44 }}>Frequently asked questions</h2>
          <Faq items={s.faq} />
        </div>
        <aside className="wf-aside">
          <div className="wf-aside-card dark"><h3>Start a requirement</h3><p>Share roles, headcount, location and timeline. We respond with next steps.</p><Link href="/employers#requirement" className="wf-btn wf-btn-light">Post a requirement <ArrowRight size={16} /></Link></div>
          <div className="wf-aside-card"><h3>Industries served</h3><ul className="wf-aside-links">{inds.map((i) => <li key={i.slug}><Link href={`/industries/${i.slug}`}>{i.title}<ArrowRight size={15} /></Link></li>)}</ul></div>
        </aside>
      </div></section>
      <Related eyebrow="More services" title="You may also need" items={others.map((o) => ({ href: `/services/${o.slug}`, kicker: "Service", title: o.title, text: o.short }))} />
      <CtaBand title="Let's plan your workforce." text="One conversation is enough to get started." primary={["Contact us", "/contact"]} secondary={["Post a requirement", "/employers#requirement"]} />
    </main>
  );
}
