import Link from "next/link";

const S = [
  { icon:"👥", title:"Workforce Solutions",  desc:"End-to-end manpower supply for manufacturing, warehouse, and industrial operations.",  href:"/services/workforce-solutions", tag:"Popular" },
  { icon:"🎯", title:"Recruitment",           desc:"Targeted hiring for skilled, semi-skilled, and unskilled roles. 48-hr turnaround.",     href:"/services/recruitment",         tag:null    },
  { icon:"📋", title:"Contract Staffing",     desc:"Flexible contracts with full PF, ESIC, and labour law compliance managed by us.",       href:"/services/staffing",            tag:null    },
  { icon:"🛡️", title:"Security Services",    desc:"Trained security guards for factories, warehouses, and commercial buildings.",          href:"/services/security",            tag:null    },
  { icon:"🏨", title:"Housekeeping",          desc:"Professional housekeeping for hotels, hospitals, and corporate establishments.",        href:"/services/housekeeping",        tag:null    },
  { icon:"🎓", title:"Campus Hiring",         desc:"Direct college drives connecting companies with ITI, Diploma, and degree graduates.",   href:"/campus-hiring",                tag:"New"   },
];

export default function Services() {
  return (
   <section
  style={{ background: "var(--bg)" }}
  className="py-28 relative overflow-hidden"
>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-red-600 text-xs tracking-[4px] uppercase font-semibold">What We Do</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[var(--text)]">
            Complete Workforce<br/><span className="text-red-600">Solutions</span>
          </h2>
        </div>
        

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {S.map((s,i)=>(
            <Link key={i} href={s.href}
              className="group relative bg-[var(--card)]/[0.03] hover:bg-[var(--card)]/[0.06] border border-white/8 hover:border-blue-500/30 rounded-2xl p-7 transition-all duration-300 overflow-hidden">
              {s.tag && <span className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600/15 text-blue-400 border border-red-600/20">{s.tag}</span>}
              <div className="text-3xl mb-5">{s.icon}</div>
              <h3 className="text-[var(--text)] font-bold text-xl mb-3 group-hover:text-blue-400 transition">{s.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-[var(--text2)] transition">{s.desc}</p>
              <div className="mt-6 text-red-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition flex items-center gap-2">
                Learn More <span>→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

