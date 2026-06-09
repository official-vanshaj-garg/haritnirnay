# Testing

The final submission uses automated tests to protect the decision logic, ViewModel layer, UI flow, accessibility behavior, and production build.

## Validation Command

```bash
npm run validate
```

This runs formatting checks, linting, TypeScript checks, tests, and the production build.

## Implemented Test Coverage

- Domain tests for scoring, ranking, travel calculations, assumptions, provenance, horizon projection, and analogies.
- ViewModel tests for recommendation presentation and Decision Receipt values.
- UI integration tests for the travel decision flow.
- Accessibility test using jest-axe.
- Smoke test to confirm the app renders.

## Current Final Count

- 47 tests across 11 files.

## Testing Philosophy

The project avoids external services, browser storage, backend calls, and network dependencies so tests remain deterministic, fast, and easy to run in CI.
