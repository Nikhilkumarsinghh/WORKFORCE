const features = [
  "Trusted Workforce Solutions",
  "Fast Hiring Process",
  "Industry Experienced Team",
  "Professional Management",
  "Reliable Staffing Support",
  "Pan India Expansion Vision",
];

export default function WhyUs() {
  return (
    <section className="section-padding bg-[var(--card)] text-[var(--text)]">

      <div className="container-custom">

        <div className="mb-16">

          <p className="uppercase tracking-[4px] text-red-600 mb-4">
            Why UNIQUE TOO
          </p>

          <h2 className="text-5xl font-black">
            Built For
            <span className="text-red-600"> Modern Workforce</span>
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl border border-black/10 hover:bg-[var(--bg)] hover:text-[var(--text)] transition duration-300"
            >
              <h3 className="text-2xl font-bold">
                {feature}
              </h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
