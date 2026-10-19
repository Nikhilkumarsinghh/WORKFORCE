export default function JobsFilter() {
  return (
    <section className="bg-[var(--card)] py-10 border-b border-black/10">

      <div className="container-custom">

        <div className="grid md:grid-cols-4 gap-5">

          {/* Search */}

          <input
            type="text"
            placeholder="Job title or keyword"
            className="border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500"
          />

          {/* Location */}

          <select className="border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500">
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Chakan</option>
            <option>Bangalore</option>
          </select>

          {/* Category */}

          <select className="border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500">
            <option>All Categories</option>
            <option>Warehouse</option>
            <option>Manufacturing</option>
            <option>Security</option>
            <option>Housekeeping</option>
          </select>

          {/* Button */}

          <button className="btn-primary w-full">
            Search Jobs
          </button>

        </div>

      </div>

    </section>
  );
}