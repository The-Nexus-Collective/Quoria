"use client";

import Link from "next/link";

export function CompletionView({ answers, matchCount }: { answers: Record<string, string>; matchCount: number }) {
  return (
    <div className="animate-fade-in-up">
      <div className="text-[10px] font-sans tracking-[0.25em] text-ready uppercase mb-10">✓ Eingereicht</div>

      <h2 className="font-serif font-normal leading-[1.1] tracking-[-0.02em] mb-12 text-ink" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
        Ihr Problem ist<br />
        <span className="text-transparent bg-clip-text italic" style={{ backgroundImage: "linear-gradient(135deg, #4d7cff, #4dffb5)" }}>nicht allein.</span>
      </h2>

      <div className="border border-ready/20 bg-surface-raised p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
        <div className="font-serif font-light leading-none text-transparent bg-clip-text" style={{ fontSize: "64px", backgroundImage: "linear-gradient(180deg, #4dffb5, #2d8f6a)" }}>{matchCount}</div>
        <div>
          <div className="font-serif text-xl text-ink mb-2">andere Unternehmen haben ein ähnliches Problem beschrieben.</div>
          <div className="text-[13px] font-sans text-ink-muted">Schwelle für Build-Signal: 50. Sie helfen diesen Cluster wachsen.</div>
        </div>
      </div>

      <div className="border border-ink-faint/10 bg-surface-raised p-6 md:p-8 mb-8">
        <div className="text-[10px] font-sans tracking-[0.2em] text-ink-faint uppercase mb-6">Ihr Problem-Brief</div>
        {Object.entries(answers).map(([key, val]) => (
          <div key={key} className="mb-4 pb-4 border-b border-ink-faint/10 last:border-b-0">
            <div className="text-[10px] font-sans text-ink-faint tracking-[0.12em] uppercase mb-1.5">{key}</div>
            <div className="font-serif text-base text-ink leading-relaxed">{val}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/board" className="bg-signal text-void px-8 py-3.5 font-sans text-[11px] tracking-[0.08em] uppercase text-center hover:bg-signal-bright">Demand Board ansehen →</Link>
        <Link href="/" className="border border-ink-faint/20 text-ink-muted px-8 py-3.5 font-sans text-[11px] tracking-[0.08em] uppercase text-center hover:border-signal/30 hover:text-ink">Startseite</Link>
      </div>
    </div>
  );
}
