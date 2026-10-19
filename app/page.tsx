import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, GraduationCap, UserRoundSearch } from "lucide-react";
import HeroVideo from "../components/wf/HeroVideo";
import Rail from "../components/wf/Rail";
import ExploreTabs from "../components/wf/ExploreTabs";
import { Faq, faqLd } from "../components/wf/blocks";
import { SERVICES } from "../lib/content/services";
import { INDUSTRIES } from "../lib/content/industries";
import { ROLES } from "../lib/content/roles";
import { CITIES } from "../lib/content/cities";
import { WORKFORCE_POSTS } from "../data/blog-posts";

export const metadata: Metadata = {
  title: { absolute: "UniqueToo | Recruitment, Staffing & Campus Placement in India" },
  description: "Recruitment, industrial staffing, engineering hiring and campus placement across India. Register for jobs at any skill level or post a hiring requirement.",
  alternates: { canonical: "/" },
  openGraph: { title: "UniqueToo | Recruitment, Staffing & Campus Placement in India", description: "Hire skilled and non-skilled talent, or register for jobs. Industrial staffing, recruitment and campus placement.", url: "/", type: "website" },
};

const FAQ: [string, string][] = [
  ["Do you hire only skilled candidates?", "No. UniqueToo works with skilled, semi-skilled and entry-level candidates, including 10th and 12th pass candidates, ITI and diploma holders, graduates, engineers and freshers. Register your profile and choose the closest category."],
  ["How do I register for a job?", "Open the candidate page, fill the short registration form with your details, education, skills and preferred city, and optionally upload a resume. Our team reviews every profile and contacts you when a suitable requirement matches."],
  ["Is a job guaranteed after registration?", "No. Registration places you in consideration for matching employer requirements. We never guarantee a job, salary or joining date, and you should never pay anyone for a job."],
  ["Can employers hire for plants, warehouses, security and housekeeping?", "Yes. We support industrial staffing, contract workforce, engineering hiring, security and facility staffing and frontline hiring for manufacturing, logistics, construction, retail and other industries."],
  ["How does campus placement work?", "Employers share their requirement and we coordinate with colleges, ITIs and polytechnics for shortlisting, pre-screening, scheduling and joining follow-up. Colleges can partner with us to bring employer drives to campus."],
  ["Which cities do you work in?", "We are headquartered in Pune, Maharashtra and support requirements across India. Share your location and role and the team will confirm what is possible."],
];

const news = [
  { img: "/media/user/campus-hiring.webp", k: "Campus placement", t: "Employer drives for colleges, ITIs and polytechnics", d: "Employers, colleges and students: one coordinated program.", h: "/campus-hiring" },
  { img: "/media/user/business-team.webp", k: "For candidates", t: "Register once. Skilled, semi-skilled or fresher.", d: "A two-minute registration. Resume optional.", h: "/candidates#register" },
  { img: "/media/user/engineering-team.webp", k: "Role guides", t: "20 role guides: duties, skills and growth paths", d: "From production operator to graduate engineer trainee.", h: "/roles" },
  { img: "/media/user/industrial-staffing.webp", k: "For employers", t: "Industrial staffing for plants and warehouses", d: "Shift-ready crews with replacement cover.", h: "/services/staffing" },
  { img: "/media/user/security-services.webp", k: "Stay safe", t: "How to avoid job scams in India", d: "Never pay for a job. Know the red flags.", h: "/candidates/avoid-job-scams" },
  { img: "/media/user/workforce-solutions.webp", k: "Locations", t: "Headquartered in Pune. Hiring across India.", d: "Eight regions with local industry context.", h: "/locations" },
];

