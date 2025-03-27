import { useQuery } from '@tanstack/react-query';
import { DOMAIN_HOST } from '@/lib/const';
import { IApiResponse, IChargeStatistics } from '@/lib/types/common';

export function useChargeStatistics() {
  async function getChargeStatistics() {
    const chargeStatisticsData = await fetch(DOMAIN_HOST + '/api/charge-statistics');
    const { data, success } = (await chargeStatisticsData.json()) as IApiResponse<IChargeStatistics>;

    if (!success) {
      throw new Error('获取充电统计失败');
    }

    return data;
  }

  const query = useQuery({ queryKey: ['chargeStatistics'], queryFn: getChargeStatistics });
  return query;
}
