
import { Compass } from "lucide-react";
import Link from "next/link";

const COLS = [
  {
    head: "Knowledge",
    links: [
      { href: "/repository", label: "Knowledge Repository" },
      { href: "/expeditions", label: "Expeditions" },
      { href: "/explore", label: "Polar Explorer" },
      { href: "/news", label: "News & Activities" },
    ],
  },
  {
    head: "Learning",
    links: [
      { href: "/education", label: "Polar Learning Hub" },
      { href: "/ai", label: "POLAR AI Assistant" },
      { href: "/media", label: "Media Gallery" },
      { href: "/studio", label: "AI Media Studio" },
    ],
  },
  {
    head: "Institution",
    links: [
      { href: "/admin", label: "Admin Portal" },
      { href: "/login", label: "Login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-polar-950">
              <Compass className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-wide text-primary">DHRUV GYAN</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">NCPOR • MoES</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            India&apos;s Polar Science Knowledge &amp; Outreach Portal. Named for <em className="text-primary">Dhruv</em> — the Pole Star that guides travellers — DHRUV GYAN guides learners to the science of our frozen frontiers.
          </p>
          <p className="mt-4 rounded-lg border border-amber-400/25 bg-amber-400/5 px-3 py-2 text-[11px] leading-relaxed text-amber-200/90">
            Demonstration prototype for Smart India Hackathon (Problem 26063). All content is sample/demo data and does not represent official NCPOR statistics or publications.
          </p>
        </div>
        {COLS.map((c) => (
          <nav key={c.head} aria-label={c.head}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{c.head}</p>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-primary focus-ring rounded">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-[11px] text-muted md:px-6">
          <p>National Centre for Polar and Ocean Research • Ministry of Earth Sciences, Government of India</p>
          <p>SIH 2026 • Software • Smart Education</p>
        </div>
      </div>
    </footer>
  );
}
