"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CLUSTERS } from "@/data/clusters";
import { useVotes } from "@/context/VoteContext";

function Card({ cluster: c, voted, onVote }: { cluster: (typeof CLUSTERS)[number]; voted: boolean; onVote: () => void }) {
  const count = c.count + (voted ? 1 : 0);
  const pct = Math.min(100, Math.round((count / c.threshold) * 100));
  const isNear = pct >= 80;

  return (
    <div className="group relative border border-ink-faint/10 bg-surface-raised p-6 transition-all duration-300 hover:border-signal/30 hover:bg-surface-glow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[9px] font-sans tracking-[0.15em] uppercase text-ink-faint">{c.category}</span>
        {c.trending && (
          <span className="text-[9px] font-sans tracking-[0.1em] text-hot uppercase flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-hot" />Trending
          </span>
        )}
      </div>

      <h3 className="font-serif text-lg text-ink font-medium mb-2 leading-tight group-hover:text-signal-bright transition-colors">{c.title}</h3>
      <p className="font-sans text-[12px] text-ink-faint leading-relaxed mb-5">{c.desc}</p>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-sans text-[10px] text-ink-muted tracking-[0.1em] uppercase">{count} / {c.threshold} Signale</span>
          {isNear && <span className="text-[9px] font-sans text-ready tracking-[0.1em] uppercase">Fast erreicht</span>}
        </div>
        <div className="h-[2px] bg-ink-faint/20 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-[width] duration-700 ${isNear ? "bg-ready" : "bg-signal"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {c.sectors.map((s) => (
            <span key={s} className="text-[9px] font-sans text-ink-faint/70 border border-ink-faint/15 px-2 py-0.5">{s}</span>
          ))}
        </div>
        <button onClick={onVote} className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-sans transition-all duration-200 cursor-pointer border ${voted ? "bg-signal border-signal text-void" : "bg-transparent border-ink-faint/20 text-ink-muted hover:border-signal/50 hover:text-signal"}`}>
          <span className="text-[10px]">▲</span>
          <span className="font-medium">{count}</span>
        </button>
      </div>

      <div className="absolute top-6 right-6 font-serif text-xl text-signal/60 font-medium">
        €{c.wtp}<span className="text-[9px] font-sans text-ink-faint/40 ml-0.5">/mo</span>
      </div>
    </div>
  );
}

export function DemandPreview() {
  const { votes, handleVote } = useVotes();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="demand" ref={ref} className="relative py-24 md:py-40 px-6 md:px-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] opacity-20 blur-[150px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(77,124,255,0.12) 0%, transparent 70%)" }} />

      <div className="max-w-[1200px] mx-auto relative">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-signal" />
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-signal">Live · Demand Board</span>
            </div>
            <h2 className="font-serif font-normal text-ink leading-[1.1] tracking-[-0.02em]" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Was den Mittelstand<br /><span className="text-ink-muted italic">gerade bewegt.</span>
            </h2>
          </div>
          <Link href="/board" className="font-sans text-[11px] tracking-[0.12em] uppercase text-ink-muted border border-ink-faint/20 px-6 py-3 transition-all duration-300 hover:border-signal/40 hover:text-signal">
            Alle {CLUSTERS.length} Themen →
          </Link>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0 translate-y-6"}`}>
          {CLUSTERS.slice(0, 6).map((c) => (
            <Card key={c.id} cluster={c} voted={!!votes[c.id]} onVote={() => handleVote(c.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
