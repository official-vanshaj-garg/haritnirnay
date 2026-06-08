import { Recommendation, Assumption } from '../types';

export function buildExplanation(
  id: string,
  label: string,
  category: string,
  co2eKg: number,
  savedKg: number,
  feasibility: number,
  contextMatch: number,
  frictionPenalty: number,
  score: number,
  assumptions: Assumption[]
): Recommendation {
  let reason = `This option saves ${savedKg.toFixed(2)} kg CO2e.`;
  if (frictionPenalty > 0) {
    reason += ` However, it comes with a friction penalty of ${frictionPenalty}.`;
  }

  return {
    id,
    label,
    category,
    co2eKg,
    savedKg,
    feasibility,
    contextMatch,
    frictionPenalty,
    score,
    reason,
    assumptions,
    scoreBreakdown: {
      savedKg,
      feasibility,
      contextMatch,
      frictionPenalty,
    },
  };
}
