'use client';
import { subtract, multiply, divide } from 'safebase';
import { MAX_RANGE } from '@/lib/const';

export function RangeCharging({
  beforeRange,
  afterRange,
  beforeSoc,
  afterSoc,
}: {
  beforeRange: number;
  afterRange: number;
  beforeSoc: number;
  afterSoc: number;
}) {
  const addRange = subtract(String(afterRange), String(beforeRange));

  // 计算实际的 SOC 值
  const actualBeforeSoc = beforeSoc || (beforeRange ? Math.round(Number(multiply(divide(String(beforeRange), String(MAX_RANGE)), '100'))) : 0);
  const actualAfterSoc = afterSoc || (afterRange ? Math.round(Number(multiply(divide(String(afterRange), String(MAX_RANGE)), '100'))) : 0);
  const actualAddSoc = subtract(String(actualAfterSoc), String(actualBeforeSoc));

  if (!beforeRange && !afterRange && !beforeSoc && !afterSoc) {
    return '-';
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1">
        <div className="flex justify-between text-xs text-base-content/60 mb-1">
          <span>
            {beforeRange ? `${beforeRange}` : ''}
            {actualBeforeSoc ? (beforeRange ? `(${actualBeforeSoc}%)` : `${actualBeforeSoc}%`) : ''}
          </span>
          <span className="text-primary text-xs">
            +{addRange}
            {Number(actualAddSoc) ? `(${actualAddSoc}%)` : ''}
          </span>
          <span>
            {afterRange ? `${afterRange}` : ''}
            {actualAfterSoc ? (afterRange ? `(${actualAfterSoc}%)` : `${actualAfterSoc}%`) : ''}
          </span>
        </div>
        <div className="h-1 bg-base-200 rounded-full overflow-hidden">
          <div className="h-full flex">
            <div className="bg-error" style={{ width: `${actualBeforeSoc}%` }} />
            <div className="bg-success" style={{ width: `${actualAddSoc}%` }} />
            <div className="bg-base-200" style={{ width: `${100 - actualAfterSoc}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
