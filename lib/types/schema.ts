import { z } from 'zod';
export const chargeSchema = z.object({
  date: z.string(),
  chargingCost: z.number().min(0),
  chargingKWh: z.number().min(0),
  rangeBeforeCharging: z.number().min(0).nullable(),
  rangeAfterCharging: z.number().min(0).nullable(),
  socBeforeCharging: z.number().min(0).max(100).nullable(),
  socAfterCharging: z.number().min(0).max(100).nullable(),
  totalMileage: z.number().min(0).nullable(),
  chargingStationId: z.number(),
});
