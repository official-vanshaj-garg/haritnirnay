import { describe, expect, it } from 'vitest';
import {
  CARBON_CUT_TRUST_NOTE,
  buildGhostAlternativePreview,
  buildTravelCtaLabel,
  DEFAULT_TRAVEL_FORM_DRAFT,
  parseTravelFormDraft,
} from '../../../src/features/travel/travelAdvisorViewModel';
import { generateTravelViewModel } from '../../../src/features/travel/travelDecisionViewModel';

describe('travelAdvisorViewModel', () => {
  it('builds a ghost preview when enough valid form data exists', () => {
    const parsedDraft = parseTravelFormDraft(DEFAULT_TRAVEL_FORM_DRAFT);

    expect(parsedDraft.success).toBe(true);
    if (!parsedDraft.success) return;

    const preview = buildGhostAlternativePreview(parsedDraft.data);

    expect(preview.kind).toBe('alternative');
    expect(preview.text).toMatch(/Before you choose Petrol Car/i);
    expect(preview.text).toMatch(/may save about/i);
  });

  it('does not parse invalid form data for advisor preview use', () => {
    const parsedDraft = parseTravelFormDraft({
      ...DEFAULT_TRAVEL_FORM_DRAFT,
      distanceKm: '-10',
    });

    expect(parsedDraft.success).toBe(false);
  });

  it('uses supportive preview copy when selected mode is already lower-carbon', () => {
    const parsedDraft = parseTravelFormDraft({
      ...DEFAULT_TRAVEL_FORM_DRAFT,
      selectedMode: 'train',
    });

    expect(parsedDraft.success).toBe(true);
    if (!parsedDraft.success) return;

    const preview = buildGhostAlternativePreview(parsedDraft.data);

    expect(preview.kind).toBe('supportive');
    expect(preview.text).toMatch(/Train already looks like/i);
  });

  it('builds choice-aware CTA labels', () => {
    expect(buildTravelCtaLabel('petrol_car')).toBe(
      'Compare my petrol car choice'
    );
    expect(buildTravelCtaLabel('train')).toBe('Compare my train choice');
    expect(buildTravelCtaLabel('short_flight')).toBe(
      'Compare my flight choice'
    );
  });

  it('falls back when the CTA mode is not valid', () => {
    expect(buildTravelCtaLabel('')).toBe('Compare my options');
    expect(buildTravelCtaLabel('walking')).toBe('Compare my options');
  });

  it('builds carbon cut data for the carbon receipt', () => {
    const parsedDraft = parseTravelFormDraft(DEFAULT_TRAVEL_FORM_DRAFT);

    expect(parsedDraft.success).toBe(true);
    if (!parsedDraft.success) return;

    const receipt = generateTravelViewModel(parsedDraft.data).receipt;

    expect(receipt.carbonCut.status).toBe('cut');
    expect(receipt.carbonCut.currentImpactValue).toBe('about 3.8 kg CO2e');
    expect(receipt.carbonCut.recommendedImpactValue).toBe('about 2.1 kg CO2e');
    expect(receipt.carbonCut.cutValue).toBe('about 1.7 kg CO2e');
    expect(receipt.carbonCut.trustNote).toBe(CARBON_CUT_TRUST_NOTE);
  });

  it('builds honest carbon cut data when no positive cut is available', () => {
    const parsedDraft = parseTravelFormDraft({
      ...DEFAULT_TRAVEL_FORM_DRAFT,
      selectedMode: 'train',
    });

    expect(parsedDraft.success).toBe(true);
    if (!parsedDraft.success) return;

    const receipt = generateTravelViewModel(parsedDraft.data).receipt;

    expect(receipt.carbonCut.status).toBe('already_recommended');
    expect(receipt.carbonCut.summary).toMatch(
      /Train is already near the lower-impact recommendation/i
    );
    expect(receipt.carbonCut.currentImpactValue).toBe('about 0.82 kg CO2e');
    expect(receipt.carbonCut.recommendedImpactValue).toBe('about 0.82 kg CO2e');
    expect(receipt.carbonCut.cutValue).toBe('No positive cut identified');
  });
});
