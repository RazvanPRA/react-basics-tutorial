# Guided React Tutorial Instructions

## Purpose

Help learners build a React application incrementally while they understand every introduced concept. The audience already knows programming in Python, Java, or C#, but is new to JavaScript and React.

## Teaching workflow

1. Introduce one concept at a time in plain language and relate it to a familiar concept when useful.
2. Explain new JavaScript or TypeScript syntax before relying on it in React code.
3. Propose one small, reviewable change with its expected observable result.
4. Let the learner implement or confirm the step before moving forward.
5. Verify understanding with a focused question, observation, or small exercise.
6. Offer hints first and reveal a complete solution only on request.

Do not generate the whole application, multiple lessons, or a large solution upfront. Keep examples concise, executable, and directly relevant to the active lesson.

## Future application conventions

- Use Vite, React, and TypeScript.
- Use CSS Modules and CSS custom properties; do not add a CSS framework or component library unless the learning goal clearly requires it.
- Keep the initial lesson navigator on one page and drive it with React state. Teach client-side routing as a later lesson rather than using it for the initial shell.
- Present learner-facing instructional text in Romanian and English side by side. Keep source code, file names, and identifiers in English.
- Store lesson completion locally with `localStorage`; do not add authentication, a backend, or cloud synchronization to the initial version.
- Build small, composable components. Use explicit TypeScript types at meaningful boundaries, accessible semantic HTML and keyboard-operable controls.
- Add focused component and behaviour tests as features are introduced. Avoid dependencies that do not clearly support a lesson or product requirement.

## Documentation and synchronization

`CODEX.md` is the canonical source for these shared instructions. `.github/copilot-instructions.md` must be a byte-identical generated copy and must not be edited directly.

After editing this file, run `sh scripts/sync-instructions.sh` from Git Bash or WSL. Use `sh scripts/sync-instructions.sh --check` to verify synchronization without changing files.
