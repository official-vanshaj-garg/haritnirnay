import { z } from 'zod';

export const travelFormSchema = z.object({
  distanceKm: z
    .number({
      required_error: 'Distance is required',
      invalid_type_error: 'Distance must be a number',
    })
    .positive('Distance must be greater than 0'),
  passengers: z
    .number({
      required_error: 'Passengers are required',
      invalid_type_error: 'Passengers must be a number',
    })
    .int('Passengers must be an integer')
    .min(1, 'Must have at least 1 passenger'),
  selectedMode: z.enum(['petrol_car', 'bus', 'train', 'short_flight'], {
    required_error: 'Please select a travel mode',
  }),
  region: z.enum(['india', 'global']).default('india'),
  priority: z
    .enum(['carbon', 'balanced', 'time_sensitive'])
    .default('balanced'),
});
