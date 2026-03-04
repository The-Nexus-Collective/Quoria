import Link from "next/link";

export function EmptyState() {
  return (
    <div className="text-center py-24">
      <div className="font-serif text-2xl italic text-ink-muted mb-6">Kein Treffer — vielleicht ein neues Problem?</div>
      <Link href="/interview" className="inline-block bg-signal text-void px-7 py-3 font-sans text-[12px] tracking-[0.08em] uppercase hover:bg-signal-bright">Problem beschreiben →</Link>
    </div>
  );
}
