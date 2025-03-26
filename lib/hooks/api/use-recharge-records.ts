import { useQuery } from '@tanstack/react-query';
import { DomainHost } from '@/lib/const';
import { IRechargeRecord } from '@/lib/types/data-model';
import { divide, utils } from 'safebase';

function getPrice(chargingCost: number, chargingKWh: number) {
  const price = divide(String(chargingCost), String(chargingKWh));
  return utils.roundResult(price, 2);
}

export function useRechargeRecords() {
  async function getChargeRecords() {
    const res = await fetch(DomainHost + '/api/recharge-data');
    const jsonRes = await res.json();
    const { data, success } = jsonRes;

    if (!success) {
      throw new Error('获取充电记录失败');
    }

    data.forEach((record: IRechargeRecord) => {
      record.price = getPrice(record.chargingCost, record.chargingKWh);
    });

    return data as IRechargeRecord[];
  }

  const query = useQuery({ queryKey: ['chargeRecords'], queryFn: getChargeRecords });

  return query;
}
