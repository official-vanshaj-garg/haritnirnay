# Decisions Log

- **local-first frontend only**: No backend/auth/API keys.
- **carbon decision advisor over calculator**: Proactive advice vs reactive reporting.
- **strict TypeScript and pure domain engine**: Decouples logic from UI.
- **travel decision view model**: Added a UI-specific adapter (`generateTravelViewModel`) to link the pure domain logic (calculators, horizons, analogies) and flatten data for React without leaking logic into the view layer.
- **transparent assumptions**: Users must see the math.
- **no heavy charting libraries**: Keep bundle size small.
- **implemented travel engine first**: Travel decisions are easy to demo, easy to test, and clearly show decision-point framing.
