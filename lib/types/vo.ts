import { IChargePriceChartItem, IChargeRecord, IChargingStation } from './common';

export interface IChargeRecordVO extends IChargeRecord {
  price: number;
}

export interface IChargePriceChartItemVO extends IChargePriceChartItem {
  price: number;
}

export interface IChargingStationVO extends IChargingStation {
  imgs: {
    big: string;
    icon: string;
  };
}
