import { HorizonProjection } from '../types';
import { generateAnalogies } from './analogyMapper';

export type Frequency = 'once' | 'weekly' | 'monthly' | 'yearly';

/**
 * Projects the total impact over a 10-year horizon.
 */
export function projectImpact(
  savedKgPerEvent: number,
  frequency: Frequency
): HorizonProjection {
  let multiplier = 1;
  const years = 10;

  switch (frequency) {
    case 'weekly':
      multiplier = 52 * years;
      break;
    case 'monthly':
      multiplier = 12 * years;
      break;
    case 'yearly':
      multiplier = years;
      break;
    case 'once':
    default:
      multiplier = 1;
  }

  const totalSavedKg = savedKgPerEvent * multiplier;

  return {
    totalSavedKg,
    analogies: generateAnalogies(totalSavedKg),
  };
}
