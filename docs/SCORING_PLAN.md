# Scoring Plan

This document records how the final submission supports the PromptWars judging metrics.

## Code Quality

- **Implemented**: Strict TypeScript, ESLint, Prettier, domain-first folder separation, ViewModel adapters, and semantic React components.
- **Avoided**: Mixing business logic directly into UI components, broad feature expansion, hidden side effects, and large unnecessary abstractions.

## Security

- **Implemented**: Client-side-only architecture, no backend, no database, no authentication, no API keys, no external runtime APIs, no browser storage for product behavior, no PII collection, no dangerouslySetInnerHTML, npm audit validation, and CodeQL analysis.
- **Avoided**: Storing user data, sending user data over the network, unsafe HTML injection, secret management complexity, and unnecessary infrastructure.

## Efficiency

- **Implemented**: Small static app, minimal dependencies, pure synchronous TypeScript logic, no runtime network latency, no heavy charting libraries, and a small source archive.
- **Avoided**: Backend services, maps, LLM calls, large assets, heavy visualization packages, and unused product domains.

## Testing

- **Implemented**: Vitest, React Testing Library, jest-axe, domain tests, ViewModel tests, UI integration tests, accessibility test, smoke test, and full `npm run validate` gate.
- **Avoided**: Brittle implementation-detail tests and tests that require external services.

## Accessibility

- **Implemented**: Semantic HTML, skip link, accessible labels, keyboard-friendly controls, focus states, live result behavior, readable contrast, and automated axe checks.
- **Avoided**: Color-only meaning, inaccessible custom controls, and visual-only feedback.
