export default function JobsHero() {
  return (
    <section className="pt-40 pb-28 bg-[var(--bg)] text-[var(--text)]">

      <div className="container-custom">

        <p className="uppercase tracking-[4px] text-red-600 mb-5">
          Careers
        </p>

        <h1 className="text-6xl md:text-8xl font-black leading-tight max-w-6xl">
          Find Your
          <span className="text-red-600">
            {" "}Dream Job
          </span>
        </h1>

        <p className="mt-10 text-gray-300 text-xl max-w-4xl leading-9">
          Explore workforce, industrial, logistics,
          warehouse and recruitment opportunities across India.
        </p>

      </div>

    </section>
  );
}