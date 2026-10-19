export default function Mission() {
  return (
    <section className="section-padding bg-[var(--bg)] text-[var(--text)]">

      <div className="container-custom grid md:grid-cols-2 gap-16">

        <div className="p-12 rounded-3xl bg-[var(--card)]/5 border border-[var(--border)]">

          <p className="uppercase tracking-[4px] text-red-600 mb-4">
            Our Mission
          </p>

          <h2 className="text-4xl font-black mb-6">
            Empowering Workforce Across India
          </h2>

          <p className="text-gray-300 leading-8">
            We aim to connect skilled workforce with growing
            industries through trusted staffing, recruitment
            and workforce solutions.
          </p>

        </div>

        <div className="p-12 rounded-3xl bg-blue-500 text-[var(--text)]">

          <p className="uppercase tracking-[4px] mb-4">
            Our Vision
          </p>

          <h2 className="text-4xl font-black mb-6">
            India’s Modern Workforce Platform
          </h2>

          <p className="leading-8">
            To become India’s most trusted modern workforce
            and staffing platform serving industries nationwide.
          </p>

        </div>

      </div>

    </section>
  );
}