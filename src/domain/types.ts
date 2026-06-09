import { Provenance } from './provenance';

export type FeasibilityScore = number; // 0 to 1
export type ContextMatchScore = number; // 0 to 1
export type FrictionPenalty = number; // 0+

export interface Assumption {
  id: string;
  label: string;
  value: number;
  unit: string;
  sourceNote: string;
  limitation: string;
  provenance: Provenance;
}

export interface Recommendation {
  id: string;
  label: string;
  category: string;
  co2eKg: number;
  savedKg: number;
  feasibility: FeasibilityScore;
  contextMatch: ContextMatchScore;
  frictionPenalty: FrictionPenalty;
  score: number;
  reason: string;
  assumptions: Assumption[];
  scoreBreakdown: {
    savedKg: number;
    feasibility: number;
    contextMatch: number;
    frictionPenalty: number;
  };
}

export interface Analogy {
  id: string;
  label: string;
  equivalentValue: number;
  unit: string;
  assumption: Assumption;
  provenance: Provenance;
}

export interface HorizonProjection {
  totalSavedKg: number;
  analogies: Analogy[];
}
