import { TravelInput, TravelMode } from './travelTypes';

export function getCandidateModes(input: TravelInput): TravelMode[] {
  const allModes: TravelMode[] = ['petrol_car', 'bus', 'train'];

  // Only consider short_flight if distance is large enough (> 300km)
  if (input.distanceKm > 300) {
    allModes.push('short_flight');
  }

  // Do not recommend the same mode
  return allModes.filter((mode) => mode !== input.selectedMode);
}
