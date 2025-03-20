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
}

export interface ChargingStation {
  id: number;
  name: string;
}
