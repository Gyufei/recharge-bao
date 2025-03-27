'use client';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { SiTimescale } from 'react-icons/si';
import { IoWallet } from 'react-icons/io5';
import { FaGalacticRepublic } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { divide, utils } from 'safebase';
import { useChargeStatistics } from '@/lib/hooks/api/use-charge-statistics';

dayjs.extend(minMax);

export function StatisticsCard({ className }: { className?: string }) {
  const { data: statistics, isLoading } = useChargeStatistics();

  const formatNumber = (num: number, decimals: number = 2) => {
    return Number(num.toFixed(decimals));
  };

  const chargeTimes = statistics?.totalCount ?? 0;
  const totalCost = statistics?.totalCost ? utils.roundResult(String(statistics?.totalCost), 2) : 0;
  const totalKwh = statistics?.totalKwh ? utils.roundResult(String(statistics?.totalKwh), 2) : 0;
  const totalMileage = statistics?.totalMileage ?? 0;

  const chargeDuration = useMemo(() => {
    if (!statistics) return [null, null];

    const minDate = dayjs(statistics.minDate);
    const maxDate = dayjs(statistics.maxDate);
    return [minDate, maxDate];
  }, [statistics]);

  const perKmCost = useMemo(() => {
    if (!totalMileage) return 0;
    return formatNumber(Number(utils.roundResult(divide(String(totalCost), String(totalMileage)), 2)));
  }, [totalCost, totalMileage]);

  return (
    <div className={cn('stats shadow', className)}>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <SiTimescale className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">充电次数</div>
        <div className="stat-value">{isLoading ? <div className="skeleton h-4 w-8 my-1"></div> : chargeTimes}</div>
        <div className="stat-desc">
          {isLoading ? (
            <div className="skeleton h-4 w-24"></div>
          ) : chargeDuration[0] && chargeDuration[1] ? (
            `${chargeDuration[0].format('YYYY/MM/DD')} - ${chargeDuration[1].format('YYYY/MM/DD')}`
          ) : (
            '-'
          )}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <IoWallet className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">总花费</div>
        <div className="stat-value">{isLoading ? <div className="skeleton h-4 w-8 my-1"></div> : totalCost}</div>
        <div className="stat-desc">
          {isLoading ? <div className="skeleton h-4 w-24"></div> : totalKwh > 0 ? `累计充电量: ${totalKwh} kWh` : '-'}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaGalacticRepublic className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">总里程</div>
        <div className="stat-value">{isLoading ? <div className="skeleton h-4 w-8 my-1"></div> : totalMileage}</div>
        <div className="stat-desc">
          {isLoading ? <div className="skeleton h-4 w-24"></div> : perKmCost > 0 ? `${perKmCost} 元/每公里` : '-'}
        </div>
      </div>
    </div>
  );
}
