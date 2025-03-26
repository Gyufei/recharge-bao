'use client';
import { getStationPic } from '@/lib/hooks/api/use-recharge-stations';
import Image from 'next/image';

export function ChargingStationPic({ id, name }: { id: number; name: string; }) {
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
