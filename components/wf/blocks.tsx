import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";

export type Crumb = [label: string, href?: string];

export function Crumbs({ items }: { items: Crumb[] }) {
  return <nav className="wf-crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map(([l, h]) => <span key={l}>/{h ? <Link href={h}>{l}</Link> : <span>{l}</span>}</span>)}</nav>;
}

export function DetailHero({ crumbs, eyebrow, title, text, image, actions }: { crumbs: Crumb[]; eyebrow: string; title: string; text: string; image?: string; actions?: React.ReactNode }) {
  return (
    <section className="wf-dhero">
      {image && <div className="wf-dhero-bg" aria-hidden="true"><Image src={image} alt="" fill priority sizes="100vw" /></div>}
      <div className="wf-shell"><div className="wf-dhero-in">
        <Crumbs items={crumbs} />
        <span className="wf-eyebrow light">{eyebrow}</span>
        <h1>{title}</h1><p>{text}</p>
        {actions && <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>{actions}</div>}
      </div></div>
    </section>
  );
}

export function PageHero({ crumbs, eyebrow, title, text, actions }: { crumbs: Crumb[]; eyebrow: string; title: React.ReactNode; text: string; actions?: React.ReactNode }) {
  return (
    <section className="wf-page-hero"><div className="wf-shell">
      <Crumbs items={crumbs} /><span className="wf-eyebrow">{eyebrow}</span><h1>{title}</h1><p className="wf-lead">{text}</p>
      {actions && <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>{actions}</div>}
    </div></section>
  );
}

export function Checks({ items }: { items: string[] }) {
  return <ul className="wf-list">{items.map((x) => <li key={x}><Check size={18} aria-hidden="true" />{x}</li>)}</ul>;
}

export function Faq({ items }: { items: [string, string][] }) {
  return <div className="wf-faq" style={{ maxWidth: "none" }}>{items.map(([q, a]) => <details key={q}><summary>{q}<Plus size={20} aria-hidden="true" /></summary><p>{a}</p></details>)}</div>;
}

export function CtaBand({ title, text, primary, secondary }: { title: string; text: string; primary: [string, string]; secondary?: [string, string] }) {
  return (
    <section className="wf-section"><div className="wf-shell">
      <div className="wf-cta" data-reveal="zoom">
        <div><h2>{title}</h2><p>{text}</p></div>
        <div className="wf-cta-actions">
          <Link href={primary[1]} className="wf-btn wf-btn-light">{primary[0]} <ArrowRight size={16} /></Link>
          {secondary && <Link href={secondary[1]} className="wf-btn wf-btn-outline-light">{secondary[0]}</Link>}
        </div>
      </div>
    </div></section>
  );
}

export function Related({ eyebrow, title, items }: { eyebrow: string; title: string; items: { href: string; kicker: string; title: string; text: string }[] }) {
  return (
    <section className="wf-section alt"><div className="wf-shell">
      <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">{eyebrow}</span><h2 className="wf-h2">{title}</h2></div></div>
      <div className="wf-grid3">{items.map((i, n) => <Link key={i.href} href={i.href} className="wf-tile" data-reveal="" style={{ ["--d" as string]: `${n * 0.07}s` }}><small>{i.kicker}</small><h3>{i.title}</h3><p>{i.text}</p><span className="wf-link">Read more <ArrowRight size={15} /></span></Link>)}</div>
    </div></section>
  );
}

export function faqLd(items: [string, string][]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}
export function crumbLd(base: string, items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: base + c.path })) };
}
