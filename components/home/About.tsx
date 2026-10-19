export default function About() {
  return (
    <section className="section-padding bg-[var(--card)] text-[var(--text)]">
      <div className="container-custom grid md:grid-cols-2 gap-16 items-center">

        <div>
          <p className="uppercase tracking-[4px] text-red-600 mb-4 font-semibold">
            About UNIQUE TOO
          </p>

          <h2 className="text-5xl font-black leading-tight">
            Building Workforce
            <span className="text-red-600"> For Modern Industries</span>
          </h2>
        </div>

        <div>
          <p className="text-gray-600 text-lg leading-8">
            UNIQUE TOO is a modern workforce and staffing platform
            helping industries hire skilled, semi-skilled and
            professional talent across India.
          </p>

          <p className="text-gray-600 text-lg leading-8 mt-6">
            From recruitment and staffing to workforce management,
            we help businesses scale with trusted manpower solutions.
          </p>

          <button className="btn-primary mt-8">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}