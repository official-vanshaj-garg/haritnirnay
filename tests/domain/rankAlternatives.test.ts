import { describe, it, expect } from 'vitest';
import { rankAlternatives } from '../../src/domain/engine/rankAlternatives';
import { Recommendation } from '../../src/domain/types';

describe('rankAlternatives', () => {
  const baseRec: Recommendation = {
    id: '0',
    label: 'Base',
    category: 'travel',
    co2eKg: 0,
    savedKg: 0,
    feasibility: 1,
    contextMatch: 1,
    frictionPenalty: 0,
    score: 0,
    reason: '',
    assumptions: [],
    scoreBreakdown: { savedKg: 0, feasibility: 1, contextMatch: 1, frictionPenalty: 0 }
  };

  it('filters out negative savedKg', () => {
    const input: Recommendation[] = [
      { ...baseRec, id: '1', label: 'Good', savedKg: 10, score: 10 },
      { ...baseRec, id: '2', label: 'Bad', savedKg: -5, score: -5 },
    ];
    const ranked = rankAlternatives(input);
    expect(ranked).toHaveLength(1);
    expect(ranked[0].id).toBe('1');
  });

  it('ranks by score descending (higher savedKg ranks higher if others equal)', () => {
    const input: Recommendation[] = [
      { ...baseRec, id: '1', label: 'Low', savedKg: 5, score: 5 },
      { ...baseRec, id: '2', label: 'High', savedKg: 20, score: 20 },
    ];
    const ranked = rankAlternatives(input);
    expect(ranked[0].id).toBe('2');
    expect(ranked[1].id).toBe('1');
  });

  it('is deterministic', () => {
    const input: Recommendation[] = [
      { ...baseRec, id: 'A', label: 'A', savedKg: 10, score: 10 },
      { ...baseRec, id: 'B', label: 'B', savedKg: 10, score: 10 },
    ];
    const ranked1 = rankAlternatives([...input]);
    const ranked2 = rankAlternatives([...input]);
    expect(ranked1[0].id).toBe(ranked2[0].id);
  });

  it('ranks higher savedKg higher when feasibility, contextMatch, and frictionPenalty are equal', () => {
    // When formula is: score = savedKg * feasibility * contextMatch - frictionPenalty
    // If feasibility=1, contextMatch=1, friction=0, then score === savedKg.
    const input: Recommendation[] = [
      { ...baseRec, id: 'low', savedKg: 5, score: 5 }, // score = 5 * 1 * 1 - 0 = 5
      { ...baseRec, id: 'high', savedKg: 10, score: 10 }, // score = 10 * 1 * 1 - 0 = 10
    ];
    
    const ranked = rankAlternatives(input);
    expect(ranked[0].id).toBe('high');
    expect(ranked[1].id).toBe('low');
  });
});
