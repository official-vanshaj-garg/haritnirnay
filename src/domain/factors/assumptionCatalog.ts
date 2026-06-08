import { Assumption } from '../types';

export const ASSUMPTIONS: Record<string, Assumption> = {
  petrol_car_emissions: {
    id: 'petrol_car_emissions',
    label: 'Petrol Car Emissions',
    value: 0.192,
    unit: 'kg CO2e / km',
    sourceLabel: 'Source to be verified before final README claim.',
    sourceNote: 'Average emissions for a typical petrol car.',
    limitation:
      'Does not account for traffic, car size, or exact fuel efficiency.',
  },
  bus_emissions: {
    id: 'bus_emissions',
    label: 'Local Bus Emissions',
    value: 0.105,
    unit: 'kg CO2e / km / passenger',
    sourceLabel: 'Source to be verified before final README claim.',
    sourceNote: 'Average emissions per passenger for a local bus.',
    limitation: 'Actual emissions depend heavily on bus occupancy.',
  },
  train_emissions: {
    id: 'train_emissions',
    label: 'Train Emissions',
    value: 0.041,
    unit: 'kg CO2e / km / passenger',
    sourceLabel: 'Source to be verified before final README claim.',
    sourceNote: 'National average for passenger trains.',
    limitation: 'Electric vs diesel trains have vastly different profiles.',
  },
  short_flight_emissions: {
    id: 'short_flight_emissions',
    label: 'Short Flight Emissions',
    value: 0.255,
    unit: 'kg CO2e / km / passenger',
    sourceLabel: 'Source to be verified before final README claim.',
    sourceNote: 'Includes high altitude radiative forcing multiplier.',
    limitation:
      'Takeoff and landing phases heavily skew emissions for very short flights.',
  },
  smartphone_charge: {
    id: 'smartphone_charge',
    label: 'Smartphone Charge Emissions',
    value: 0.008,
    unit: 'kg CO2e',
    sourceLabel: 'Source to be verified before final README claim.',
    sourceNote: 'Based on average grid intensity and battery capacity.',
    limitation: 'Grid intensity varies heavily by region and time of day.',
  },
  tree_absorption_year: {
    id: 'tree_absorption_year',
    label: 'Tree Absorption (1 Year)',
    value: 21,
    unit: 'kg CO2e',
    sourceLabel: 'Source to be verified before final README claim.',
    sourceNote: 'Average mature tree CO2 absorption per year.',
    limitation: 'Varies drastically by tree species, age, and climate.',
  },
};
