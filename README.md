# React Basics Tutorial

This repository defines a documentation-first, bilingual learning application for developers moving from languages such as Python, Java, or C# into JavaScript, TypeScript, and React.

## Current status

The project currently contains product requirements and shared agent instructions only. A Vite application and lesson code have intentionally not been scaffolded: the tutorial will be built through small, guided learning steps rather than generated all at once.

## Planned learning experience

The future application will grow alongside the learner. A single-page React lesson navigator will use concept buttons to open lessons, while lesson text is shown side by side in Romanian and English. Each lesson will combine a focused explanation, concise example, small exercise, hint, and an optional solution.

Learners will be able to mark lessons complete. Progress will be stored locally in the browser with `localStorage`; the first version has no accounts, backend, or cloud sync.

The curriculum covers JavaScript for React, TypeScript, JSX, components, props, state, events, rendering, forms, effects, data fetching, composition, context, custom hooks, routing, testing, accessibility, performance, authentication concepts, and deployment.

## Planned technology

- Vite, React, and TypeScript
- CSS Modules and CSS custom properties
- React state for the initial lesson navigator
- Component and behaviour tests as the tutorial grows

## Repository layout

- `docs/requirements.md` — product requirements in Romanian.
- `CODEX.md` — canonical shared instructions for coding agents, in English.
- `.github/copilot-instructions.md` — generated Copilot instructions; do not edit directly.
- `scripts/sync-instructions.sh` — POSIX synchronization and validation script.

## Synchronize agent instructions

Run these commands from Git Bash or WSL at the repository root:

```sh
sh scripts/sync-instructions.sh
sh scripts/sync-instructions.sh --check
```

Edit `CODEX.md` when the shared instructions need to change, then run the synchronization command. The `--check` command does not modify files and exits with a non-zero status if the generated Copilot file is missing or out of date.
