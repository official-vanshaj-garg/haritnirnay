# Scoring Plan

## Code Quality

- **Check**: Readability, folder structure, linting.
- **Implement**: Strict TS, ESLint, Prettier, domain-first folder separation.
- **Avoid**: Spaghetti code, mixing logic with UI.

## Security

- **Check**: XSS vulnerabilities, leaky dependencies.
- **Implement**: Zod validation, no dangerouslySetInnerHTML, local-only storage.
- **Avoid**: API calls, storing PII.

## Efficiency

- **Check**: Bundle size, runtime performance.
- **Implement**: Minimal dependencies, pure TS logic.
- **Avoid**: Heavy charting libs, unused imports.

## Testing

- **Check**: Test coverage, smoke tests.
- **Implement**: Vitest + React Testing Library (Unit, component, a11y).
- **Avoid**: Brittle tests, testing implementation details.

## Accessibility

- **Check**: WCAG compliance.
- **Implement**: Semantic HTML, skip links, aria-live, axe testing.
- **Avoid**: Color-only meaning, missing focus states.
