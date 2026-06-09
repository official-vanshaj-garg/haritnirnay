import { TravelInput, TravelMode } from './travelTypes';
import { Recommendation } from '../types';
import { EMISSION_FACTORS } from '../factors/emissionFactors';
import { ASSUMPTIONS } from '../factors/assumptionCatalog';
import { getCandidateModes } from './travelAlternatives';
import { calculateScore } from '../engine/score';
import { buildExplanation } from '../engine/buildExplanation';
import { rankAlternatives } from '../engine/rankAlternatives';

function getEmissions(
  mode: TravelMode,
  distanceKm: number,
  passengers: number
): number {
  if (mode === 'petrol_car') {
    // Car emissions are per vehicle, usually divided by passengers
    return (EMISSION_FACTORS.travel[mode].value * distanceKm) / passengers;
  }
  // Public transport emissions are per passenger
  return EMISSION_FACTORS.travel[mode].value * distanceKm;
}

function getFeasibility(mode: TravelMode, input: TravelInput): number {
  // Simple heuristic
  if (mode === 'train' && input.distanceKm < 5) return 0.2; // Unlikely for very short distance
  if (mode === 'bus') return 0.8;
  if (mode === 'petrol_car') return 0.9;
  if (mode === 'short_flight') return input.distanceKm > 300 ? 0.8 : 0.1;
  return 0.5;
}

function getContextMatch(mode: TravelMode, input: TravelInput): number {
  if (input.priority === 'time_sensitive') {
    if (mode === 'short_flight') return 0.9;
    if (mode === 'train' || mode === 'petrol_car') return 0.7;
    return 0.3; // bus is slow
  }
  if (input.priority === 'carbon') {
    if (mode === 'train') return 1.0;
    if (mode === 'bus') return 0.9;
    if (mode === 'short_flight') return 0.1;
    return 0.2;
  }
  return 0.7; // balanced
}

function getFriction(mode: TravelMode, input: TravelInput): number {
  let penalty = 0;
  if (mode === 'bus' && input.distanceKm > 100) penalty += 2; // Long bus rides are high friction
  if (mode === 'train') penalty += 1; // Needs booking/scheduling
  if (mode === 'short_flight') penalty += 3; // Airport security, travel to airport
  return penalty;
}

function getModeLabel(mode: TravelMode): string {
  switch (mode) {
    case 'petrol_car':
      return 'Petrol Car';
    case 'bus':
      return 'Local Bus';
    case 'train':
      return 'Train';
    case 'short_flight':
      return 'Short Flight';
  }
}

export function evaluateTravelDecision(input: TravelInput): {
  alternatives: Recommendation[];
} {
  if (
    input.distanceKm <= 0 ||
    isNaN(input.distanceKm) ||
    !isFinite(input.distanceKm)
  ) {
    throw new RangeError(
      'Validation failure: Distance must be a finite positive number.'
    );
  }
  if (
    input.passengers < 1 ||
    isNaN(input.passengers) ||
    !isFinite(input.passengers)
  ) {
    throw new RangeError(
      'Validation failure: Passengers must be a finite positive number.'
    );
  }

  const baselineEmissions = getEmissions(
    input.selectedMode,
    input.distanceKm,
    input.passengers
  );
  const candidates = getCandidateModes(input);

  const rawRecommendations = candidates.map((mode) => {
    const emissions = getEmissions(mode, input.distanceKm, input.passengers);
    const savedKg = baselineEmissions - emissions;

    const feasibility = getFeasibility(mode, input);
    const contextMatch = getContextMatch(mode, input);
    const frictionPenalty = getFriction(mode, input);

    const score = calculateScore(
      savedKg,
      feasibility,
      contextMatch,
      frictionPenalty
    );

    const assumptions = [
      ASSUMPTIONS[`${mode}_emissions`] || ASSUMPTIONS.petrol_car_emissions,
      ASSUMPTIONS[`${input.selectedMode}_emissions`] ||
        ASSUMPTIONS.petrol_car_emissions,
    ];
    // Remove duplicates safely
    const uniqueAssumptions = Array.from(
      new Set(assumptions.map((a) => a.id))
    ).map((id) => assumptions.find((a) => a.id === id)!);

    return buildExplanation(
      `travel_${mode}`,
      getModeLabel(mode),
      'travel',
      emissions,
      savedKg,
      feasibility,
      contextMatch,
      frictionPenalty,
      score,
      uniqueAssumptions
    );
  });

  return {
    alternatives: rankAlternatives(rawRecommendations),
  };
}
