const stats = [
  { number: "03", title: "Connected business divisions" },
  { number: "People", title: "Workforce and recruitment" },
  { number: "Digital", title: "Software and technology" },
  { number: "Growth", title: "Careers and learning" },
];

export default function Stats() {
  return (
    <section className="section-padding bg-[var(--card)] text-[var(--text)]">

      <div className="container-custom">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">

          {stats.map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl border border-black/10 text-center hover:bg-[var(--bg)] hover:text-[var(--text)] transition duration-300"
            >
              <h2 className="text-5xl font-black text-red-600">
                {item.number}
              </h2>

              <p className="mt-4 text-lg font-medium">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}