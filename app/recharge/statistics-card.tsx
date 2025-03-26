'use client';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { SiTimescale } from 'react-icons/si';
import { IoWallet } from 'react-icons/io5';
import { FaGalacticRepublic } from 'react-icons/fa';
import { useRechargeRecords } from '@/lib/hooks/api/use-recharge-records';
import { cn } from '@/lib/utils';
import { divide, utils } from 'safebase';

dayjs.extend(minMax);

export default function StatisticsCard({ className }: { className?: string }) {
  const { data, isLoading } = useRechargeRecords();

  const chargeTimes = useMemo(() => {
    if (!data) return null;

    return data?.length;
  }, [data]);

  const chargeDuration = useMemo(() => {
    if (!data) return [];

    const dates = data?.map((item) => dayjs(item.date));
    const minDate = dayjs.min(...dates);
    const maxDate = dayjs.max(...dates);
    return [minDate, maxDate];
  }, [data]);

  const totalCost = useMemo(() => {
    if (!data) return 0;

    return data?.reduce((acc, item) => acc + item.chargingCost, 0);
  }, [data]);

  const totalKwh = useMemo(() => {
    if (!data) return 0;

    return data?.reduce((acc, item) => acc + item.chargingKWh, 0);
  }, [data]);

  const totalMileage = useMemo(() => {
    if (!data) return 0;

    const totalMileage = Math.max(...data.map((item) => item.totalMileage).filter((item) => item !== null));

    return totalMileage;
  }, [data]);

  const perKmCost = useMemo(() => {
    if (!data) return 0;

    return utils.roundResult(divide(String(totalCost), String(totalMileage)), 2);
  }, [data]);

  return (
    <div className={cn('stats shadow', className)}>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <SiTimescale className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">充电次数</div>
        <div className="stat-value">
          {isLoading ? <div className="skeleton h-4 w-8 my-1"></div> : chargeTimes}
        </div>
        <div className="stat-desc">
          {isLoading ? (
            <div className="skeleton h-4 w-24"></div>
          ) : (
            `${chargeDuration[0]?.format('YYYY/MM/DD')} - ${chargeDuration[1]?.format('YYYY/MM/DD')}`
          )}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <IoWallet className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">总花费</div>
        <div className="stat-value">
          {isLoading ? <div className="skeleton h-4 w-8 my-1"></div> : totalCost}
        </div>
        <div className="stat-desc">
          {isLoading ? (
            <div className="skeleton h-4 w-24"></div>
          ) : (
            `累计充电量: ${totalKwh} kWh`
          )}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaGalacticRepublic className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">总里程</div>
        <div className="stat-value">
          {isLoading ? <div className="skeleton h-4 w-8 my-1"></div> : totalMileage}
        </div>
        <div className="stat-desc">
          {isLoading ? (
            <div className="skeleton h-4 w-24"></div>
          ) : (
            `${perKmCost} 元/每公里`
          )}
        </div>
      </div>
    </div>
  );
}
