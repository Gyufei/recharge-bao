import { useQuery } from '@tanstack/react-query';

import { IApiResponse, IChargeRecord, IPaginationInfo } from '@/lib/types/common';
import { DOMAIN_HOST } from '@/lib/const';

interface ChargeRecordsResponse extends IApiResponse<IChargeRecord[]> {
  pagination: IPaginationInfo;
}

export function useChargeRecords(page: number, pageSize: number) {
  async function getChargeRecords() {
    const res = await fetch(`${DOMAIN_HOST}/api/charge-data?page=${page}&pageSize=${pageSize}`);
    const { data, pagination, success } = (await res.json()) as ChargeRecordsResponse;

    if (!success) {
      throw new Error('获取充电记录失败');
    }

    return {
      data,
      pagination,
    };
  }

  const query = useQuery({
    queryKey: ['chargeRecords', page, pageSize],
    queryFn: getChargeRecords,
  });

  return query;
}
