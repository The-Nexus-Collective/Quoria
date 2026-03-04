"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CLUSTERS } from "@/data/clusters";
import { useVotes } from "@/context/VoteContext";
import { Navbar } from "@/components/layout/Navbar";
import { BoardControls } from "@/components/board/BoardControls";
import { EmptyState } from "@/components/board/EmptyState";
import { DemandRow } from "@/components/shared/DemandRow";

export default function BoardPage() {
  const { votes, handleVote } = useVotes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle");
  const [sortBy, setSortBy] = useState("count");

  const filtered = useMemo(() =>
    CLUSTERS.filter((c) => category === "Alle" || c.category === category)
      .filter((c) => !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.sectors.some((s) => s.toLowerCase().includes(search.toLowerCase())))
      .sort((a, b) => {
        if (sortBy === "count") return b.count + (votes[b.id] ? 1 : 0) - (a.count + (votes[a.id] ? 1 : 0));
        if (sortBy === "wtp") return b.wtp - a.wtp;
        return b.count / b.threshold - a.count / a.threshold;
      }),
    [category, search, sortBy, votes]
  );

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="px-6 md:px-12 pt-12 md:pt-16 max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[1px] bg-signal" />
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-signal">Demand Board</span>
              </div>
              <h1 className="font-serif font-normal text-ink leading-[1.05] tracking-[-0.02em]" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
                Was den Mittelstand<br /><span className="text-ink-muted italic">gerade bewegt.</span>
              </h1>
            </div>
            <Link href="/interview" className="bg-signal text-void px-6 py-3 font-sans text-[11px] tracking-[0.08em] uppercase transition-all hover:bg-signal-bright hover:shadow-[0_0_30px_rgba(77,124,255,0.2)]">
              + Problem einreichen
            </Link>
          </div>
          <BoardControls search={search} setSearch={setSearch} category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} resultCount={filtered.length} />
        </div>
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 pb-20">
          {filtered.length === 0 ? <EmptyState /> : filtered.map((c, i) => (
            <DemandRow key={c.id} cluster={c} voted={!!votes[c.id]} onVote={() => handleVote(c.id)} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
