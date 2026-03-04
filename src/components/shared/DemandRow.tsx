"use client";

import type { Cluster } from "@/data/clusters";

export function DemandRow({ cluster: c, voted, onVote, index }: { cluster: Cluster; voted: boolean; onVote: () => void; index: number }) {
  const count = c.count + (voted ? 1 : 0);
  const pct = Math.min(100, Math.round((count / c.threshold) * 100));
  const isNear = pct >= 80;

  return (
    <div className="group grid grid-cols-1 md:grid-cols-[44px_1fr_90px_64px] gap-4 md:gap-6 items-center py-5 border-b border-ink-faint/10 hover:bg-surface-raised transition-colors">
      <div className="hidden md:block font-serif text-2xl text-ink-faint/30 text-right leading-none">{String(index + 1).padStart(2, "0")}</div>
      <div>
        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
          <span className="font-serif text-lg font-medium text-ink group-hover:text-signal-bright transition-colors">{c.title}</span>
          {c.trending && <span className="text-[9px] font-sans tracking-[0.1em] text-hot border border-hot/25 px-1.5 py-0.5 uppercase">↑ Trending</span>}
          {isNear && <span className="text-[9px] font-sans tracking-[0.1em] text-ready border border-ready/25 px-1.5 py-0.5 uppercase">Fast erreicht</span>}
        </div>
        <p className="text-[13px] text-ink-muted font-sans mb-2.5 leading-normal">{c.desc}</p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="h-[2px] w-[140px] bg-ink-faint/20 rounded-full">
            <div className={`h-full rounded-full transition-[width] duration-500 ${isNear ? "bg-ready" : "bg-signal"}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[11px] font-sans text-ink-faint">{count} / {c.threshold}</span>
          {c.sectors.map((s) => <span key={s} className="text-[9px] font-sans text-ink-faint/60 border border-ink-faint/15 px-2 py-0.5">{s}</span>)}
        </div>
      </div>
      <div className="hidden md:block text-right">
        <div className="font-serif text-xl text-signal font-medium">€{c.wtp}</div>
        <div className="text-[9px] font-sans text-ink-faint tracking-[0.1em] uppercase">/ Monat</div>
      </div>
      <button onClick={onVote} className={`flex flex-col items-center gap-0.5 px-3 py-2 border cursor-pointer font-sans transition-all min-w-[56px] ${voted ? "bg-signal border-signal text-void" : "bg-transparent border-ink-faint/20 text-ink-muted hover:border-signal/50 hover:text-signal"}`}>
        <span className="text-[10px]">▲</span>
        <span className="text-sm font-serif font-medium">{count}</span>
      </button>
    </div>
  );
}
