<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FitLog

Single Next.js 16 (App Router) app — no workspaces, no packages. `src/` holds everything; path alias `@/*` maps to `./src/*`.

## Commands

- `npm run dev` — dev server (also re-writes the block above; commit it)
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`)
- `npm run build` — **this is the typecheck**; there is no `tsc --noEmit` or `typecheck` script
- No test framework, scripts, or fixtures exist. Verification order: `npm run lint` → `npm run build`.

## Data & state (the non-obvious parts)

- All workout data comes from one external API: `https://api.abcz.workers.dev/api/fitlog` (list + `/[id]`). There are no local fixtures. Fetches use `cache: "no-store"`; on failure `getWorkoutById` returns `null` (detail page 404s via `notFound()`) and the library returns `[]`.
- User state lives in `src/context/PlanContext.tsx`, mounted in the root layout. It persists to localStorage keys `fitlog-plan`, `fitlog-saved`, `fitlog-completed` and is hydrated in a `useEffect` (server renders empty lists — don't read plan state during SSR). Business rules live here too: plan capped at 5, no duplicates, toasts via `react-hot-toast`.
- Workout list/detail pages split server fetch + client interactivity: `LibrarySection.tsx` (server component, re-exported by `/workouts`) and `WorkoutDetailsClient.tsx`.

## Toolchain quirks

- Next.js 16.3 + React 19 with `reactCompiler: true` (babel-plugin-react-compiler) in `next.config.ts`.
- Tailwind CSS 4 is configured in CSS only (`src/app/globals.css` has `@import "tailwindcss"` + `@plugin "daisyui"`); there is no `tailwind.config`. Use Tailwind v4 syntax (e.g. `font-(family-name:--font-bebas)`).
- `images.remotePatterns` allows any https host, so new image domains need no config change.
- Deployed on Vercel (`vercel.json` pins `npm install` / `npm run build`).
- `CLAUDE.md` is just `@AGENTS.md` — keep guidance here in one file.
