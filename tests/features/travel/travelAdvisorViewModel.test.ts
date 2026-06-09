import { describe, expect, it } from 'vitest';
import {
  buildGhostAlternativePreview,
  buildTravelCtaLabel,
  DEFAULT_TRAVEL_FORM_DRAFT,
  parseTravelFormDraft,
} from '../../../src/features/travel/travelAdvisorViewModel';

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
});
