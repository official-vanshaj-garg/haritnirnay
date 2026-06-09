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

export const CARBON_CUT_TRUST_NOTE =
  'Comparison estimate only. Not carbon accounting.';

export const RECEIPT_TRUST_STRIP = [
  'Local-only',
  'No tracking',
  'Static assumptions',
  'Useful for comparison',
];

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
  carbonCut: CarbonCutViewModel;
  trustStripItems: string[];
}

export interface CarbonCutViewModel {
  status: 'cut' | 'already_recommended';
  summary: string;
  currentImpactLabel: string;
  currentImpactValue: string;
  recommendedImpactLabel: string;
  recommendedImpactValue: string;
  avoidedTodayLabel: string;
  avoidedTodayValue: string;
  avoidedTenYearLabel: string;
  avoidedTenYearValue: string;
  trustNote: string;
  fork: TenYearForkViewModel;
}

export interface TenYearForkViewModel {
  title: string;
  note: string;
  currentPath: DecisionForkPathViewModel;
  recommendedPath: DecisionForkPathViewModel;
}

export interface DecisionForkPathViewModel {
  pathLabel: string;
  choiceLabel: string;
  impactLabel: string;
  impactValue: string;
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
    co2eKg: number;
    savedKg: number;
    horizon: { totalSavedKg: number };
    assumptions: Assumption[];
  }[]
): CarbonReceiptViewModel {
  const currentChoiceLabel = getTravelModeLabel(input.selectedMode);
  const [recommended] = alternatives;
  const currentImpactKg = calculateTravelModeEmissions(
    input.selectedMode,
    input.distanceKm,
    input.passengers
  );
  const currentTenYearImpact = projectImpact(currentImpactKg, 'weekly');

  if (!recommended) {
    const confidence = getLowestConfidence([
      getTravelModeAssumption(input.selectedMode),
    ]);

    return {
      currentChoiceLabel,
      recommendedChoiceLabel: currentChoiceLabel,
      todayLabel: "Today's estimated impact",
      todayValue: formatApproxKgCO2e(currentImpactKg),
      horizonLabel: '10-year weekly-repeat impact',
      horizonValue: formatApproxKgCO2e(currentTenYearImpact.totalSavedKg),
      confidenceLabel: CONFIDENCE_LABELS[confidence],
      disclaimer: CARBON_ACCOUNTING_DISCLAIMER,
      carbonCut: {
        status: 'already_recommended',
        summary: 'You are already near the lower-impact recommendation.',
        currentImpactLabel: 'Current choice carbon',
        currentImpactValue: formatApproxKgCO2e(currentImpactKg),
        recommendedImpactLabel: 'Recommended choice carbon',
        recommendedImpactValue: formatApproxKgCO2e(currentImpactKg),
        avoidedTodayLabel: 'Carbon avoided today',
        avoidedTodayValue: 'No positive avoided carbon identified',
        avoidedTenYearLabel: 'Carbon avoided over 10 years',
        avoidedTenYearValue: 'No positive 10-year avoided carbon identified',
        trustNote: CARBON_CUT_TRUST_NOTE,
        fork: {
          title: '10-Year Fork',
          note: 'Weekly-repeat estimate using the same 10-year horizon assumption.',
          currentPath: {
            pathLabel: 'Keep current choice',
            choiceLabel: currentChoiceLabel,
            impactLabel: '10-year weekly impact',
            impactValue: formatApproxKgCO2e(currentTenYearImpact.totalSavedKg),
          },
          recommendedPath: {
            pathLabel: 'Switch to recommendation',
            choiceLabel: currentChoiceLabel,
            impactLabel: '10-year weekly impact',
            impactValue: formatApproxKgCO2e(currentTenYearImpact.totalSavedKg),
          },
        },
      },
      trustStripItems: RECEIPT_TRUST_STRIP,
    };
  }

  const confidence = getLowestConfidence([
    getTravelModeAssumption(input.selectedMode),
    ...recommended.assumptions,
  ]);
  const recommendedTenYearImpact = projectImpact(recommended.co2eKg, 'weekly');

  return {
    currentChoiceLabel,
    recommendedChoiceLabel: recommended.label,
    todayLabel: "Today's estimated saving",
    todayValue: formatApproxKgCO2e(recommended.savedKg),
    horizonLabel: '10-year weekly-repeat saving',
    horizonValue: formatApproxKgCO2e(recommended.horizon.totalSavedKg),
    confidenceLabel: CONFIDENCE_LABELS[confidence],
    disclaimer: CARBON_ACCOUNTING_DISCLAIMER,
    carbonCut: {
      status: 'cut',
      summary: `Before you choose ${currentChoiceLabel}, switching to ${recommended.label} avoids ${formatApproxKgCO2e(recommended.savedKg)} today.`,
      currentImpactLabel: 'Current choice carbon',
      currentImpactValue: formatApproxKgCO2e(currentImpactKg),
      recommendedImpactLabel: 'Recommended choice carbon',
      recommendedImpactValue: formatApproxKgCO2e(recommended.co2eKg),
      avoidedTodayLabel: 'Carbon avoided today',
      avoidedTodayValue: formatApproxKgCO2e(recommended.savedKg),
      avoidedTenYearLabel: 'Carbon avoided over 10 years',
      avoidedTenYearValue: formatApproxKgCO2e(recommended.horizon.totalSavedKg),
      trustNote: CARBON_CUT_TRUST_NOTE,
      fork: {
        title: '10-Year Fork',
        note: 'Weekly-repeat estimate using the same 10-year horizon assumption.',
        currentPath: {
          pathLabel: 'Keep current choice',
          choiceLabel: currentChoiceLabel,
          impactLabel: '10-year weekly impact',
          impactValue: formatApproxKgCO2e(currentTenYearImpact.totalSavedKg),
        },
        recommendedPath: {
          pathLabel: 'Switch to recommendation',
          choiceLabel: recommended.label,
          impactLabel: '10-year weekly impact',
          impactValue: formatApproxKgCO2e(
            recommendedTenYearImpact.totalSavedKg
          ),
        },
      },
    },
    trustStripItems: RECEIPT_TRUST_STRIP,
  };
}
