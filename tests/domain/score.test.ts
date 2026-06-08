import { describe, it, expect } from 'vitest';
import { calculateScore } from '../../src/domain/engine/score';

describe('score', () => {
  it('calculates score based on transparent formula', () => {
    // formula: savedKg * feasibility * contextMatch - frictionPenalty
    expect(calculateScore(10, 0.8, 0.5, 1)).toBe(10 * 0.8 * 0.5 - 1);
  });

  it('higher friction lowers score', () => {
    const scoreLowFriction = calculateScore(10, 1, 1, 0);
    const scoreHighFriction = calculateScore(10, 1, 1, 5);
    expect(scoreHighFriction).toBeLessThan(scoreLowFriction);
  });
});
