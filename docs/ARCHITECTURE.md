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

## Planned Modules

- `travelCalculator`
- `foodCalculator`
- `energyCalculator`
- `rankAlternatives`
- `score`
- `horizonProjector`
- `analogyMapper`

## Validation and Storage Boundaries

Zod is used at the boundary to validate LocalStorage data and any external inputs before they reach the pure domain engine.
