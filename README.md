# HaritNirnay

**Tagline**: Carbon decisions, explained before you act.

## Challenge Context

Built for PromptWars Virtual Challenge 3: "Carbon Footprint Awareness Platform".

**Live demo**: https://haritnirnay-813432148799.asia-south1.run.app

**Deployment**: Google Cloud Run, serving the static Vite build through Nginx.

## Core Thesis

HaritNirnay is a context-aware carbon decision advisor, not a generic carbon calculator. It does not ask "what did you emit?" It asks "what are you about to choose?" By intercepting everyday choices before they happen, it provides actionable, comparative insights.

## Why Travel-Only?

The current implementation focuses entirely on **Travel**. This is intentional. The Travel flow proves the decision-advisor thesis without introducing horizontal bloat. Focusing on a single domain helped us optimize for code quality, testing, security, efficiency, and accessibility rather than building shallow, bug-prone features across multiple domains.

## Architecture & Posture

HaritNirnay was built with a strict zero-backend and zero-bloat posture:

- **Pure TypeScript Domain Engine**: The core scoring algorithms and carbon calculations (`src/domain`) are decoupled from the UI.
- **Separation of Concerns**: React components act as semantic presentation layers. Business logic is isolated in domain and ViewModel adapters.
- **Strict Validation**: User inputs are guarded by `Zod` schemas before reaching the domain engine.
- **Zero-Backend / No-Network Security**: There is no backend, no database, no authentication, no external APIs, no maps, no LLM calls, and no local storage. This reduces dependency risk, data privacy risk, and network latency.
- **Accessible by Design**: The UI uses semantic HTML5, visible focus states, ARIA live regions for dynamic text, native `<details>` disclosures, and `prefers-reduced-motion` support.

## Sources & Provenance Honesty

We do not overclaim scientific precision. Travel emission factors and analogies are documented in `docs/SOURCES.md`. Current internal estimates are clearly labeled with a **Low** confidence rating. The UI presents these assumptions and limits so users understand the data is for comparative decision-making, not formal carbon accounting.

## Quality Proof

Current validation status:

- **47 tests across 11 files** covering domain logic, view-models, and UI integration.
- **0 vulnerabilities** from `npm audit --omit=dev`.
- **~63 kB gzipped JS bundle**.
- **No backend / no network / no storage**, reducing security and privacy risk.
- **Accessibility checks** using `jest-axe`.
- **Reduced-motion-safe UI** with visible focus states.
- **Security posture**: HaritNirnay runs fully client-side with no backend, no storage, no external APIs, npm audit checks, and CodeQL security analysis through GitHub Actions.

## Tech Stack

- React + Vite
- TypeScript + Zod
- Vitest + Jest-axe
- Vanilla CSS, with no heavy UI frameworks

## Local Development & Validation

```bash
# Start the app locally
npm install
npm run dev

# Run the full validation suite
npm run validate
npm audit --omit=dev
git diff --check
git status --short
```
