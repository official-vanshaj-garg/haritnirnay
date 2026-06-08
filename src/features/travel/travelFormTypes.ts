import { z } from 'zod';
import { travelFormSchema } from './travelFormSchema';

export type TravelFormInput = z.infer<typeof travelFormSchema>;
