import { z } from 'zod';

export const sourceConfidenceSchema = z.enum(['high', 'medium', 'low']);

export const provenanceSchema = z
  .object({
    sourceLabel: z.string().min(1),
    publisher: z.string().min(1).optional(),
    year: z.number().int().positive().optional(),
    url: z
      .string()
      .url()
      .refine((url) => url.startsWith('https://'), {
        message: 'Provenance URLs must use https://.',
      })
      .optional(),
    notes: z.string().min(1).optional(),
    confidence: sourceConfidenceSchema,
  })
  .strict();

export type SourceConfidence = z.infer<typeof sourceConfidenceSchema>;
export type Provenance = z.infer<typeof provenanceSchema>;

export const CONFIDENCE_LABELS: Record<SourceConfidence, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
