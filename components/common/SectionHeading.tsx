type Props = {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
};

export default function SectionHeading({
  label,
  title,
  highlight,
  description,
}: Props) {
  return (
    <div className="max-w-4xl mb-16">

      <p className="text-red-600 uppercase tracking-[4px] font-semibold mb-4">
        {label}
      </p>

      <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">

        {title}

        {highlight && (
          <span className="text-red-600"> {highlight}</span>
        )}

      </h2>

      {description && (
        <p className="text-gray-400 text-lg leading-8 max-w-3xl">
          {description}
        </p>
      )}

    </div>
  );
}