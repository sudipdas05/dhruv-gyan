
# DHRUV GYAN — India's Polar Science Knowledge & Outreach Portal

> **SIH Problem 26063** · Ministry of Earth Sciences · National Centre for Polar and Ocean Research
> Software · Smart Education

Named for *Dhruv* — the Pole Star that guides travellers — **DHRUV GYAN** guides learners to the
science of India's frozen frontiers: Antarctica, the Arctic and the Himalayan cryosphere.

A complete Next.js web application that archives expedition reports, scientific datasets,
publications, photographs, videos and institutional activities — while generating
outreach content for websites and social media through a human-approved AI pipeline.

**Runs 100% in Demo Mode with zero configuration.** No API keys, no paid services, no backend required.

---

## Features

| Area | What's included |
|---|---|
| Home | Hero with interactive 3D globe, live expedition stats, featured research, education & media sections |
| Explore | Drag/zoom/auto-rotate 3D globe, clickable station markers (Himadri, Maitri, Bharati + Himalayan sample sites), station research panels, expedition arcs from India |
| Knowledge Repository | Full-text search over 8 fields, 8 content-type tabs, 6 facet filters (year/region/domain/expedition/author/language), 4 sort orders, preview & cite modals, pagination |
| Document pages | `/repository/[id]` — abstract, key points, keywords, APA/IEEE/Plain citations, copy/share, related resources, structured online reader (PDF embed ready) |
| POLAR AI | Source-grounded mock RAG assistant — answers cite repository records, Class-8-style explanations, "Demo AI Mode" label |
| Expeditions | Interactive timeline (1981→2024) + mission archive with objectives, teams, linked reports & publications |
| Smart Education | 8 learning modules (25 lessons) with progressive navigation, key concepts, per-lesson completion, locally persisted progress |
| Quizzes | 30 questions across 4 topics — scoring, correct/incorrect feedback, answer review, retry, attempts persisted |
| Media Hub | DAM-style gallery (photos/videos/infographics/audio/press), metadata, credits, copy-attribution, viewer modal |
| AI Media Studio | One approved record → website article, Instagram caption, X post, press release, newsletter, YouTube description… 4 tones × 3 languages, regenerate, copy, save draft |
| Admin | Role-guarded dashboard, resource CRUD (localStorage-persisted), stat charts, AI content approval pipeline (draft → review → approved → published) |
| News | 10 categorized items with search/filter and detail pages |
| Auth | Demo auth with 4 roles (admin/editor/researcher/student); Supabase Auth drop-in |
| Platform | Dark/light theme, fully responsive (390px→1920px), loading/empty/404 states, SEO metadata + sitemap + robots.txt |

## Tech stack

- **Next.js 15** (App Router) · React 19 · TypeScript
- **Tailwind CSS** · shadcn-style hand-built UI components · Lucide icons
- **Three.js + @react-three/fiber** — procedural globe (no map tokens needed)
- **Supabase** (PostgreSQL + Auth + Storage) — schema in `supabase/migrations/`; optional at runtime
- Requires Node 18.18+ (Node 20+ recommended). Deploys to **Vercel** in one click

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000 — Demo Mode, no env vars needed
npm run build && npm start   # production
```

### Demo credentials

| Account | Role |
|---|---|
| `admin@dhruvgyan.demo` | Administrator |
| `editor@dhruvgyan.demo` | Editor |
| `researcher@dhruvgyan.demo` | Researcher |
| `student@dhruvgyan.demo` | Student |

Any other email signs in as a public user. All data is demonstration/sample data.

## Environment variables

Copy `.env.example` → `.env.local`. **All optional** — the app falls back to demo mode.

```bash
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon key
AI_API_KEY=                      # LLM provider key (mock mode when empty)
NEXT_PUBLIC_MAPBOX_TOKEN=        # optional — the globe is self-hosted Three.js
```

## Supabase setup

1. Create a project at supabase.com.
2. Open the SQL editor, paste `supabase/migrations/0001_init.sql`, run it.
3. Copy the project URL + anon key into `.env.local`.
4. Enable Email auth; map `auth.users` → `profiles` via a trigger (set role in `profiles`).

The schema includes: 11 tables, GIN full-text search (`tsvector`/`tsquery`), `pgvector`
embeddings column + IVFFlat index for RAG, and Row Level Security policies
(public reads published records; editors/admins manage everything).

## Judge demo flow

1. **Home** → watch the globe, note the stats
2. **Explore** → drag globe → click **Bharati** → read research areas → *View Research*
3. **Repository** → search "glaciology" → open the Lambert Basin paper → copy APA citation
4. **POLAR AI** → "Explain Maitri station for a Class 8 student" → check the cited sources
5. **Education** → open a module → complete a lesson → take the Antarctica quiz
6. **Media Studio** (`/studio`) → generate an Instagram caption from the 44th expedition report → Save Draft
7. **Login** as `admin@dhruvgyan.demo` → **Admin → AI Content** → approve & publish the draft; try resource CRUD

## Architecture

```
app/                    # routes (App Router)
  explore/  repository/  ai/  expeditions/  education/  media/  news/
  admin/  studio/  login/
components/
  globe/      # React Three Fiber polar globe
  views/      # one client view per page (server page = metadata + view)
  education/  # quiz engine
  layout/     # navbar, footer, admin shell (auth guard)
  ui/         # button, card, input, modal, tabs, misc, toasts
lib/
  mock-data/  # 23 resources, 5 stations, 8 expeditions, 26 media, 8 modules, 30 quiz Qs, 10 news
  search.ts   # client FTS + facets + ranking
  ai.ts       # mock RAG: retrieval → grounded answer + sources
  studio.ts   # template-based content generation (en/hi/bn)
  store.ts    # demo auth + localStorage state + toasts
  supabase.ts # optional real client
supabase/migrations/    # PostgreSQL schema, FTS, pgvector, RLS
```

Service functions (`askPolarAI`, `searchResources`, `generateContent`, `useLS`, …) are the
single integration seam — swap their internals for Supabase/LLM calls without touching UI.

## Known limitations (demo build)

- Mock AI is keyword retrieval over the sample knowledge base, not a live LLM.
- PDFs are represented by structured records; wire Supabase Storage + `react-pdf` for live viewing.
- Admin media/news reuse public views; dedicated upload UIs come with Storage.
- Demo auth is client-side by design — real deployment uses Supabase Auth + RLS.

## Production next steps

1. Connect Supabase (env vars + migration) and point services at the tables.
2. Replace `lib/ai.ts` internals with a real LLM (embed `resources.embedding`, retrieve, answer with citations).
3. Storage buckets for PDFs/media; add drag-drop upload in admin.
4. Content moderation, audit logs, and CDN caching for media.

---

*Demonstration prototype for Smart India Hackathon. All content is sample data and does not
represent official NCPOR statistics or publications.*
"# dhruv-gyan" 
