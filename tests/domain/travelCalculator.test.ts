import { describe, it, expect } from 'vitest';
import { evaluateTravelDecision } from '../../src/domain/travel/travelCalculator';
import { TravelInput } from '../../src/domain/travel/travelTypes';

describe('travelCalculator', () => {
  const baseInput: TravelInput = {
    distanceKm: 20,
    passengers: 1,
    selectedMode: 'petrol_car',
    region: 'india',
    priority: 'balanced'
  };

  it('throws on zero or negative distance', () => {
    expect(() => evaluateTravelDecision({ ...baseInput, distanceKm: 0 })).toThrowError(RangeError);
    expect(() => evaluateTravelDecision({ ...baseInput, distanceKm: -5 })).toThrowError(RangeError);
    expect(() => evaluateTravelDecision({ ...baseInput, distanceKm: NaN })).toThrowError(RangeError);
    expect(() => evaluateTravelDecision({ ...baseInput, distanceKm: Infinity })).toThrowError(RangeError);
  });

  it('returns safe results without NaN or Infinity', () => {
    const result = evaluateTravelDecision(baseInput);
    result.alternatives.forEach(alt => {
      expect(Number.isFinite(alt.score)).toBe(true);
      expect(Number.isFinite(alt.co2eKg)).toBe(true);
      expect(Number.isFinite(alt.savedKg)).toBe(true);
    });
  });

  it('ranks alternatives by final transparent score', () => {
    // Train vs Bus for carbon priority, both have high context. Train saves more, but feasibility/friction might override.
    const result = evaluateTravelDecision({
      ...baseInput,
      priority: 'carbon',
      distanceKm: 50
    });
    
    // Ranked correctly by score descending
    expect(result.alternatives.length).toBeGreaterThan(0);
    expect(result.alternatives[0].score).toBeGreaterThanOrEqual(result.alternatives[result.alternatives.length - 1].score);
  });

  it('every ranked alternative has assumptions', () => {
    const result = evaluateTravelDecision(baseInput);
    expect(result.alternatives.length).toBeGreaterThan(0);
    result.alternatives.forEach(alt => {
      expect(alt.assumptions.length).toBeGreaterThan(0);
      expect(alt.assumptions[0].id).toBeDefined();
    });
  });

  it('same travel input returns same output', () => {
    const result1 = evaluateTravelDecision(baseInput);
    const result2 = evaluateTravelDecision(baseInput);
    expect(result1.alternatives[0].id).toBe(result2.alternatives[0].id);
  });
});
