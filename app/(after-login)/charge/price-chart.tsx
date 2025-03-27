'use client';
import { useChargePriceChart } from '@/lib/hooks/api/use-charge-chart';
import { useChargeStatistics } from '@/lib/hooks/api/use-charge-statistics';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Line, Tooltip, LineChart, ResponsiveContainer, XAxis, YAxis, ReferenceLine } from 'recharts';
import { divide, utils } from 'safebase';

interface _ChartDataItem {
  date: string;
  price: number;
}

const CHART_MARGIN = { top: 15, right: 20, bottom: 5, left: 10 };
const CHART_STYLES = {
  line: {
    stroke: 'var(--color-primary)',
    strokeWidth: 2,
  },
  label: {
    fill: 'var(--color-secondary-content)',
    position: 'outside' as const,
    dx: -18,
    fontSize: 12,
  },
  referenceLine: {
    stroke: 'var(--color-info)',
    strokeWidth: 2,
  },
};

export function PriceChart() {
  const { data, isLoading } = useChargePriceChart();
  const { data: chargeStatistics, isLoading: isChargeStatisticsLoading } = useChargeStatistics();

  const chartData = useMemo(() => {
    if (isLoading || !data?.length) return [];

    return data
      .map((item) => ({
        date: item.date,
        price: item.price,
      }))
      .reverse();
  }, [data, isLoading]);

  const avgPrice = useMemo(() => {
    if (!data?.length || isChargeStatisticsLoading) return 0;

    const totalPrice = chargeStatistics?.totalCost || 0;
    const totalKwh = chargeStatistics?.totalKwh || 0;

    return utils.roundResult(divide(String(totalPrice), String(totalKwh)), 2);
  }, [data, chargeStatistics, isChargeStatisticsLoading]);

  if (isLoading) {
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-ring loading-xl text-info"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[200px] border border-base-200 rounded-lg w-full flex aspect-video justify-center text-xs">
      <ResponsiveContainer>
        <LineChart accessibilityLayer data={chartData} margin={CHART_MARGIN}>
          <XAxis dataKey="date" tickFormatter={(value) => dayjs(value).format('MM/DD')} />
          <YAxis dataKey="price" type="number" />
          <Tooltip labelFormatter={(value) => dayjs(value).format('YYYY/MM/DD')} contentStyle={{ borderRadius: '0.5rem' }} />
          <Line dataKey="price" type="natural" {...CHART_STYLES.line} dot={true} label={CHART_STYLES.label} />
          <ReferenceLine y={avgPrice} {...CHART_STYLES.referenceLine} label={`平均价格: ${avgPrice}`} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
