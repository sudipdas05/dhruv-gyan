
"use client";

import { BookOpen, Brain, GraduationCap, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { educationModules, quizTopics } from "@/lib/mock-data";
import { useLS } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Panel, SectionHead, Badge } from "@/components/ui/card";
import { GradientThumb } from "@/components/ui/misc";

const TOPIC_MODULE: Record<string, string> = { antarctica: "mod-antarctica", arctic: "mod-arctic", climate: "mod-poles", india: "mod-missions" };
const AUDIENCES = ["All", "School Students", "College Students", "Teachers", "Researchers", "General Public"];

export default function EducationView() {
  const [aud, setAud] = useState("All");
  const [progress] = useLS<Record<string, number>>("dg_module_progress", {});
  const matchesAudience = (audience: string) =>
    aud === "All" ||
    audience === aud ||
    (aud === "Teachers" && audience.includes("Teachers")) ||
    (aud === "General Public" && audience.includes("Public"));
  const modules = educationModules.filter((m) => matchesAudience(m.audience));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="aurora-bg mb-10 rounded-3xl border border-line px-6 py-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-polar-950">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold text-primary">Polar Learning Hub</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted md:text-base">Learn the science behind the frozen frontiers — progressive lessons, checkpoints and quizzes for students, teachers, researchers and the curious public.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {AUDIENCES.map((a) => (
            <button key={a} onClick={() => setAud(a)}
              className={cn("rounded-full border px-4 py-1.5 text-xs font-medium focus-ring",
                aud === a ? "border-cyan-400/70 bg-cyan-500/15 text-accent" : "border-line text-muted hover:text-primary")}>{a}</button>
          ))}
        </div>
      </div>

      <SectionHead eyebrow="Learning Modules" title="Pick a Topic" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m) => (
          <Link key={m.id} href={`/education/${m.id}`} className="group focus-ring rounded-2xl">
            <Panel className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
              <GradientThumb color={m.color} label={m.title} icon={<BookOpen className="h-8 w-8" />} className="h-28 w-full" />
              <div className="p-4">
                <Badge>{m.audience}</Badge>
                <h3 className="mt-2 font-semibold text-primary">{m.title}</h3>
                <p className="mt-1 text-xs text-muted line-clamp-2">{m.description}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-panel">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all" style={{ width: `${progress[m.id] ?? 0}%` }} />
                </div>
                <p className="mt-1.5 text-[10px] text-muted">{m.lessons.length} lessons · {progress[m.id] ?? 0}% complete</p>
              </div>
            </Panel>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <SectionHead eyebrow="Test Yourself" title="Quizzes" sub="Multiple-choice quizzes with instant feedback and answer review." />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {quizTopics.map((t) => (
          <Link key={t.id} href={`/education/${TOPIC_MODULE[t.id]}?tab=quiz`} className="group focus-ring rounded-2xl">
            <Panel className="flex h-full items-center gap-4 p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.color} text-white`}>
                <Brain className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-primary">{t.label}</p>
                <p className="flex items-center gap-1 text-xs text-muted"><Play className="h-3 w-3" /> Start quiz</p>
              </div>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
