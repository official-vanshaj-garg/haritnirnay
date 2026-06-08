/**
 * Transparent rule-based scoring model.
 * This is NOT machine learning and NOT exact carbon accounting.
 *
 * Formula: score = savedKg * feasibility * contextMatch - frictionPenalty
 */
export function calculateScore(
  savedKg: number,
  feasibility: number,
  contextMatch: number,
  frictionPenalty: number
): number {
  return savedKg * feasibility * contextMatch - frictionPenalty;
}
