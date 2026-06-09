# Security

HaritNirnay uses a deliberately small attack surface.

## Final Security Posture

- No backend.
- No database.
- No authentication.
- No API keys.
- No PII collection.
- No external runtime API calls.
- No localStorage or sessionStorage for product behavior.
- No dangerouslySetInnerHTML.
- Static assumptions and deterministic client-side logic.
- Zod validation at the input boundary.
- `npm audit --omit=dev` is expected to pass with 0 vulnerabilities.
- CodeQL security analysis runs through GitHub Actions.

## Data Handling

User inputs are used only in memory during the current browser session to calculate the recommendation. The final app does not persist product data locally or remotely.
