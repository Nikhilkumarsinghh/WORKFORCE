"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type ExploreGroup = { id: string; title: string; text: string; links: [string, string][] };

export default function ExploreTabs({ groups }: { groups: ExploreGroup[] }) {
  const [a, setA] = useState(groups[0].id);
  const g = groups.find((x) => x.id === a)!;
  return (
    <div className="wf-explore">
      <div className="wf-explore-tabs" role="tablist" aria-label="Explore">
        {groups.map((x) => (
          <button key={x.id} role="tab" aria-selected={a === x.id} onClick={() => setA(x.id)} onMouseEnter={() => setA(x.id)}>
            <strong>{x.title}</strong><span>{x.text}</span>
          </button>
        ))}
      </div>
      <div className="wf-explore-panel" role="tabpanel" key={g.id}>
        {g.links.map(([l, h]) => <Link key={h} href={h}>{l}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}
      </div>
    </div>
  );
}
