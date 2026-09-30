
"use client";

import { CheckCircle2, ChevronLeft, ChevronRight, Flag, RotateCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { getQuestions } from "@/lib/mock-data";
import { useLS, toast } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Panel, Badge } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/misc";
import Button from "@/components/ui/button";

export default function QuizEngine({ topic }: { topic: string }) {
  const questions = useMemo(() => getQuestions(topic), [topic]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const [, setAttempts] = useLS<Record<string, number>>("dg_attempts", {});
  const q = questions[idx];
  const score = questions.reduce((s, x, i) => s + (answers[i] === x.answerIndex ? 1 : 0), 0);

  const submit = () => {
    setSubmitted(true);
    setAttempts((a) => ({ ...a, [topic]: score }));
    toast(`Quiz submitted — ${score}/${questions.length}`);
  };

  if (questions.length === 0) return <Panel className="p-6 text-sm text-muted">No questions for this topic yet.</Panel>;

  if (submitted) {
    return (
      <Panel className="p-6">
        <div className="text-center">
          <p className="text-5xl font-extrabold text-accent">{Math.round((score / questions.length) * 100)}%</p>
          <p className="mt-2 text-sm text-muted">{score} of {questions.length} correct</p>
          <Badge className="mt-3">{score / questions.length >= 0.7 ? "Polar Explorer — well done!" : score / questions.length >= 0.4 ? "Ice Cadet — keep going!" : "Base Camp — try again!"}</Badge>
          <div className="mt-5 flex justify-center gap-2">
            <Button variant="outline" onClick={() => { setIdx(0); setAnswers(questions.map(() => null)); setSubmitted(false); }}>
              <RotateCcw className="h-4 w-4" /> Retry quiz
            </Button>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {questions.map((x, i) => (
            <div key={x.id} className="rounded-xl border border-line bg-input p-4">
              <p className="flex items-start gap-2 text-sm font-medium text-primary">
                {answers[i] === x.answerIndex ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />}
                {x.question}
              </p>
              <p className="mt-2 text-xs text-muted">
                Your answer: <span className={answers[i] === x.answerIndex ? "text-emerald-300" : "text-rose-300"}>{answers[i] !== null ? x.options[answers[i]!] : "Skipped"}</span>
                {answers[i] !== x.answerIndex && <> · Correct: <span className="text-emerald-300">{x.options[x.answerIndex]}</span></>}
              </p>
              <p className="mt-2 text-xs text-muted">{x.explanation}</p>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  return (
    <Panel className="p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span>Question {idx + 1} of {questions.length}</span>
        <span>{answers.filter((a) => a !== null).length} answered</span>
      </div>
      <ProgressBar value={((idx + 1) / questions.length) * 100} />
      <p className="mt-5 font-semibold text-primary">{q.question}</p>
      <div className="mt-4 grid gap-2">
        {q.options.map((o, oi) => (
          <button key={o} onClick={() => setAnswers((a) => a.map((v, i) => (i === idx ? oi : v)))}
            className={cn("rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-ring",
              answers[idx] === oi ? "border-cyan-400/70 bg-cyan-500/15 text-accent" : "border-line text-muted hover:border-cyan-400/40 hover:text-primary")}>
            <span className="mr-2 font-semibold">{String.fromCharCode(65 + oi)}.</span>{o}
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={idx === 0} onClick={() => setIdx(idx - 1)}><ChevronLeft className="h-4 w-4" /> Previous</Button>
        {idx < questions.length - 1 ? (
          <Button size="sm" onClick={() => setIdx(idx + 1)}>Next <ChevronRight className="h-4 w-4" /></Button>
        ) : (
          <Button size="sm" onClick={submit} disabled={answers.some((a) => a === null)}>
            <Flag className="h-4 w-4" /> Submit quiz
          </Button>
        )}
      </div>
    </Panel>
  );
}
