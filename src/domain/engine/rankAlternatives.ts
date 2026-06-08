import { Recommendation } from '../types';

/**
 * Ranks alternatives based on score.
 * Filters out negative savedKg unless explicitly requested (currently filters all negative).
 * This is deterministic.
 */
export function rankAlternatives(
  alternatives: Recommendation[]
): Recommendation[] {
  return alternatives
    .filter((alt) => alt.savedKg >= 0)
    .sort((a, b) => {
      if (b.score === a.score) {
        // Fallback to savedKg for deterministic tie breaking
        return b.savedKg - a.savedKg;
      }
      return b.score - a.score;
    });
}
