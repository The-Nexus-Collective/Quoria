"use client";

import { useRef, useEffect } from "react";
import { QUESTIONS } from "@/data/clusters";

export function QuestionStep({ step, currentAnswer, setCurrentAnswer, onNext }: { step: number; currentAnswer: string; setCurrentAnswer: (s: string) => void; onNext: () => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { ref.current?.focus(); }, [step]);

  const q = QUESTIONS[step];
  return (
    <div key={step} className="animate-fade-in-up">
      <div className="flex gap-1.5 mb-14">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${i < step ? "bg-signal" : i === step ? "bg-signal-dim" : "bg-ink-faint/15"}`} />
        ))}
      </div>

      <div className="text-[10px] font-sans tracking-[0.25em] text-signal uppercase mb-8">Frage {step + 1} von {QUESTIONS.length}</div>

      <h2 className="font-serif font-normal leading-[1.2] mb-4 text-ink" style={{ fontSize: "clamp(26px, 3.5vw, 42px)" }}>{q.q}</h2>
      <p className="font-serif italic text-base text-ink-muted mb-10 leading-relaxed">{q.sub}</p>

      <textarea ref={ref} value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) onNext(); }}
        placeholder={q.placeholder} rows={4}
        className="w-full bg-surface-raised border border-ink-faint/15 border-b-2 border-b-signal text-ink p-5 text-base font-serif resize-none outline-none leading-[1.7] mb-6 focus:border-signal/40 transition-colors placeholder:text-ink-faint/40" />

      <div className="flex justify-between items-center">
        <span className="text-[11px] text-ink-faint font-sans">⌘ + Enter</span>
        <button onClick={onNext} disabled={!currentAnswer.trim()}
          className={`px-8 py-3.5 font-sans text-[12px] tracking-[0.08em] uppercase transition-all border-none cursor-pointer ${currentAnswer.trim() ? "bg-signal text-void hover:bg-signal-bright hover:shadow-[0_0_30px_rgba(77,124,255,0.2)]" : "bg-ink-faint/10 text-ink-faint cursor-default"}`}>
          {step === QUESTIONS.length - 1 ? "Abschicken" : "Weiter →"}
        </button>
      </div>
    </div>
  );
}