export default function Home() {
  const posts = WORKFORCE_POSTS.slice(0, 6);
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }} />

      {/* HERO (video) */}
      <section className="wf-vhero" aria-label="Introduction">
        <HeroVideo poster="/videos/hero-poster.webp" />
        <div className="wf-shell"><div className="wf-vhero-in">
          <span className="wf-eyebrow light">Workforce · Recruitment · Campus placement</span>
          <h1>Work for every skill level. <em>Talent for every business.</em></h1>
          <p>UniqueToo connects employers with skilled, semi-skilled and entry-level people across India, from engineers and ITI technicians to helpers, guards and freshers.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
            <Link href="/employers#requirement" className="wf-btn wf-btn-light">I need to hire <ArrowRight size={17} /></Link>
            <Link href="/candidates#register" className="wf-btn wf-btn-outline-light">I&apos;m looking for work</Link>
          </div>
        </div></div>
        <span className="wf-scroll-cue" aria-hidden="true" />
      </section>

      {/* PILLARS */}
      <section aria-label="Why UniqueToo"><div className="wf-shell"><div className="wf-pillars">
        {[["Every skill level", "From 10th pass helpers to engineers, there is a pathway for everyone."], ["End-to-end process", "Sourcing, screening, interviews, joining and follow-up under one coordinator."], ["Scam-safe", "Candidates never pay for a job. Clear communication at every step."], ["Pune-headquartered", "Local industrial knowledge with reach across India."]].map(([t, d], i) => <div key={t} className="wf-pillar" data-reveal="" style={{ ["--d" as string]: `${i * 0.07}s` }}><strong>{t}</strong><span>{d}</span></div>)}
      </div></div></section>

      {/* CAREER PATHWAYS: all education and skill levels */}
      <section className="wf-section alt" aria-labelledby="career-pathways-title">
        <div className="wf-shell">
          <div className="wf-head"><div>
            <span className="wf-eyebrow">Opportunities for every background</span>
            <h2 className="wf-h2" id="career-pathways-title">From first job to <em>professional career.</em></h2>
            <p className="wf-lead">UniqueToo supports job seekers across education and experience levels—from entry-level and frontline work to technical, graduate and experienced professional opportunities. Every opening depends on employer requirements and candidate fit.</p>
          </div><Link href="/candidates" className="wf-btn wf-btn-primary">Explore candidate pathways <ArrowRight size={16} /></Link></div>
          <div className="wf-pathway-grid">
            {[
              {n:"01",t:"Entry-level & frontline",d:"10th/12th pass candidates, helpers, warehouse associates, production operators, security and facilities roles.",h:"/candidates/10th-pass-jobs"},
              {n:"02",t:"ITI, diploma & skilled trades",d:"Technicians, electricians, fitters, CNC/VMC operators, maintenance and quality roles aligned to qualifications.",h:"/candidates/iti-diploma-jobs"},
              {n:"03",t:"Graduates & freshers",d:"Graduate opportunities, trainee roles, customer support, operations and campus recruitment pathways.",h:"/candidates/fresher-jobs"},
              {n:"04",t:"B.Tech & engineering talent",d:"ECE, mechanical, electrical, civil and production graduates, GETs, junior engineers and technical specialists.",h:"/services/engineering-hiring"},
              {n:"05",t:"Experienced professionals",d:"Supervisors, team leads, quality and maintenance professionals, site coordinators and specialist hires.",h:"/services/recruitment"},
              {n:"06",t:"Employers & campus partners",d:"Build teams through targeted hiring, contract staffing, engineering recruitment and coordinated campus drives.",h:"/employers#requirement"},
            ].map((x)=><Link href={x.h} className="wf-pathway-card" key={x.n}><span>{x.n}</span><h3>{x.t}</h3><p>{x.d}</p><b>Explore pathway <ArrowRight size={15}/></b></Link>)}
          </div>
        </div>
      </section>

      {/* WHAT'S NEW */}
      <section className="wf-section">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">What&apos;s new</span><h2 className="wf-h2">Start here, <em>whoever you are.</em></h2></div></div>
          <Rail label="highlights">
            {news.map((n) => (
              <Link key={n.h} href={n.h} className="wf-card">
                <div className="wf-card-img"><Image src={n.img} alt="" fill sizes="380px" loading="lazy" /></div>
                <div className="wf-card-body"><small>{n.k}</small><h3>{n.t}</h3><p>{n.d}</p><span className="wf-link">Read more <ArrowRight size={15} /></span></div>
              </Link>
            ))}
          </Rail>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="wf-section alt">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">Everything we do</span><h2 className="wf-h2">Select what you&apos;re looking for. <em>Discover how we help.</em></h2></div></div>
          <div data-reveal="">
            <ExploreTabs groups={[
              { id: "services", title: "Services", text: "Experience our services. Staff your business.", links: SERVICES.map((s) => [s.title, `/services/${s.slug}`]) },
              { id: "industries", title: "Industries", text: "Select your industry. See how we help.", links: INDUSTRIES.map((i) => [i.title, `/industries/${i.slug}`]) },
              { id: "roles", title: "Roles", text: "Find the role you hire for, or want.", links: [...ROLES.slice(0, 11).map((r): [string, string] => [r.title, `/roles/${r.slug}`]), ["All roles", "/roles"]] },
            ]} />
          </div>
        </div>
      </section>

      {/* CANDIDATE BAND */}
      <section className="wf-section">
        <div className="wf-shell">
          <div className="wf-band" data-reveal="zoom">
            <Image src="/media/user/manufacturing.webp" alt="" fill sizes="(max-width:1240px) 100vw, 1240px" loading="lazy" />
            <div className="wf-band-in">
              <span className="wf-eyebrow light">For candidates</span>
              <h2>Skilled or not, there is a job for you.</h2>
              <p>Register once and we match your profile to employer requirements across manufacturing, logistics, security, retail, support and more. No degree needed for many roles. Resume optional.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href="/candidates#register" className="wf-btn wf-btn-light">Register your profile <ArrowRight size={16} /></Link>
                <Link href="/candidates" className="wf-btn wf-btn-outline-light">Explore guides</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="wf-section dark">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow light">How it works</span><h2 className="wf-h2">Simple, <em>transparent</em> and scam-safe.</h2></div></div>
          <div className="wf-two">
            <div className="wf-steps" data-reveal="left"><h3>For candidates</h3><ol>
              <li><strong>Register</strong><span>Share your details, education, skills and preferred city. Resume is optional.</span></li>
              <li><strong>We review &amp; match</strong><span>Our team screens profiles against live employer requirements.</span></li>
              <li><strong>Interview</strong><span>Shortlisted candidates are called with role, location and interview details.</span></li>
              <li><strong>Join</strong><span>We support documentation and joining follow-up. You never pay for a job.</span></li>
            </ol></div>
            <div className="wf-steps" data-reveal="right"><h3>For employers</h3><ol>
              <li><strong>Share the requirement</strong><span>Roles, headcount, location, shift, pay range and timeline.</span></li>
              <li><strong>Source &amp; screen</strong><span>Skill and eligibility screening as agreed for each role.</span></li>
              <li><strong>Interview &amp; select</strong><span>We coordinate interviews, offers and documentation.</span></li>
              <li><strong>Deploy &amp; support</strong><span>Joining follow-up, replacement and workforce support as agreed.</span></li>
            </ol></div>
          </div>
        </div>
      </section>

      {/* CAMPUS */}
      <section className="wf-section">
        <div className="wf-shell wf-campus">
          <div className="wf-campus-img" data-reveal="zoom"><Image src="/media/user/campus-hiring.webp" alt="Students at a campus placement drive" fill loading="lazy" sizes="(max-width:900px) 100vw, 50vw" /></div>
          <div data-reveal="">
            <span className="wf-eyebrow">Campus placement</span>
            <h2 className="wf-h2">From classroom to <em>first job.</em></h2>
            <p className="wf-lead" style={{ marginTop: 16 }}>We run structured placement drives with colleges, ITIs and polytechnics: shortlisting, pre-screening, scheduling and joining support for skilled and entry-level hiring.</p>
            <div style={{ display: "grid", gap: 12, margin: "24px 0 28px" }}>
              {[[Building2, "Employers", "Hire trained freshers in volume"], [GraduationCap, "Colleges", "Bring regular employer drives to campus"], [UserRoundSearch, "Students", "Register once, get matched to drives"]].map(([I, t, d]) => { const Icon = I as typeof Building2; return <div key={t as string} className="wf-info"><Icon size={22} /><div><strong>{t as string}</strong><span>{d as string}</span></div></div>; })}
            </div>
            <Link href="/campus-hiring" className="wf-btn wf-btn-primary">Explore campus placement <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="wf-section alt">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">Insights</span><h2 className="wf-h2">Guides for <em>hiring and job search.</em></h2></div><Link href="/blog" className="wf-link">All insights <ArrowRight size={16} /></Link></div>
          <Rail label="insights">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="wf-card"><div className="wf-card-body" style={{ padding: 26, minHeight: 250 }}><small>{p.cat} · {p.readingTime}</small><h3>{p.title}</h3><p>{p.excerpt}</p><span className="wf-link">Read guide <ArrowRight size={15} /></span></div></Link>
            ))}
          </Rail>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="wf-section">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">Locations</span><h2 className="wf-h2">Headquartered in Pune. <em>Hiring across India.</em></h2></div><Link href="/locations" className="wf-link">All locations <ArrowRight size={16} /></Link></div>
          <div className="wf-pills" data-reveal="">{CITIES.map((c) => <Link key={c.slug} href={`/locations/${c.slug}`}>{c.name}</Link>)}</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wf-section alt" id="faq">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow">FAQ</span><h2 className="wf-h2">Questions we hear <em>most.</em></h2></div><Link href="/faq" className="wf-link">All FAQs <ArrowRight size={16} /></Link></div>
          <div style={{ maxWidth: 900 }} data-reveal=""><Faq items={FAQ} /></div>
        </div>
      </section>

      {/* WHAT'S ON YOUR MIND */}
      <section className="wf-section dark">
        <div className="wf-shell">
          <div className="wf-head" data-reveal=""><div><span className="wf-eyebrow light">Contact</span><h2 className="wf-h2">What&apos;s on <em>your mind?</em></h2><p className="wf-lead" style={{ marginTop: 14 }}>We&apos;re here to help. Tell us what you&apos;re looking for and we&apos;ll connect you with the right people.</p></div></div>
          <div className="wf-grid3">
            {[["Hire workforce", "Post a hiring requirement for any skill level.", "/employers#requirement"], ["Find a job", "Register your profile as a candidate.", "/candidates#register"], ["College or placement cell", "Partner with us for campus drives.", "/campus-hiring#colleges"]].map(([t, d, h], i) => (
              <Link key={h} href={h} className="wf-steps" style={{ display: "block", padding: 28 }} data-reveal="" ><span style={{ display: "block", color: "#79b7c7", fontWeight: 800, fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase" }}>0{i + 1}</span><h3 style={{ margin: "10px 0 8px", fontSize: 22, color: "#fff" }}>{t}</h3><span style={{ display: "block", color: "#b9cad6", marginBottom: 18, lineHeight: 1.6 }}>{d}</span><span className="wf-link" style={{ color: "#79b7c7" }}>Get started <ArrowUpRight size={16} /></span></Link>
            ))}
          </div>
          <p style={{ marginTop: 28, color: "#b9cad6" }}>Something else? <Link href="/contact" className="wf-link" style={{ color: "#fff" }}>Contact us <ArrowRight size={15} /></Link></p>
        </div>
      </section>
    </main>
  );
}
