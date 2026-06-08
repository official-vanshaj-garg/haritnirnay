# HaritNirnay

**Tagline**: Carbon decisions, explained before you act.

## Challenge Context

Built for PromptWars Virtual Challenge 3: "Carbon Footprint Awareness Platform".

## Chosen Interpretation

HaritNirnay is a Context-aware Carbon Decision Advisor. It is NOT a generic carbon calculator. It intercepts everyday choices before they happen and explains the carbon impact.

## Chosen Persona

Urban Indian students/professionals making everyday lifestyle decisions.

## Core Assistant Logic

`context → decision category → candidate options → scoring → ranked alternatives → assumptions → 10-year horizon`

## Planned Features

- Travel, Food, Energy decision flow comparisons.
- Visible math & assumptions.
- Local-first privacy.

## What we deliberately avoid and why

- Post-facto tracking (calculator approach).
- Real-world carbon accounting (too complex, unnecessary for behavioral nudge).
- Backend, auth, API calls (security, performance, complexity).

## Tech Stack

- React
- Vite
- TypeScript
- Zod
- Vitest / Jest-axe

## Setup Commands

\`\`\`bash
npm install
npm run dev
\`\`\`

## Validation Commands

\`\`\`bash
npm run validate
\`\`\`

## Evaluation Metric Checklist

- [ ] Code Quality
- [ ] Security
- [ ] Efficiency
- [ ] Testing
- [ ] Accessibility

## Current Project Status

Foundation scaffold only.

## Final Submission Reminder

Repo must be public, under 10 MB, and use only one branch.
