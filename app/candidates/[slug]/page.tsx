import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import { GUIDES, getGuide } from "../../../data/candidate-guides";
import { SITE_URL } from "../../../lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return GUIDES.map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return { title: "Guide not found" };
  return { title: g.title, description: g.description, alternates: { canonical: `/candidates/${g.slug}` }, openGraph: { title: g.title, description: g.description, type: "article", url: `/candidates/${g.slug}` } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const ld = [
    { "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, mainEntityOfPage: `${SITE_URL}/candidates/${g.slug}`, author: { "@type": "Organization", name: "UniqueToo Editorial Team" }, publisher: { "@type": "Organization", name: "UniqueToo Workforce Pvt. Ltd.", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` } } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Candidates", item: `${SITE_URL}/candidates` }, { "@type": "ListItem", position: 3, name: g.h1, item: `${SITE_URL}/candidates/${g.slug}` }] },
  ];
  const others = GUIDES.filter((x) => x.slug !== g.slug).slice(0, 3);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="wf-page-hero">
        <div className="wf-shell">
          <nav className="wf-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>/<Link href="/candidates">Candidates</Link>/<span>{g.h1}</span></nav>
          <h1>{g.h1}</h1>
          <p className="wf-lead">{g.intro}</p>
          <div style={{ marginTop: 24 }}><Link href={`/candidates?track=${g.cta.track}#register`} className="wf-btn wf-btn-primary">{g.cta.label} <ArrowRight size={16} /></Link></div>
        </div>
      </section>
      <section className="wf-section">
        <div className="wf-shell">
          <article className="wf-prose">
            {g.sections.map((s) => (
              <div key={s.h}><h2>{s.h}</h2>{s.p && <p>{s.p}</p>}{s.list && <ul>{s.list.map((x) => <li key={x}>{x}</li>)}</ul>}</div>
            ))}
            <h2>Frequently asked questions</h2>
            <div className="wf-faq" style={{ maxWidth: "none" }}>{g.faq.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}</div>
          </article>
        </div>
      </section>
      <section className="wf-section alt">
        <div className="wf-shell">
          <div className="wf-head"><div><span className="wf-eyebrow">Keep reading</span><h2 className="wf-h2">More candidate <em>guides.</em></h2></div></div>
          <div className="wf-posts">{others.map((o) => <Link key={o.slug} href={`/candidates/${o.slug}`} className="wf-post"><small>Candidate guide</small><h3>{o.h1}</h3><p>{o.description}</p><span className="wf-link">Read guide <ArrowRight size={15} /></span></Link>)}</div>
        </div>
      </section>
    </main>
  );
}
