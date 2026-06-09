import { z } from 'zod';
import { projectImpact } from '../../domain/engine/horizonProjector';
import { formatApproxKgCO2e } from '../../domain/formatting/carbonFormat';
import { ASSUMPTIONS } from '../../domain/factors/assumptionCatalog';
import { CONFIDENCE_LABELS, SourceConfidence } from '../../domain/provenance';
import { Assumption } from '../../domain/types';
import {
  calculateTravelModeEmissions,
  evaluateTravelDecision,
  getTravelModeLabel,
} from '../../domain/travel/travelCalculator';
import { TravelMode } from '../../domain/travel/travelTypes';
import { travelFormSchema } from './travelFormSchema';
import { TravelFormInput } from './travelFormTypes';

export const CARBON_ACCOUNTING_DISCLAIMER =
  'Order-of-magnitude estimates, not billable carbon accounting.';

export interface TravelFormDraft {
  distanceKm: string;
  passengers: string;
  selectedMode: string;
  region: string;
  priority: string;
}

export const DEFAULT_TRAVEL_FORM_DRAFT: TravelFormDraft = {
  distanceKm: '20',
  passengers: '1',
  selectedMode: 'petrol_car',
  region: 'india',
  priority: 'balanced',
};

export type TravelDraftParseResult =
  | {
      success: true;
      data: TravelFormInput;
      fieldErrors: Partial<Record<keyof TravelFormInput, string>>;
    }
  | {
      success: false;
      fieldErrors: Partial<Record<keyof TravelFormInput, string>>;
    };

export interface GhostAlternativePreview {
  kind: 'alternative' | 'supportive';
  text: string;
}

export interface CarbonReceiptViewModel {
  currentChoiceLabel: string;
  recommendedChoiceLabel: string;
  todayLabel: string;
  todayValue: string;
  horizonLabel: string;
  horizonValue: string;
  confidenceLabel: string;
  disclaimer: string;
}

const travelModeSchema = z.enum(['petrol_car', 'bus', 'train', 'short_flight']);

const confidenceRank: Record<SourceConfidence, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

const ctaLabels: Record<TravelMode, string> = {
  petrol_car: 'Compare my petrol car choice',
  bus: 'Compare my bus choice',
  train: 'Compare my train choice',
  short_flight: 'Compare my flight choice',
};

const travelModeAssumptionIds: Record<TravelMode, string> = {
  petrol_car: 'petrol_car_emissions',
  bus: 'bus_emissions',
  train: 'train_emissions',
  short_flight: 'short_flight_emissions',
};

function parseNumericDraftValue(value: string): number | undefined {
  return value.trim() === '' ? undefined : Number(value);
}

export function getTravelModeAssumption(mode: TravelMode): Assumption {
  return ASSUMPTIONS[travelModeAssumptionIds[mode]];
}

function getLowestConfidence(assumptions: Assumption[]): SourceConfidence {
  return assumptions.reduce<SourceConfidence>((lowest, assumption) => {
    const confidence = assumption.provenance.confidence;
    return confidenceRank[confidence] < confidenceRank[lowest]
      ? confidence
      : lowest;
  }, 'high');
}

export function parseTravelFormDraft(
  draft: TravelFormDraft
): TravelDraftParseResult {
  const result = travelFormSchema.safeParse({
    distanceKm: parseNumericDraftValue(draft.distanceKm),
    passengers: parseNumericDraftValue(draft.passengers),
    selectedMode: draft.selectedMode,
    region: draft.region,
    priority: draft.priority,
  });

  if (result.success) {
    return {
      success: true,
      data: result.data,
      fieldErrors: {},
    };
  }

  const fieldErrors: Partial<Record<keyof TravelFormInput, string>> = {};
  result.error.errors.forEach((err) => {
    const pathKey = err.path[0] as keyof TravelFormInput | undefined;
    if (pathKey) {
      fieldErrors[pathKey] = err.message;
    }
  });

  return {
    success: false,
    fieldErrors,
  };
}

export function buildTravelCtaLabel(selectedMode: string): string {
  const mode = travelModeSchema.safeParse(selectedMode);
  return mode.success ? ctaLabels[mode.data] : 'Compare my options';
}

export function buildGhostAlternativePreview(
  input: TravelFormInput
): GhostAlternativePreview {
  const currentChoiceLabel = getTravelModeLabel(input.selectedMode);
  const [recommended] = evaluateTravelDecision(input).alternatives;

  if (!recommended || recommended.savedKg <= 0) {
    return {
      kind: 'supportive',
      text: `${currentChoiceLabel} already looks like a lower-carbon practical choice for this trip. You can still compare the assumptions before you decide.`,
    };
  }

  return {
    kind: 'alternative',
    text: `Before you choose ${currentChoiceLabel}, ${recommended.label} may save ${formatApproxKgCO2e(recommended.savedKg)} for this trip.`,
  };
}

export function buildCarbonReceiptViewModel(
  input: TravelFormInput,
  alternatives: {
    label: string;
    savedKg: number;
    horizon: { totalSavedKg: number };
    assumptions: Assumption[];
  }[]
): CarbonReceiptViewModel {
  const currentChoiceLabel = getTravelModeLabel(input.selectedMode);
  const [recommended] = alternatives;

  if (!recommended) {
    const currentImpactKg = calculateTravelModeEmissions(
      input.selectedMode,
      input.distanceKm,
      input.passengers
    );
    const horizon = projectImpact(currentImpactKg, 'weekly');
    const confidence = getLowestConfidence([
      getTravelModeAssumption(input.selectedMode),
    ]);

    return {
      currentChoiceLabel,
      recommendedChoiceLabel: currentChoiceLabel,
      todayLabel: "Today's estimated impact",
      todayValue: formatApproxKgCO2e(currentImpactKg),
      horizonLabel: '10-year weekly-repeat impact',
      horizonValue: formatApproxKgCO2e(horizon.totalSavedKg),
      confidenceLabel: CONFIDENCE_LABELS[confidence],
      disclaimer: CARBON_ACCOUNTING_DISCLAIMER,
    };
  }

  const confidence = getLowestConfidence([
    getTravelModeAssumption(input.selectedMode),
    ...recommended.assumptions,
  ]);

  return {
    currentChoiceLabel,
    recommendedChoiceLabel: recommended.label,
    todayLabel: "Today's estimated saving",
    todayValue: formatApproxKgCO2e(recommended.savedKg),
    horizonLabel: '10-year weekly-repeat saving',
    horizonValue: formatApproxKgCO2e(recommended.horizon.totalSavedKg),
    confidenceLabel: CONFIDENCE_LABELS[confidence],
    disclaimer: CARBON_ACCOUNTING_DISCLAIMER,
  };
}
