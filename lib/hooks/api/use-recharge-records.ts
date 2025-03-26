import { useQuery } from '@tanstack/react-query';
import { DomainHost } from '@/lib/const';
import { IRechargeRecord } from '@/lib/types/data-model';

export function useRechargeRecords() {
  async function getChargeRecords() {
    const res = await fetch(DomainHost + '/api/recharge-data');
    const jsonRes = await res.json();
    const { data, success } = jsonRes;
    if (!success) {
      throw new Error('获取充电记录失败');
    }
    return data as IRechargeRecord[];
  }

  const query = useQuery({ queryKey: ['chargeRecords'], queryFn: getChargeRecords });

  return query;
}
