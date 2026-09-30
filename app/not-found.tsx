
import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="aurora-bg flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-polar-950">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="text-3xl font-bold text-primary">Lost on the ice</h1>
      <p className="max-w-md text-sm text-muted">
        This page drifted off the map. The route you requested does not exist in DHRUV GYAN.
      </p>
      <Link href="/" className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-polar-950 hover:bg-cyan-400 focus-ring">
        Return to base camp
      </Link>
    </div>
  );
}
