import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Ticker } from "@/components/landing/Ticker";
import { Manifesto } from "@/components/landing/Manifesto";
import { DemandPreview } from "@/components/landing/DemandPreview";
import { BottomCTA } from "@/components/landing/BottomCTA";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Ticker />
      <Manifesto />
      <DemandPreview />
      <BottomCTA />
      <footer className="border-t border-ink-faint/10 px-6 md:px-12 py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-serif text-sm text-ink-faint">Quoria · Demand Intelligence for Mittelstand</span>
          <div className="flex gap-6">
            <a href="/board" className="font-sans text-[11px] text-ink-faint tracking-[0.1em] uppercase hover:text-signal transition-colors">Board</a>
            <a href="/interview" className="font-sans text-[11px] text-ink-faint tracking-[0.1em] uppercase hover:text-signal transition-colors">Mitmachen</a>
          </div>
        </div>
      </footer>
    </>
  );
}
