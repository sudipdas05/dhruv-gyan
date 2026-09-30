
"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToastHost() {
  const [items, setItems] = useState<{ id: number; msg: string }[]>([]);

  useEffect(() => {
    const onToast = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail;
      const id = Date.now() + Math.random();
      setItems((p) => [...p, { id, msg }]);
      setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 3200);
    };
    window.addEventListener("dg:toast", onToast);
    return () => window.removeEventListener("dg:toast", onToast);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[110] flex flex-col gap-2" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className="glass flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm text-primary shadow-xl animate-fadeUp">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          {t.msg}
        </div>
      ))}
    </div>
  );
}
