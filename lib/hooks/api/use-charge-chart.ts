import { useQuery } from '@tanstack/react-query';
import { DOMAIN_HOST } from '@/lib/const';
import { IApiResponse, IChargePriceChartItem } from '@/lib/types/common';
import { divideWithRound2 } from '@/lib/utils/number';
import { IChargePriceChartItemVO } from '@/lib/types/vo';

export function useChargePriceChart() {
  async function getChargePriceChart() {
    const res = await fetch(`${DOMAIN_HOST}/api/charge-price-chart`);
    const { data, success } = (await res.json()) as IApiResponse<IChargePriceChartItem[]>;

    if (!success) {
      throw new Error('获取充电价格图表失败');
    }

    const voData = data.map((record: IChargePriceChartItem): IChargePriceChartItemVO => {
      return {
        ...record,
        price: divideWithRound2(record.chargingCost, record.chargingKWh),
      };
    });
    
    return voData;
  }

  const query = useQuery({
    queryKey: ['chargePriceChart'],
    queryFn: getChargePriceChart,
  });

  return query;
}
