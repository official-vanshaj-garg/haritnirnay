import { TravelFormInput } from './travelFormTypes';
import { evaluateTravelDecision } from '../../domain/travel/travelCalculator';
import { projectImpact } from '../../domain/engine/horizonProjector';
import {
  Recommendation,
  Assumption,
  HorizonProjection,
} from '../../domain/types';

export interface UIRecommendation extends Recommendation {
  horizon: HorizonProjection;
}

export interface TravelDecisionResult {
  alternatives: UIRecommendation[];
  allAssumptions: Assumption[];
}

export function generateTravelViewModel(
  input: TravelFormInput
): TravelDecisionResult {
  const { alternatives } = evaluateTravelDecision(input);

  const uiAlternatives = alternatives.map((alt) => {
    // UI assumes this decision repeats weekly to provide the horizon
    const horizon = projectImpact(alt.savedKg, 'weekly');
    return { ...alt, horizon };
  });

  // Extract all unique assumptions
  const assumptionsMap = new Map<string, Assumption>();
  uiAlternatives.forEach((alt) => {
    alt.assumptions.forEach((a) => assumptionsMap.set(a.id, a));
    alt.horizon.analogies.forEach((analogy) =>
      assumptionsMap.set(analogy.assumption.id, analogy.assumption)
    );
  });

  return {
    alternatives: uiAlternatives,
    allAssumptions: Array.from(assumptionsMap.values()),
  };
}
