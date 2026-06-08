# AI Context

This file ensures future AI assistants understand the complete project context.

## Challenge Rules

- HaritNirnay is built for PromptWars Virtual Challenge 3.
- Repo size must remain under 10 MB.
- Must use only one branch (main).
- Evaluation focuses on Code Quality, Security, Efficiency, Testing, and Accessibility.

## Product Thesis

- HaritNirnay is a context-aware carbon decision advisor, not a generic carbon calculator.
- "HaritNirnay does not ask what did you emit. It asks what are you about to choose."

## Final Concept

A tool that helps urban Indian students and professionals compare everyday choices before acting. It ranks lower-carbon alternatives using transparent scoring and explains recommendations through visible math, assumptions, and a 10-year impact horizon.

## Features

- Context → decision category → candidate options → scoring → ranked alternatives → assumptions → 10-year horizon.
- Must-have planned features: Travel, Food, Energy decision flows.
- Local-first data persistence.

## Architecture Philosophy

- Pure TypeScript engine separated from UI.
- Strict Typescript.
- No heavy libraries (e.g. large charting tools).

## Hard Constraints

- No backend, no database.
- No API keys, no auth, no AI API calls.
- No large assets.

## What NOT to build

- Real-time network calls or backend sync.
- A generic post-facto emissions calculator.

## Naming Decision

- Project name: HaritNirnay
- Tagline: Carbon decisions, explained before you act.

## Evaluation Goals

- Score perfectly on the challenge rubric.

## Next Implementation Phases

See docs/ROADMAP.md.
