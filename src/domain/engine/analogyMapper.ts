import { Analogy } from '../types';
import { ASSUMPTIONS } from '../factors/assumptionCatalog';

/**
 * Converts kg CO2e into relatable equivalents using static assumptions.
 */
export function generateAnalogies(kgCO2e: number): Analogy[] {
  if (kgCO2e <= 0 || isNaN(kgCO2e) || !isFinite(kgCO2e)) return [];

  const analogies: Analogy[] = [];

  // Petrol car km
  analogies.push({
    id: 'analogy_petrol_km',
    label: 'Km driven in a petrol car',
    equivalentValue: kgCO2e / ASSUMPTIONS.petrol_car_emissions.value,
    unit: 'km',
    assumption: ASSUMPTIONS.petrol_car_emissions,
    provenance: ASSUMPTIONS.petrol_car_emissions.provenance,
  });

  // Smartphone charges
  analogies.push({
    id: 'analogy_smartphone',
    label: 'Smartphone charges',
    equivalentValue: kgCO2e / ASSUMPTIONS.smartphone_charge.value,
    unit: 'charges',
    assumption: ASSUMPTIONS.smartphone_charge,
    provenance: ASSUMPTIONS.smartphone_charge.provenance,
  });

  // Tree years
  analogies.push({
    id: 'analogy_tree',
    label: 'Years of tree absorption',
    equivalentValue: kgCO2e / ASSUMPTIONS.tree_absorption_year.value,
    unit: 'years',
    assumption: ASSUMPTIONS.tree_absorption_year,
    provenance: ASSUMPTIONS.tree_absorption_year.provenance,
  });

  return analogies;
}
