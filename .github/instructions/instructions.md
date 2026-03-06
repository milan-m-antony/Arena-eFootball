---
description: FOODBALL project-specific coding context and implementation rules.
applyTo: "src/**/*.{ts,tsx,js,jsx,css}"
---

# FOODBALL Project Context

## Actual Stack (Current Repo)
- Framework: Next.js App Router (`src/app`)
- UI: React 19 + TypeScript (strict)
- Styling: Tailwind CSS v4 + custom theme tokens in `src/app/globals.css`
- Package manager/scripts: npm (`dev`, `build`, `lint`)

## Key Architecture
- Root layout + provider wiring: `src/app/layout.tsx`
- Theme state and toggling: `src/context/ThemeContext.tsx`
- Shared cinematic shell: `src/components/layout/CinematicWrapper.tsx`
- Shared UI primitives: `src/components/ui/*`

## Theme and UI Guardrails
- Preserve dual themes: `miles` and `peter`.
- Reuse existing classes/tokens (`accent-pink`, `accent-red`, `glass-panel`, `shadow-glow-*`).
- Do not introduce a new design system or unrelated visual patterns.
- Keep cinematic style and spacing behavior consistent.

## Implementation Rules
- Use `@/*` imports from `tsconfig` path aliases.
- Avoid `any`; use precise TS types/unions.
- Use existing components/hooks/utils before creating new ones.
- Keep edits scoped; do not refactor unrelated modules.
- Keep all pages frontend-only and static/demo-friendly.

## Completion Checklist
- Run `npm run build` when code changes affect types/runtime.
- Run `npm run lint` and ensure no lint errors.
- Mention remaining warnings explicitly if present.

## Priority
- If a rule here conflicts with `.github/copilot-instructions.md`, follow `.github/copilot-instructions.md`.