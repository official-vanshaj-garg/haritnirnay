import { Assumption } from '../types';
import { provenanceSchema } from '../provenance';

const INTERNAL_ESTIMATE_PROVENANCE = provenanceSchema.parse({
  sourceLabel: 'Internal estimate',
  notes: 'Needs verification before use as formal carbon accounting.',
  confidence: 'low',
});

export const ASSUMPTIONS: Record<string, Assumption> = {
  petrol_car_emissions: {
    id: 'petrol_car_emissions',
    label: 'Petrol Car Emissions',
    value: 0.192,
    unit: 'kg CO2e / km',
    sourceNote: 'Order-of-magnitude estimate for a typical petrol car.',
    limitation:
      'Does not account for traffic, car size, or exact fuel efficiency.',
    provenance: INTERNAL_ESTIMATE_PROVENANCE,
  },
  bus_emissions: {
    id: 'bus_emissions',
    label: 'Local Bus Emissions',
    value: 0.105,
    unit: 'kg CO2e / km / passenger',
    sourceNote: 'Order-of-magnitude estimate per passenger for a local bus.',
    limitation: 'Actual emissions depend heavily on bus occupancy.',
    provenance: INTERNAL_ESTIMATE_PROVENANCE,
  },
  train_emissions: {
    id: 'train_emissions',
    label: 'Train Emissions',
    value: 0.041,
    unit: 'kg CO2e / km / passenger',
    sourceNote: 'Order-of-magnitude estimate for passenger train travel.',
    limitation: 'Electric vs diesel trains have vastly different profiles.',
    provenance: INTERNAL_ESTIMATE_PROVENANCE,
  },
  short_flight_emissions: {
    id: 'short_flight_emissions',
    label: 'Short Flight Emissions',
    value: 0.255,
    unit: 'kg CO2e / km / passenger',
    sourceNote:
      'Order-of-magnitude estimate for short passenger flights; not route-specific.',
    limitation:
      'Takeoff and landing phases heavily skew emissions for very short flights.',
    provenance: INTERNAL_ESTIMATE_PROVENANCE,
  },
  smartphone_charge: {
    id: 'smartphone_charge',
    label: 'Smartphone Charge Emissions',
    value: 0.008,
    unit: 'kg CO2e',
    sourceNote:
      'Order-of-magnitude scale reference based on battery capacity and grid intensity.',
    limitation: 'Grid intensity varies heavily by region and time of day.',
    provenance: INTERNAL_ESTIMATE_PROVENANCE,
  },
  tree_absorption_year: {
    id: 'tree_absorption_year',
    label: 'Tree Absorption (1 Year)',
    value: 21,
    unit: 'kg CO2e',
    sourceNote:
      'Order-of-magnitude scale reference for annual tree absorption.',
    limitation: 'Varies drastically by tree species, age, and climate.',
    provenance: INTERNAL_ESTIMATE_PROVENANCE,
  },
};
