# BioMed Trainer

BioMed Trainer is a multilingual mobile study companion for medical and biomedical students, combining concise lessons, visual explanations, interactive practice, and spaced review.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/biomed-trainer run dev` — run the Expo mobile app through the managed mobile preview
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/biomed-trainer/app/` — Expo Router screens for the dashboard, review queue, profile, courses, lessons, and onboarding
- `artifacts/biomed-trainer/context/StudyContext.tsx` — local study progress, language, streak, and onboarding persistence
- `artifacts/biomed-trainer/i18n/locales/` — ru/kk/en interface dictionaries and i18next setup
- `artifacts/biomed-trainer/data/content.ts` — three-language lesson and discipline content model
- `artifacts/biomed-trainer/constants/colors.ts` — BioMed Trainer green visual tokens
- `artifacts/biomed-trainer/assets/images/icon.png` — generated app icon

## Architecture decisions

- The first build is frontend-first and uses AsyncStorage for local progress so the learning flow works without a backend.
- Russian is the deterministic first-launch language; an explicit language selection is persisted locally and applied through i18next on the next launch.
- Educational copy uses `LocalizedText` objects with `ru`, `kk`, and `en` fields so lessons can be fully translated without changing the content model.
- Expo Router tabs separate Home, Review, and Profile while course and lesson screens use stack navigation.
- The demo lesson includes a complete answer-checking loop with feedback and completion persistence.

## Product

- Dashboard with study streak, progress summary, a continue-learning lesson, and all seven planned disciplines.
- Molecular biology course detail and an interactive DNA replication practice lesson.
- Review queue, local progress tracking, language selector for English/Russian/Kazakh, profile and upgrade surfaces, and onboarding.

## User preferences

No additional preferences recorded.

## Gotchas

- Expo preview is managed by the `artifacts/biomed-trainer: expo` workflow; use the workflow rather than starting Expo directly.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

## Web preview

- Public preview: https://biomed-trainer.vercel.app (auto-deployed from `main` via Vercel, config in `vercel.json`)
