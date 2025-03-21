import { useQuery } from '@tanstack/react-query';
import { DomainHost } from '@/lib/const';
import { IRechargeRecord } from '@/lib/types/data-model';

export function useRechargeRecords() {
  async function getChargeRecords() {
    const chargingRecordsData = await fetch(DomainHost + '/api/recharge-data');
    const chargingRecords: IRechargeRecord[] = await chargingRecordsData.json();
    return chargingRecords;
  }

  const query = useQuery({ queryKey: ['chargeRecords'], queryFn: getChargeRecords });

  return query;
}
