import { describe, it, expect } from 'vitest';
import { projectImpact } from '../../src/domain/engine/horizonProjector';

describe('horizonProjector', () => {
  it('projects once correctly', () => {
    const result = projectImpact(10, 'once');
    expect(result.totalSavedKg).toBe(10);
  });

  it('projects weekly for 10 years', () => {
    const result = projectImpact(10, 'weekly');
    expect(result.totalSavedKg).toBe(10 * 52 * 10);
  });

  it('projects monthly for 10 years', () => {
    const result = projectImpact(10, 'monthly');
    expect(result.totalSavedKg).toBe(10 * 12 * 10);
  });

  it('projects yearly for 10 years', () => {
    const result = projectImpact(10, 'yearly');
    expect(result.totalSavedKg).toBe(10 * 10);
  });
});
