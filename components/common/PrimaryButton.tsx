type Props = {
  text: string;
};

export default function PrimaryButton({ text }: Props) {
  return (
    <button className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-[var(--text)] transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,0,0.45)]">
      {text}
    </button>
  );
}