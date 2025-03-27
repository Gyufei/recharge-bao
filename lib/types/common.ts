export interface IApiResponse<T> {
  data: T;
  success: boolean;
  pagination?: IPaginationInfo;
}

export interface IChargeRecord {
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

  chargingStation: IChargingStation;
}

export interface IChargingStation {
  id: number;
  name: string;
}

export interface IPaginationInfo {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface IChargeStatistics {
  totalCost: number | null;
  totalKwh: number | null;
  totalMileage: number | null;
  totalCount: number | null;
  minDate: Date | null;
  maxDate: Date | null;
}

export interface IChargePriceChartItem {
  chargingCost: number;
  chargingKWh: number;
  totalMileage: number;
  date: Date;
}
