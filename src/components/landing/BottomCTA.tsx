"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL } from "@/data/clusters";

export function BottomCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(77,124,255,0.15) 0%, transparent 70%)" }} />

      <div className={`max-w-[700px] mx-auto text-center relative transition-all duration-1000 ${visible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
        <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-signal mb-8">Werden Sie Teil des Quorums</div>

        <h2 className="font-serif font-normal text-ink leading-[1.1] tracking-[-0.02em] mb-6" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
          Einzeln ein Betrieb.<br />
          <span className="text-transparent bg-clip-text italic" style={{ backgroundImage: "linear-gradient(135deg, #4d7cff, #4dffb5)" }}>Zusammen ein Markt.</span>
        </h2>

        <p className="font-serif text-lg text-ink-muted leading-[1.7] mb-12 max-w-[480px] mx-auto">
          {TOTAL} Unternehmen haben ihr Problem bereits beschrieben. 5 Minuten Ihrer Zeit. Kein Vertrag. Nur Ihre Stimme.
        </p>

        <a href="/interview" className="group inline-flex items-center gap-3 px-10 py-5 bg-signal text-void font-sans text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:bg-signal-bright hover:shadow-[0_0_60px_rgba(77,124,255,0.3)]">
          Jetzt mitmachen
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>

        <div className="mt-12 flex justify-center gap-8">
          {[{ value: "5 min", label: "Interview" }, { value: "−40%", label: "Gründerpreis" }, { value: "50", label: "Build-Schwelle" }].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-2xl text-ink font-medium">{s.value}</div>
              <div className="text-[9px] font-sans text-ink-faint tracking-[0.15em] uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-signal/20 to-transparent" />
    </section>
  );
}
