import Link from "next/link";

const I = [
  { icon:"⚙️", name:"Manufacturing",          href:"/industries/manufacturing", desc:"Auto parts, FMCG, electronics, and heavy manufacturing plants.", tags:["Production Workers","Machine Operators","Quality Control"] },
  { icon:"🚚", name:"Logistics & Supply Chain",href:"/industries/logistics",    desc:"Third-party logistics, freight, courier, and last-mile delivery.",  tags:["Drivers","Loading Staff","Coordinators"] },
  { icon:"🏭", name:"Warehouse & Storage",     href:"/industries/warehouse",    desc:"Inbound/outbound ops, inventory management, and sorting.",           tags:["Pickers","Packers","Forklift Operators"] },
  { icon:"🏨", name:"Hospitality & Hotels",    href:"/industries/hospitality",  desc:"5-star hotels, resorts, banquets, and event management.",            tags:["Housekeeping","Stewards","Kitchen Staff"] },
];

export default function Industries() {
  return (
    <section className="bg-[var(--bg)] py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{backgroundImage:"radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.06) 0%, transparent 60%)"}} />
      <div className="max-w-7xl mx-auto px-8 lg:px-16">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-red-600 text-xs tracking-[4px] uppercase font-semibold">Industries We Serve</span>
            <div className="w-8 h-px bg-blue-500" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[var(--text)]">
            Powering India's<br/><span className="text-red-600">Core Industries</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl mx-auto">
            Specialized workforce for every sector. We know your industry — we send the right people.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {I.map((ind,i)=>(
            <Link key={i} href={ind.href}
              className="group flex gap-6 bg-[var(--card)]/[0.02] hover:bg-[var(--card)]/[0.05] border border-white/8 hover:border-blue-500/25 rounded-2xl p-7 transition items-start">
              <div className="text-4xl shrink-0 mt-1">{ind.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[var(--text)] font-bold text-xl group-hover:text-blue-400 transition">{ind.name}</h3>
                  <span className="text-zinc-600 group-hover:text-red-600 group-hover:translate-x-1 transition-all">→</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{ind.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {ind.tags.map((t,j)=>(
                    <span key={j} className="text-xs px-3 py-1 rounded-full bg-[var(--card)]/5 text-[var(--text2)] border border-white/8">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
