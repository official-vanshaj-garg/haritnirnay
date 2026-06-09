import { Provenance } from '../provenance';
import { TravelMode } from '../travel/travelTypes';
import { ASSUMPTIONS } from './assumptionCatalog';

export interface EmissionFactor {
  value: number;
  unit: string;
  assumptionId: string;
  provenance: Provenance;
}

export const EMISSION_FACTORS: {
  travel: Record<TravelMode, EmissionFactor>;
} = {
  travel: {
    petrol_car: {
      value: ASSUMPTIONS.petrol_car_emissions.value,
      unit: ASSUMPTIONS.petrol_car_emissions.unit,
      assumptionId: ASSUMPTIONS.petrol_car_emissions.id,
      provenance: ASSUMPTIONS.petrol_car_emissions.provenance,
    },
    bus: {
      value: ASSUMPTIONS.bus_emissions.value,
      unit: ASSUMPTIONS.bus_emissions.unit,
      assumptionId: ASSUMPTIONS.bus_emissions.id,
      provenance: ASSUMPTIONS.bus_emissions.provenance,
    },
    train: {
      value: ASSUMPTIONS.train_emissions.value,
      unit: ASSUMPTIONS.train_emissions.unit,
      assumptionId: ASSUMPTIONS.train_emissions.id,
      provenance: ASSUMPTIONS.train_emissions.provenance,
    },
    short_flight: {
      value: ASSUMPTIONS.short_flight_emissions.value,
      unit: ASSUMPTIONS.short_flight_emissions.unit,
      assumptionId: ASSUMPTIONS.short_flight_emissions.id,
      provenance: ASSUMPTIONS.short_flight_emissions.provenance,
    },
  },
};

export const TRAVEL_EMISSION_FACTORS = EMISSION_FACTORS.travel;
