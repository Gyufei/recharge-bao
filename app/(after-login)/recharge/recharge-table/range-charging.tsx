'use client';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import { subtract } from 'safebase';

export function RangeCharging({ before, after }: { before: number; after: number; }) {
  const addRange = subtract(String(after), String(before));

  if (!before && !after) {
    return '-';
  }

  return (
    <div className="flex items-center justify-between">
      <span className="w-fit text-center">{before}</span>
      <div className="flex relative items-center">
        <span className="text-primary text-xs absolute -top-1 left-1/2 -translate-x-1/2">+{addRange}</span>
        <HiOutlineArrowLongRight className="mt-2 text-primary" />
      </div>
      <span className="w-[30px] text-center">{after}</span>
    </div>
  );
}
