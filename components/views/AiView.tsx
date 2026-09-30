
"use client";

import { Bot, RefreshCw, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ChatMessage } from "@/lib/types";
import { askPolarAI, AI_SUGGESTIONS, AI_GREETING } from "@/lib/ai";
import { cn } from "@/lib/utils";
import { Panel, Badge } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";

function bold(p: string, keyBase: string) {
  const t = p.replace(/\*\*(.+?)\*\*/g, "§$1§");
  return t.split(/§(.+?)§/).map((p2, j) =>
    j % 2 === 1 ? <strong key={keyBase + j} className="text-primary">{p2}</strong> : p2
  );
}

function render(text: string) {
  const out: ReactNode[] = [];
  let items: ReactNode[] = [];
  const flush = (k: number) => {
    if (items.length) { out.push(<ul key={`ul${k}`} className="my-1 space-y-1">{items}</ul>); items = []; }
  };
  text.split("\n").forEach((line, i) => {
    if (line.startsWith("- ")) {
      items.push(<li key={i} className="ml-4 list-disc leading-relaxed">{bold(line.slice(2), `b${i}`)}</li>);
    } else {
      flush(i);
      if (line.trim() === "") return;
      out.push(<p key={i} className="my-1 leading-relaxed">{bold(line, `b${i}`)}</p>);
    }
  });
  flush(9999);
  return out;
}

export default function AiView() {
  const [messages, setMessages] = useState<ChatMessage[]>([AI_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const { answer, sources } = askPolarAI(q);
      setMessages((m) => [...m, { role: "assistant", content: answer, sources }]);
      setLoading(false);
    }, 650);
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col px-4 py-10 md:px-6" style={{ minHeight: "calc(100vh - 200px)" }}>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-polar-950">
          <Bot className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-primary">POLAR AI</h1>
        <p className="mt-1 text-sm text-muted">Your intelligent guide to India&apos;s polar science.</p>
        <Badge className="mt-3 border-amber-400/40 bg-amber-400/10 text-amber-300">
          <Sparkles className="h-3 w-3" /> Demo AI Mode — grounded in the DHRUV GYAN sample repository
        </Badge>
      </div>

      <Panel className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-5 overflow-y-auto p-5" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                m.role === "user" ? "bg-cyan-500 text-polar-950 font-medium" : "border border-line bg-input text-muted")}>
                {render(m.content)}
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-3 border-t border-line pt-3">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent">Sources</p>
                    <ul className="space-y-1">
                      {m.sources.map((s) => (
                        <li key={s.id}>
                          <Link href={`/repository/${s.id}`} className="text-xs text-accent hover:underline focus-ring rounded">
                            {s.title}{s.year ? ` (${s.year})` : ""}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-line bg-input px-4 py-3">
                <div className="flex gap-1.5">{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-pulseSoft rounded-full bg-cyan-400" style={{ animationDelay: `${d * 0.2}s` }} />)}</div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-line p-4">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {AI_SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="rounded-full border border-line px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-cyan-400/50 hover:text-accent focus-ring">
                {s}
              </button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about expeditions, stations, research, or ask for a Class 8 explanation..."
              aria-label="Ask POLAR AI" />
            <Button type="submit" disabled={loading} aria-label="Send"><Send className="h-4 w-4" /></Button>
            <Button type="button" variant="ghost" aria-label="Reset chat" onClick={() => setMessages([AI_GREETING])}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Panel>
    </div>
  );
}
