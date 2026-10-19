import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function GlassCard({ children }: Props) {
  return (
    <div className="bg-[var(--card)]/5 backdrop-blur-xl border border-[var(--border)] rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-300">
      {children}
    </div>
  );
}