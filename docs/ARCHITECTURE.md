# Architecture

## Folder Structure

- `src/domain`: Pure TypeScript decision engine, assumptions, factors, provenance, and travel logic.
- `src/features/travel`: Travel-specific UI flow, ViewModels, form schema, and result presentation.
- `src/components`: Reusable semantic UI components.
- `src/app`: Application shell.
- `src/lib`: Small shared utilities for validation and formatting.
- `src/styles`: Global styles, design tokens, and travel-specific styling.
- `tests`: Domain, ViewModel, UI, accessibility, and smoke tests.

## Domain-First Architecture

The core decision logic lives in pure TypeScript modules that are decoupled from React. This keeps the recommendation logic testable, deterministic, and maintainable.

## UI / Domain Separation

React components are presentation layers. They collect user context, call ViewModel adapters, and render the resulting recommendation, assumptions, comparisons, and Decision Receipt.

## Domain Modules Implemented

- `src/domain/types.ts`: Core data structures and types.
- `src/domain/engine/score.ts`: Transparent scoring algorithm.
- `src/domain/engine/rankAlternatives.ts`: Deterministic ranking and filtering logic.
- `src/domain/engine/horizonProjector.ts`: Projects long-term impact of repeated decisions.
- `src/domain/engine/analogyMapper.ts`: Converts CO2e into relatable equivalents.
- `src/domain/engine/buildExplanation.ts`: Constructs explanation payloads.
- `src/domain/travel/travelCalculator.ts`: Core travel decision evaluation logic.
- `src/domain/travel/travelAlternatives.ts`: Determines candidate travel modes.
- `src/domain/travel/travelTypes.ts`: Travel-specific types.
- `src/domain/factors/emissionFactors.ts`: Static numerical factors.
- `src/domain/factors/assumptionCatalog.ts`: Catalog of transparent assumptions.
- `src/domain/provenance`: Source and assumption metadata.

## Validation Boundary

Zod is used at the form/input boundary before values reach the pure domain engine. The final product does not persist user input in localStorage, sessionStorage, a database, or any backend service.

## Deployment

The app is a static Vite build served through Nginx on Cloud Run. Runtime product behavior remains fully client-side and does not call external APIs.
