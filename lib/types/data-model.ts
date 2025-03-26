import { z } from 'zod';

export interface IRechargeRecord {
  id: number;
  date: Date;
  chargingCost: number;
  chargingKWh: number;
  rangeBeforeCharging: number;
  rangeAfterCharging: number;
  socBeforeCharging: number;
  socAfterCharging: number;
  totalMileage: number;
  userId: string;
  chargingStationId: number;
  price: number;

  chargingStation: IChargingStation;
}

export interface IChargingStation {
  id: number;
  name: string;
}

export const rechargeSchema = z.object({
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
