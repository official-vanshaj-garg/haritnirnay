# AI Context

This file records the final project context for HaritNirnay.

## Challenge Rules

- HaritNirnay is built for PromptWars Virtual Challenge 3.
- Repo size must remain under 10 MB.
- The project uses only the `main` branch.
- Evaluation focuses on Code Quality, Security, Efficiency, Testing, and Accessibility.

## Product Thesis

HaritNirnay is a context-aware carbon decision advisor, not a generic carbon calculator.

It does not ask: "What did you emit?"
It asks: "What are you about to choose?"

## Final Implemented Concept

HaritNirnay helps urban Indian students and professionals compare travel choices before acting. It ranks lower-carbon travel alternatives using transparent rule-based logic and explains recommendations through visible assumptions, comparative estimates, and a 10-year impact horizon.

## Final Implemented Scope

- Travel decision flow only.
- Static assumptions and documented emission factors.
- Pure TypeScript decision engine.
- React presentation layer.
- ViewModel adapters between UI and domain logic.
- Decision Receipt 2.0 for final recommendation explanation.
- Accessibility, unit, integration, and smoke tests.

## Explicit Non-Goals

The final submission does not include Food, Energy, AQI, ESG, HR, B2B dashboards, social sharing, QR codes, PDFs, maps, authentication, backend APIs, database storage, browser storage, LLM calls, or runtime network calls.

## Architecture Philosophy

- Pure TypeScript domain logic separated from UI.
- Strict TypeScript.
- Minimal dependencies.
- No heavy charting or visualization libraries.
- No product data persistence.
- No external runtime services.

## Hard Constraints

- No backend.
- No database.
- No API keys.
- No authentication.
- No external APIs.
- No runtime network calls.
- No localStorage or sessionStorage for product behavior.
- No large assets.

## Naming Decision

- Project name: HaritNirnay
- Tagline: Carbon decisions, explained before you act.

## Final Evaluation Goal

The final submission optimizes for a small, honest, maintainable, secure, efficient, tested, and accessible implementation over broad feature expansion.
