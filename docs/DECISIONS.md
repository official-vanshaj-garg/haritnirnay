# Decisions Log

- **client-side static app**: No backend, database, authentication, API keys, external runtime APIs, or product data persistence.
- **carbon decision advisor over calculator**: Proactive advice before a user acts, instead of reactive reporting after emissions happen.
- **Travel-only final scope**: The final submission focuses on one vertical to keep the assistant clear, testable, secure, efficient, and accessible.
- **strict TypeScript and pure domain engine**: Decouples recommendation logic from React and keeps the core engine deterministic.
- **travel decision ViewModel**: `generateTravelViewModel` links pure domain logic to React without leaking business logic into presentation components.
- **transparent assumptions**: Users must see the estimates, assumptions, confidence level, and comparison limits.
- **Decision Receipt 2.0**: The final recommendation is presented as a clear, judge-readable receipt with current choice, recommended choice, carbon cut, 10-year impact, and trust copy.
- **no heavy charting libraries**: Keeps bundle size small and runtime behavior fast.
- **no product storage**: User inputs are used in memory for the current calculation only and are not persisted locally or remotely.
