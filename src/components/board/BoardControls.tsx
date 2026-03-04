"use client";

import { CATEGORIES } from "@/data/clusters";

export function BoardControls({ search, setSearch, category, setCategory, sortBy, setSortBy, resultCount }: { search: string; setSearch: (s: string) => void; category: string; setCategory: (c: string) => void; sortBy: string; setSortBy: (s: string) => void; resultCount: number }) {
  return (
    <>
      <div className="flex gap-3 mb-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-[240px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint text-sm">⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Branche oder Thema suchen..."
            className="w-full bg-surface-raised border border-ink-faint/15 text-ink px-4 py-3 pl-10 text-[13px] font-sans outline-none focus:border-signal/40 transition-colors placeholder:text-ink-faint/50" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 cursor-pointer text-[11px] font-sans tracking-[0.07em] uppercase transition-all border ${category === cat ? "bg-signal text-void border-signal" : "bg-transparent text-ink-muted border-ink-faint/15 hover:border-signal/30"}`}>
              {cat}
            </button>
          ))}
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-surface-raised border border-ink-faint/15 text-ink-muted px-3.5 py-2.5 text-[11px] font-sans outline-none cursor-pointer">
          <option value="count">Nach Stimmen</option>
          <option value="wtp">Nach Zahlungsbereitschaft</option>
          <option value="progress">Nach Fortschritt</option>
        </select>
      </div>
      <div className="text-[11px] font-sans text-ink-faint mb-8 tracking-[0.05em]">{resultCount} Themen</div>
    </>
  );
}
