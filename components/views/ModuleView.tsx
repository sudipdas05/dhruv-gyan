
"use client";

import { Brain, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { educationModules } from "@/lib/mock-data";
import { useLS, toast } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Panel, Badge } from "@/components/ui/card";
import { ProgressBar, EmptyState } from "@/components/ui/misc";
import Button from "@/components/ui/button";
import QuizEngine from "@/components/education/QuizEngine";

const MODULE_TOPIC: Record<string, string> = {
  "mod-antarctica": "antarctica", "mod-arctic": "arctic", "mod-poles": "climate", "mod-missions": "india",
  "mod-glaciers": "climate", "mod-oceans": "climate", "mod-wildlife": "antarctica", "mod-atmosphere": "climate",
};

export default function ModuleView({ id }: { id: string }) {
  const params = useSearchParams();
  const mod = educationModules.find((m) => m.id === id);
  const [tab, setTab] = useState(params.get("tab") === "quiz" ? "quiz" : "learn");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [done, setDone] = useLS<string[]>("dg_lessons_done", []);
  const [progressMap, setProgressMap] = useLS<Record<string, number>>("dg_module_progress", {});

  if (!mod) return <EmptyState title="Module not found" action={<Link href="/education"><Button variant="outline">All modules</Button></Link>} />;

  const lesson = mod.lessons[lessonIdx];
  const doneCount = mod.lessons.filter((l) => done.includes(l.id)).length;
  const pct = Math.round((doneCount / mod.lessons.length) * 100);

  const markComplete = () => {
    if (!done.includes(lesson.id)) setDone([...done, lesson.id]);
    const next = Math.round(((doneCount + 1) / mod.lessons.length) * 100);
    setProgressMap({ ...progressMap, [mod.id]: Math.max(progressMap[mod.id] ?? 0, next) });
    toast("Lesson marked complete");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <Link href="/education" className="text-sm text-muted hover:text-accent focus-ring rounded">← Polar Learning Hub</Link>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge className="text-accent border-cyan-400/30">{mod.topic}</Badge>
        <Badge>{mod.audience}</Badge><Badge>{mod.level}</Badge>
      </div>
      <h1 className="mt-2 text-3xl font-bold text-primary">{mod.title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{mod.description}</p>

      <div className="mt-6 flex gap-2 border-b border-line pb-3">
        {([["learn", "Lessons"], ["quiz", "Quiz"]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={cn("rounded-lg px-4 py-2 text-sm font-medium focus-ring",
              tab === k ? "bg-cyan-500/15 text-accent" : "text-muted hover:text-primary")}>{label}</button>
        ))}
      </div>

      {tab === "quiz" ? (
        <div className="mt-6"><QuizEngine topic={MODULE_TOPIC[mod.id] ?? "antarctica"} /></div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside>
            <Panel className="sticky top-24 p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-muted">
                <span>Progress</span><span className="text-accent">{pct}%</span>
              </div>
              <ProgressBar value={pct} />
              <nav className="mt-4 flex flex-col gap-1" aria-label="Lessons">
                {mod.lessons.map((l, i) => (
                  <button key={l.id} onClick={() => setLessonIdx(i)}
                    className={cn("flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm focus-ring",
                      i === lessonIdx ? "bg-cyan-500/15 text-accent" : "text-muted hover:text-primary")}>
                    {done.includes(l.id) && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}
                    <span className="line-clamp-1">{i + 1}. {l.title}</span>
                  </button>
                ))}
              </nav>
              <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs text-muted">
                <Brain className="h-4 w-4 text-accent" /> Progress saved on this device
              </div>
            </Panel>
          </aside>
          <Panel className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Lesson {lessonIdx + 1} of {mod.lessons.length}</p>
            <h2 className="mt-1 text-xl font-bold text-primary">{lesson.title}</h2>
            <div className="prose-polar mt-4">
              {lesson.sections.map((s) => (
                <div key={s.heading}>
                  <h3>{s.heading}</h3>
                  <p className="text-sm text-muted">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">Key concepts</p>
              <div className="flex flex-wrap gap-1.5">{lesson.concepts.map((c) => <Badge key={c}>{c}</Badge>)}</div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <Button variant="outline" size="sm" disabled={lessonIdx === 0} onClick={() => setLessonIdx(lessonIdx - 1)}>
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <Button variant="soft" size="sm" onClick={markComplete} disabled={done.includes(lesson.id)}>
                <CheckCircle2 className="h-4 w-4" /> {done.includes(lesson.id) ? "Completed" : "Mark complete"}
              </Button>
              <Button variant="outline" size="sm" disabled={lessonIdx === mod.lessons.length - 1} onClick={() => setLessonIdx(lessonIdx + 1)}>
                Next lesson <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}
