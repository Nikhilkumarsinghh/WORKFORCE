"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ApplyModal({
  isOpen,
  onClose,
}: Props) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--bg)]/70 z-50 flex items-center justify-center px-4">

      <div className="bg-[var(--card)] w-full max-w-2xl rounded-3xl p-10 relative">

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-2xl"
        >
          ×
        </button>

        <p className="uppercase tracking-[4px] text-red-600 mb-4">
          Apply Now
        </p>

        <h2 className="text-4xl font-black mb-8">
          Submit Your Application
        </h2>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-black/10 rounded-2xl px-6 py-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-black/10 rounded-2xl px-6 py-4 outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border border-black/10 rounded-2xl px-6 py-4 outline-none"
          />

          <input
            type="text"
            placeholder="Current City"
            className="w-full border border-black/10 rounded-2xl px-6 py-4 outline-none"
          />

          <input
            type="file"
            className="w-full border border-black/10 rounded-2xl px-6 py-4"
          />

          <button className="btn-primary w-full">
            Submit Application
          </button>

        </form>

      </div>

    </div>
  );
}