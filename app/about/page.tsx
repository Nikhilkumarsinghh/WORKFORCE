import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero } from "../../components/wf/blocks";

export const metadata: Metadata = {
  title: "About Us: Workforce & Recruitment Company",
  description: "UniqueToo Workforce Pvt. Ltd. is a Pune-based workforce company offering recruitment, staffing and campus placement, with jobs for every skill level.",
  alternates: { canonical: "/about" },
};

const team = [
  { name: "Aviraj Bahir", role: "Founder & CEO", bio: "Leads the business vision, client relationships and long-term operating direction.", img: "/team/founder1.jpg" },
  { name: "Kunal Mhambare", role: "Co-Founder", bio: "Works across workforce operations, deployment discipline and delivery coordination.", img: "/team/founder2.jpg" },
  { name: "Nikhil Mhambare", role: "Business Head", bio: "Owns growth, partnerships and the commercial operating model.", img: "/team/hod.jpg" },
  { name: "Vaishnavi Konade", role: "Head of Finance & Accounts", bio: "Leads finance, payroll coordination, reporting and account discipline.", img: "/team/accountant.jpg" },
  { name: "Nikhil Singh", role: "Head of Operations", bio: "Focuses on workforce deployment, operating continuity and execution support.", img: "/team/creator.jpg" },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero crumbs={[["About"]]} eyebrow="Who we are" title={<>A people-first <em>workforce company.</em></>} text="UniqueToo Workforce Pvt. Ltd. is headquartered in Pune. We help employers hire and staff with confidence, and we open doors for candidates of every skill level, from 10th pass helpers to engineers." actions={<><Link href="/about/vision" className="wf-btn wf-btn-primary">Our vision &amp; values <ArrowRight size={16} /></Link><Link href="/trust" className="wf-btn wf-btn-ghost">Trust &amp; compliance</Link></>} />

      <section className="wf-section"><div className="wf-shell wf-split">
        <div className="wf-split-main wf-prose-lg">
          <h2 className="wf-h2" data-reveal="">What we believe</h2>
          <p data-reveal="">Good hiring is a human problem before it is a process problem. A vague job brief leads to a poor match; a poor match leads to attrition; attrition costs everyone. So we start by understanding the role, the site and the person.</p>
          <p data-reveal="">We also believe work should not be reserved for the highly qualified. A helper, a guard, a housekeeping attendant and a CNC operator each keep a business running. Our candidate pathways are built for all of them.</p>
          <h2 className="wf-h2" style={{ marginTop: 40 }} data-reveal="">What we do</h2>
          <p data-reveal="">We provide recruitment, industrial and contract staffing, engineering hiring, blue-collar recruitment, security and facility staffing, payroll and compliance coordination, and campus placement. Explore the details in our <Link href="/services" className="wf-link">services</Link>, <Link href="/industries" className="wf-link">industries</Link> and <Link href="/roles" className="wf-link">role guides</Link>.</p>
          <h2 className="wf-h2" style={{ marginTop: 40 }} data-reveal="">How we work</h2>
          <p data-reveal="">Scope, screening and responsibilities are written down before an engagement starts. We name a coordinator, report honestly on progress, and tell you early if a requirement is unrealistic. For candidates, we keep registration simple, communicate clearly and never ask for money.</p>
        </div>
        <aside className="wf-aside"><div className="wf-aside-card"><h3>At a glance</h3><ul className="wf-aside-links">
          <li><span>Company</span><b>UniqueToo Workforce Pvt. Ltd.</b></li><li><span>Headquarters</span><b>Chimbli, Pune</b></li><li><span>Focus</span><b>Recruitment, staffing, campus</b></li><li><span>Coverage</span><b>Maharashtra &amp; India</b></li>
        </ul></div><div className="wf-aside-card dark"><h3>Work with us</h3><p>Hire talent or register your profile.</p><Link href="/contact" className="wf-btn wf-btn-light">Contact us <ArrowRight size={16} /></Link></div></aside>
      </div></section>

      <section className="wf-section alt"><div className="wf-shell">
        <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">Leadership</span><h2 className="wf-h2">The team <em>behind UniqueToo.</em></h2></div></div>
        <div className="wf-grid3" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
          {team.map((m, i) => (
            <article key={m.name} className="wf-card" data-reveal="" style={{ ["--d" as string]: `${(i % 3) * 0.07}s` }}>
              <div className="wf-card-img" style={{ aspectRatio: "4/4.2" }}><Image src={m.img} alt={`${m.name}, ${m.role}`} fill sizes="(max-width:700px) 100vw, 320px" style={{ objectFit: "cover", objectPosition: "center top" }} loading="lazy" /></div>
              <div className="wf-card-body"><small>{m.role}</small><h3>{m.name}</h3><p>{m.bio}</p></div>
            </article>
          ))}
        </div>
      </div></section>
      <CtaBand title="Let's build something together." text="Whether you're hiring, looking for work or representing a college, we'd like to hear from you." primary={["Contact us", "/contact"]} secondary={["Join our team", "/join-us"]} />
    </main>
  );
}
