# Architecture

## Folder Structure

- `src/domain`: Core typescript engine.
- `src/components`: Reusable UI components.
- `src/app`: Application shell and views.
- `src/lib`: Utilities (validation, storage, formatting).

## Domain-First Architecture

The logic lives in a pure TypeScript engine, totally decoupled from React components.

## UI / Domain Separation

React is strictly a view layer. It calls the engine for scoring and ranking.

## Domain Modules Implemented

- `src/domain/types.ts`: Core data structures and types.
- `src/domain/engine/score.ts`: Transparent scoring algorithm.
- `src/domain/engine/rankAlternatives.ts`: Deterministic ranking and filtering logic.
- `src/domain/engine/horizonProjector.ts`: Projects 10-year impact of decisions.
- `src/domain/engine/analogyMapper.ts`: Converts CO2e into relatable equivalents.
- `src/domain/engine/buildExplanation.ts`: Constructs the explanation payloads.
- `src/domain/travel/travelCalculator.ts`: Core travel decision evaluation logic.
- `src/domain/travel/travelAlternatives.ts`: Determines candidate modes.
- `src/domain/travel/travelTypes.ts`: Specific types for the travel domain.
- `src/domain/factors/emissionFactors.ts`: Static numerical factors.
- `src/domain/factors/assumptionCatalog.ts`: Catalog of transparent assumptions.

## Validation and Storage Boundaries

Zod is used at the boundary to validate LocalStorage data and any external inputs before they reach the pure domain engine.
