"use client";

import { useEffect, useRef, useState } from "react";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <div className="w-12 h-[1px] bg-signal" />
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-signal">Das Prinzip</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0 translate-y-6"}`}>
            <blockquote className="font-serif text-ink leading-[1.35] tracking-[-0.02em] mb-12" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
              Software für den Mittelstand wird meistens von Menschen gebaut, die nie einen{" "}
              <span className="text-signal italic">Handwerksbetrieb</span> geführt haben.
            </blockquote>
            <div className="space-y-6 max-w-[600px]">
              <p className="font-serif text-lg text-ink-muted leading-[1.8]">
                KI hat die Entwicklungskosten dramatisch gesenkt. Zum ersten Mal kann man Software profitabel für 50 Unternehmen bauen — nicht erst ab 5.000.
              </p>
              <p className="font-serif text-lg text-ink-muted leading-[1.8]">
                Quoria nutzt genau das: Wer sein Problem beschreibt, bestimmt was gebaut wird. Erst wenn genug Unternehmen dasselbe brauchen, startet der Build. Nicht vorher. Niemals als Individualentwicklung.
              </p>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0 translate-x-8"}`}>
            <div className="border border-ink-faint/15 bg-surface-raised p-8">
              <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-ink-faint mb-8">So funktioniert es</div>
              {[
                { step: "01", title: "Problem beschreiben", desc: "5 Minuten. Anonym. Ehrlich." },
                { step: "02", title: "Cluster bildet sich", desc: "Ähnliche Probleme werden gruppiert." },
                { step: "03", title: "Quorum erreicht", desc: "50 Unternehmen = Build-Signal." },
                { step: "04", title: "Produkt entsteht", desc: "KI-gestützte Entwicklung startet." },
                { step: "05", title: "Gründerpreis", desc: "−40% für alle Einreicher. Dauerhaft." },
              ].map((s, i) => (
                <div key={i} className="flex gap-5 py-4 border-b border-ink-faint/10 last:border-b-0 group">
                  <span className="font-sans text-[11px] text-signal tracking-[0.1em] pt-0.5 font-medium">{s.step}</span>
                  <div>
                    <div className="font-sans text-[13px] text-ink font-medium mb-1 group-hover:text-signal transition-colors">{s.title}</div>
                    <div className="font-sans text-[12px] text-ink-faint leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-signal/20 p-6" style={{ background: "rgba(77,124,255,0.08)" }}>
              <div className="font-serif text-2xl text-ink mb-2">50 = Build-Signal</div>
              <p className="font-sans text-[12px] text-ink-muted leading-relaxed">
                Sobald 50 Unternehmen dasselbe Problem beschrieben haben, beginnt die Entwicklung. Alle Einreicher werden benachrichtigt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
