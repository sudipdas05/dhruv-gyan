
"use client";

import dynamic from "next/dynamic";
import {
  ArrowRight, BookOpen, Bot, Camera, Database, FileText, Flag, GraduationCap,
  Landmark, Mountain, Newspaper, Snowflake, Waves, Wind, Users, type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { Panel, SectionHead, Badge } from "@/components/ui/card";
import { GradientThumb } from "@/components/ui/misc";
import { resources, expeditions, mediaAssets, stations } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

const Globe = dynamic(() => import("@/components/globe/PolarGlobe"), {
  ssr: false,
  loading: () => <div className="h-[380px] md:h-[460px] rounded-3xl skeleton" aria-label="Loading 3D globe" />,
});

const STATS = [
  { label: "Indian Polar Expeditions", value: "44+", icon: Flag },
  { label: "Research Publications", value: "2.8K+", icon: FileText },
  { label: "Scientific Datasets", value: "320+", icon: Database },
  { label: "Media Assets", value: "6.3K+", icon: Camera },
];

const REGIONS = [
  { name: "Arctic", icon: Wind, blurb: "Himadri station, Svalbard — India's window on a rapidly changing Arctic.", color: "from-cyan-400 to-blue-600" },
  { name: "Antarctica", icon: Snowflake, blurb: "Maitri & Bharati stations — 44 expeditions of ice, ocean and sky science.", color: "from-sky-400 to-indigo-600" },
  { name: "Himalayan Research", icon: Mountain, blurb: "The 'third pole' — glacier observatories securing our water future.", color: "from-teal-400 to-cyan-600" },
];

const AUDIENCES = [
  { name: "For Students", icon: GraduationCap, text: "Progressive lessons and quizzes mapped to school science.", href: "/education" },
  { name: "For Teachers", icon: BookOpen, text: "Classroom-ready modules, maps and assessment tools.", href: "/education" },
  { name: "For Researchers", icon: Database, text: "Datasets, publications and citation-ready records.", href: "/repository" },
  { name: "For Public", icon: Users, text: "Stories, media and news from India's polar missions.", href: "/media" },
];

export default function HomeView() {
  const router = useRouter();
  const featured = resources.filter((r) => r.type === "publication").slice(0, 4);
  const latestExpeditions = expeditions.slice(-3).reverse();
  const latestMedia = [...mediaAssets.filter((m) => m.featured), ...mediaAssets]
  .filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
  .slice(0, 4);

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="aurora-bg grid-pattern relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:px-6 lg:grid-cols-2 lg:py-20">
          <div className="animate-fadeUp">
            <Badge className="mb-4 border-cyan-400/40 bg-cyan-500/10 text-accent">
              <Landmark className="h-3 w-3" /> NCPOR • Ministry of Earth Sciences
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-primary md:text-6xl">
              Explore India&apos;s <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Polar Science</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Discover expeditions, scientific research, datasets, photographs, videos and educational resources from India&apos;s polar research ecosystem — one guided portal, from Goa to both poles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => router.push("/repository")}>
                Explore Knowledge <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost" onClick={() => router.push("/ai")}>
                <Bot className="h-4 w-4" /> Ask Polar AI
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <Panel key={s.label} className="p-3.5">
                  <s.icon className="mb-2 h-4 w-4 text-accent" />
                  <dt className="order-2 text-[11px] text-muted">{s.label}</dt>
                  <dd className="text-xl font-bold text-primary">{s.value}</dd>
                </Panel>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="animate-floaty">
              <Globe
                interactive={false}
                onSelectStation={(id) => router.push(`/explore?station=${id}`)}
                className="h-[380px] md:h-[480px]"
              />
            </div>
            <p className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] text-muted">
              Drag to rotate • Stations of the Indian polar programme
            </p>
          </div>
        </div>
      </section>

      {/* ---------- REGIONS ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHead center eyebrow="Polar Regions" title="Explore India's Polar Research" sub="Three frontiers, one integrated programme — follow the arc from the Himalaya to both poles." />
        <div className="grid gap-5 md:grid-cols-3">
          {REGIONS.map((r) => (
            <Link key={r.name} href={`/explore?region=${r.name === "Himalayan Research" ? "Himalaya" : r.name}`} className="group focus-ring rounded-2xl">
              <Panel className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
                <GradientThumb color={r.color} label={r.name} icon={<r.icon className="h-10 w-10" />} className="h-36 w-full" />
                <div className="p-5">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
                    {r.name}
                    <ArrowRight className="h-4 w-4 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.blurb}</p>
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- FEATURED RESEARCH ---------- */}
      <section className="bg-soft border-y border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <SectionHead
            eyebrow="Knowledge Repository"
            title="Featured Research"
            sub="Peer-reviewed science from the Indian Antarctic sector — every record source-linked and citation-ready."
            action={<Link href="/repository" className="text-sm font-semibold text-accent hover:underline focus-ring rounded">View all resources →</Link>}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((r) => (
              <Link key={r.id} href={`/repository/${r.id}`} className="group focus-ring rounded-2xl">
                <Panel className="flex h-full flex-col p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    <Badge className="text-accent border-cyan-400/30">{r.year}</Badge>
                    <Badge>{r.region}</Badge>
                  </div>
                  <h3 className="font-semibold leading-snug text-primary line-clamp-3">{r.title}</h3>
                  <p className="mt-2 text-xs text-muted">{r.authors.join(", ")}</p>
                  <p className="mt-1 text-xs text-accent">{r.domain}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Read paper <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Panel>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EXPEDITIONS ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHead
          eyebrow="Since 1981"
          title="Latest Expeditions"
          sub="From the first voyage aboard M/V Trishna to the 44th mission — follow the journey south."
          action={<Link href="/expeditions" className="text-sm font-semibold text-accent hover:underline focus-ring rounded">Full timeline →</Link>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {latestExpeditions.map((e) => (
            <Link key={e.id} href={`/expeditions/${e.id}`} className="group focus-ring rounded-2xl">
              <Panel className="h-full p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
                <div className="flex items-center justify-between">
                  <Badge className={e.ongoing ? "text-emerald-300 border-emerald-400/40" : ""}>{e.season}</Badge>
                  {e.ongoing && <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300"><span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-400" />Ongoing</span>}
                </div>
                <h3 className="mt-3 font-semibold text-primary">{e.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{e.description}</p>
                <p className="mt-3 text-xs text-accent">{e.teamSize} members · {e.researchAreas.length} disciplines</p>
              </Panel>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- LEARN ---------- */}
      <section className="bg-soft border-y border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <SectionHead center eyebrow="Smart Education" title="Learn Polar Science" sub="Structured, progressive learning for every kind of explorer." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a: { name: string; icon: LucideIcon; text: string; href: string }) => (
              <Link key={a.name} href={a.href} className="group focus-ring rounded-2xl">
                <Panel className="h-full p-5 text-center transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-accent">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-primary">{a.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{a.text}</p>
                </Panel>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MEDIA ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHead
          eyebrow="Media Studio"
          title="Latest Media"
          sub="Photographs, films and infographics from the ice — cleared for outreach."
          action={<Link href="/media" className="text-sm font-semibold text-accent hover:underline focus-ring rounded">Open gallery →</Link>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latestMedia.map((m) => (
            <Link key={m.id} href={`/media?asset=${m.id}`} className="group focus-ring rounded-2xl">
              <Panel className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-1 group-hover:border-cyan-400/40">
                <GradientThumb color={m.color} label={m.title} icon={m.kind === "video" ? <Waves className="h-8 w-8" /> : <Camera className="h-8 w-8" />} className="h-40 w-full" />
                <div className="p-4">
                  <Badge>{m.kind}</Badge>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-primary">{m.title}</h3>
                  <p className="mt-1 text-[11px] text-muted">{m.location}</p>
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- AI CTA ---------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <div className="aurora-bg relative overflow-hidden rounded-3xl border border-line px-6 py-14 text-center md:px-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 text-polar-950">
            <Bot className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-bold text-primary">Ask POLAR AI</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            An assistant grounded in the DHRUV GYAN repository. Ask it to explain expeditions, summarise research for any class level, or point you to sources — every answer cites its records.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => router.push("/ai")}>Start asking <ArrowRight className="h-4 w-4" /></Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/education")}>
              <GraduationCap className="h-4 w-4" /> Try a quiz instead
            </Button>
          </div>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-muted">
            <Newspaper className="h-3.5 w-3.5" /> Demo AI Mode — mock retrieval over the sample knowledge base
          </p>
        </div>
      </section>
    </div>
  );
}
