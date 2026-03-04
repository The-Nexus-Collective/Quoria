"use client";

import { useState, useMemo } from "react";
import { QUESTIONS } from "@/data/clusters";
import { Navbar } from "@/components/layout/Navbar";
import { QuestionStep } from "@/components/interview/QuestionStep";
import { CompletionView } from "@/components/interview/CompletionView";

export default function InterviewPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const isComplete = step >= QUESTIONS.length;
  const matchCount = useMemo(() => 19 + Math.floor(Math.random() * 12), []);

  const handleNext = () => {
    if (!currentAnswer.trim()) return;
    setAnswers((prev) => ({ ...prev, [QUESTIONS[step].field]: currentAnswer }));
    setCurrentAnswer("");
    setStep((s) => s + 1);
  };

  return (
    <>
      <Navbar />
      <div className="pt-16 min-h-screen">
        <div className="h-[2px] bg-ink-faint/10 fixed top-16 left-0 right-0 z-[100]">
          <div className="h-full bg-signal transition-[width] duration-500 ease-out" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
        </div>
        <div className="flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 max-w-[700px] mx-auto min-h-[calc(100vh-64px)]">
          {!isComplete
            ? <QuestionStep step={step} currentAnswer={currentAnswer} setCurrentAnswer={setCurrentAnswer} onNext={handleNext} />
            : <CompletionView answers={answers} matchCount={matchCount} />
          }
        </div>
      </div>
    </>
  );
}
