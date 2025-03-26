'use client';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

export function SocCharging({ before, after }: { before: number; after: number; }) {
  if (!before && !after) {
    return '-';
  }

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
