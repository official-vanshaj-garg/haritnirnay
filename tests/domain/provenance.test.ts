import { describe, expect, it } from 'vitest';
import { generateAnalogies } from '../../src/domain/engine/analogyMapper';
import { ASSUMPTIONS } from '../../src/domain/factors/assumptionCatalog';
import { EMISSION_FACTORS } from '../../src/domain/factors/emissionFactors';
import { Provenance, provenanceSchema } from '../../src/domain/provenance';

function expectValidProvenance(provenance: Provenance): void {
  const result = provenanceSchema.safeParse(provenance);

  expect(result.success).toBe(true);
  expect(provenance.confidence).toBeDefined();
}

describe('provenanceSchema', () => {
  it('accepts valid data', () => {
    const result = provenanceSchema.safeParse({
      sourceLabel: 'Example public source',
      publisher: 'Example publisher',
      year: 2024,
      url: 'https://example.com/source',
      notes: 'Used as an example in schema tests.',
      confidence: 'high',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid confidence', () => {
    const result = provenanceSchema.safeParse({
      sourceLabel: 'Example public source',
      confidence: 'certain',
    });

    expect(result.success).toBe(false);
  });

  it('rejects non-https URLs', () => {
    const result = provenanceSchema.safeParse({
      sourceLabel: 'Example public source',
      url: 'http://example.com/source',
      confidence: 'medium',
    });

    expect(result.success).toBe(false);
  });
});

describe('Travel provenance coverage', () => {
  it('gives every active Travel assumption provenance and confidence', () => {
    const assumptions = Object.values(ASSUMPTIONS);

    expect(assumptions.length).toBeGreaterThan(0);
    assumptions.forEach((assumption) => {
      expectValidProvenance(assumption.provenance);
    });
  });

  it('gives every active Travel emission factor provenance and confidence', () => {
    const factors = Object.values(EMISSION_FACTORS.travel);

    expect(factors.length).toBeGreaterThan(0);
    factors.forEach((factor) => {
      expectValidProvenance(factor.provenance);
    });
  });

  it('gives every active Travel analogy provenance and confidence', () => {
    const analogies = generateAnalogies(100);

    expect(analogies.length).toBeGreaterThan(0);
    analogies.forEach((analogy) => {
      expectValidProvenance(analogy.provenance);
    });
  });
});
