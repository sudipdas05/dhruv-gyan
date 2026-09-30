# Fixes applied

## Why it was not working
1. **3D globe crashed the Home and Explore pages** — `PolarGlobe` called `useFrame()` in the component that renders `<Canvas>`. R3F hooks only work *inside* the Canvas, so it threw "Hooks can only be used within the Canvas component". The scene now lives in an inner `<Scene>` component.
2. **`next build` failed on type errors** — `Station`/`Resource` were imported from `@/lib/mock-data` and `SessionUser` from `@/lib/store`, but neither exports them (5 files). Now imported from `@/lib/types`.
3. **`@types/three` was missing** from devDependencies, which fails strict TypeScript. Added.
4. **Supabase migration would not run** — `array_to_string()` is not IMMUTABLE, so the generated `search_vector` column was rejected. Wrapped in an immutable helper; also switched to built-in `gen_random_uuid()`.

## Other bugs fixed
- `useLS` wrote to localStorage and dispatched events inside a React state updater (double-fires in Strict Mode, "update while rendering" warnings). Rewritten with a ref.
- Globe wheel-zoom no longer scrolls the page; the home hero globe no longer hijacks scrolling.
- Admin dashboard "by year" chart was hard-coded to 2021-2024 and skipped 2019 and 2025.
- Education audience filter hid the "Teachers / Public" module; quiz tab now maps all 8 modules to a quiz.
- Admin login redirect now returns to the page you were on; `?next=` is validated (no open redirect).
- Modal header background, footer text and input placeholder used Tailwind classes that do not exist; fixed.
- Undefined `--font-sans` variable removed; light theme no longer keeps the `dark` class.
- POLAR AI answers now render valid `<ul>/<li>` markup.
- `/studio` was unreachable: linked from Footer and Admin sidebar, added to the sitemap (which now includes all detail pages).
- SQL: added RLS policies for all tables and a profile-creation trigger; README counts corrected.

## Not verified
The sandbox had no network, so `npm install` / `npm run build` could not be run here. Run `npm install && npm run build` once on your machine to confirm.

## Security: upgraded to a patched Next.js
`next@14.2.x` is vulnerable to the critical unauthenticated-RCE advisories from Aug 2026 (GHSA-2xp9-vwfh-vxw4 and GHSA-p293-qw3h-jr36) and Vercel has not backported them to 14.x. The fixed lines are **15.5.24** and **16.3.3**, so the project now uses `next@15.5.24`.

What changed to support it:
- `react` / `react-dom` -> 19 (required by Next 15 App Router); `@types/react(-dom)` -> 19.
- `@react-three/fiber` 8 -> 9 (v8 does not work with React 19); `lucide-react` -> 0.468 (adds React 19 peer support).
- `params` in the four `[id]/page.tsx` routes is now an async `Promise` (Next 15 requirement).
- `postcss` -> ^8.5.23 with an `overrides` entry so Next's bundled older copy is replaced.
- `next.config.mjs`: `poweredByHeader: false`; the image optimizer stays disabled (`images.unoptimized`), which removes the AVIF attack surface entirely.
- `tsconfig`: explicit `target: ES2017`; `engines.node >= 18.18`.

Clean install (important, so the old lockfile does not pin Next 14):
    rm -rf node_modules package-lock.json .next
    npm install
    npm audit
    npm run build

- `@supabase/supabase-js` 2.45.1 -> ^2.117.2 (fixes the @supabase/auth-js advisory GHSA-8r88-6cj9-9fh5). Only `createClient` is used, so no code changes.
