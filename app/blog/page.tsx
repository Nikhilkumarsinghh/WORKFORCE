import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WORKFORCE_POSTS } from "../../data/blog-posts";
import { CtaBand, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "Insights: Hiring, Staffing & Career Guides",
  description: "Practical guides on hiring, staffing, workforce planning, campus placement and career preparation for employers and job seekers across India.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = WORKFORCE_POSTS;
  const cats = Array.from(new Set(posts.map((p) => p.cat)));
  const [first, ...rest] = posts;
  return (
    <main id="main">
      <PageHero crumbs={[["Insights"]]} eyebrow="Insights" title={<>Guides for <em>hiring and careers.</em></>} text="Practical writing on hiring, staffing, workforce planning, campus placement and career preparation." />
      <section className="wf-section"><div className="wf-shell">
        <div className="wf-pills" style={{ marginBottom: 28 }} aria-label="Topics">{cats.map((c) => <span key={c}>{c}</span>)}</div>
        <Link href={`/blog/${first.slug}`} className="wf-band" style={{ minHeight: 320, background: "linear-gradient(135deg,var(--wf-teal),var(--wf-navy))", marginBottom: 28 }} data-reveal="">
          <div className="wf-band-in"><span className="wf-eyebrow light">Featured · {first.cat}</span><h2 style={{ fontSize: "clamp(26px,3.6vw,44px)" }}>{first.title}</h2><p>{first.excerpt}</p><span className="wf-btn wf-btn-light">Read guide <ArrowRight size={16} /></span></div>
        </Link>
        <div className="wf-grid3">
          {rest.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="wf-tile" data-reveal="" style={{ ["--d" as string]: `${(i % 3) * 0.06}s` }}><small>{p.cat} · {p.readingTime}</small><h3>{p.title}</h3><p>{p.excerpt}</p><span className="wf-link">Read guide <ArrowRight size={15} /></span></Link>
          ))}
        </div>
      </div></section>
      <CtaBand title="Need help with hiring or a job search?" text="Talk to our team or register your profile." primary={["Contact us", "/contact"]} secondary={["Register for jobs", "/candidates#register"]} />
    </main>
  );
}
