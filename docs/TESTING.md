# Testing

- Planned unit tests for core engine
- Component tests for UI
- Accessibility tests via jest-axe
- localStorage corruption tests
- Future e2e test
- Target: high coverage on domain engine

## Implemented Domain Tests

- **Score Formula**: Verification of the rule-based math and friction penalty logic.
- **Rank Alternatives**: Ensures filtering of negative savedKg and deterministic sorting.
- **Horizon Projector**: Verifies correct 10-year extrapolation across various frequencies (once, weekly, monthly, yearly).
- **Analogy Mapper**: Validates correct mapping to relatable equivalents based on assumptions.
- **Travel Calculator**: Ensures safe validation on distances, handles NaN/Infinity gracefully, and verifies output structures containing assumptions and rankings.
