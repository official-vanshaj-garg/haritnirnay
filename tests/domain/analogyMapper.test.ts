import { describe, it, expect } from 'vitest';
import { generateAnalogies } from '../../src/domain/engine/analogyMapper';

describe('analogyMapper', () => {
  it('returns non-empty analogies for positive kg', () => {
    const analogies = generateAnalogies(100);
    expect(analogies.length).toBeGreaterThan(0);
  });

  it('returns empty for zero or negative', () => {
    expect(generateAnalogies(0)).toHaveLength(0);
    expect(generateAnalogies(-10)).toHaveLength(0);
  });

  it('maps correctly using assumptions', () => {
    const analogies = generateAnalogies(21);
    const treeAnalogy = analogies.find(a => a.id === 'analogy_tree');
    expect(treeAnalogy?.equivalentValue).toBe(1); // 21 / 21 = 1
  });
});
