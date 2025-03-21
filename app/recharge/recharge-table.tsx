'use client';
import dayjs from 'dayjs';
import Image from 'next/image';
import { divide, utils, subtract } from 'safebase';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

import { useRechargeRecords } from '@/lib/hooks/api/use-recharge-records';
import { cn } from '@/lib/utils';
import { getStationPic } from '@/lib/hooks/api/use-recharge-stations';

function getPrice(chargingCost: number, chargingKWh: number) {
  const price = divide(String(chargingCost), String(chargingKWh));
  return utils.roundResult(price, 2);
}

export default function RechargeTable({ className }: { className?: string }) {
  const { data, isLoading } = useRechargeRecords();

  return (
    <div className={cn('overflow-x-auto rounded-box border border-base-content/5 bg-base-100', className)}>
      <table className="table">
        <thead className="text-xs">
          <tr>
            <th>日期</th>
            <th>费用</th>
            <th>度数</th>
            <th>价格</th>
            <th>续航</th>
            <th>Soc</th>
            <th>总里程</th>
            <th>充电站</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {isLoading || !data ? (
            <Skeleton />
          ) : (
            (data || []).map((record) => (
              <tr key={record.id} className="text-lg">
                <td>{dayjs(record.date).format('YYYY/MM/DD')}</td>
                <td>{record.chargingCost}</td>
                <td>{record.chargingKWh}</td>
                <td className="text-info">{getPrice(record.chargingCost, record.chargingKWh)}</td>
                <td>
                  <RangeCharging before={record.rangeBeforeCharging} after={record.rangeAfterCharging} />
                </td>
                <td>
                  <SocCharging before={record.socBeforeCharging} after={record.socAfterCharging} />
                </td>
                <td>{record.totalMileage}</td>
                <td>
                  <ChargingStationPic id={record.chargingStationId} name={record.chargingStation.name} />
                </td>
                <td></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function RangeCharging({ before, after }: { before: number; after: number }) {
  const addRange = subtract(String(after), String(before));

  if (!before && !after) {
    return '-';
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-lg w-[30px] text-center">{before}</span>
      <div className="flex relative items-center">
        <span className="text-primary text-xs absolute -top-1 left-1/2 -translate-x-1/2">+{addRange}</span>
        <HiOutlineArrowLongRight className="mt-2 text-primary text-2xl" />
      </div>
      <span className="text-lg w-[30px] text-center">{after}</span>
    </div>
  );
}

function SocCharging({ before, after }: { before: number; after: number }) {
  if (!before && !after) {
    return '-';
  }

  const addSoc = subtract(String(after), String(before));

  return (
    <div className="flex items-center justify-between">
      <div
        className="radial-progress text-secondary text-xs"
        style={{ '--size': '30px', '--value': before, '--thickness': '2px' } as React.CSSProperties}
        aria-valuenow={before}
        role="progressbar"
      >
        {before}%
      </div>
      <HiOutlineArrowLongRight className="text-primary text-xs" />
      <div
        className="radial-progress text-success text-xs"
        style={{ '--size': '30px', '--value': after, '--thickness': '2px' } as React.CSSProperties}
        aria-valuenow={after}
        role="progressbar"
      >
        {after}%
      </div>
    </div>
  );
}

function ChargingStationPic({ id, name }: { id: number; name: string }) {
  const picSrc = getStationPic(id).big;

  if (!picSrc) {
    return <span>{name}</span>;
  }

  const src = `/images/${picSrc}`;

  return (
    <div className="flex items-center gap-2">
      <Image src={src} width={50} height={25} alt={name} />
    </div>
  );
}

function Skeleton() {
  return Array.from({ length: 8 }).map((_, index) => (
    <tr key={index}>
      <td>
        <div className="skeleton w-24 h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
      <td>
        <div className="skeleton h-4 my-3"></div>
      </td>
    </tr>
  ));
}
