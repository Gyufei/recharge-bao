'use client';
import { getStationPic } from '@/lib/hooks/api/use-charge-stations';
import Image from 'next/image';

export function ChargeStationPic({ id, name }: { id: number; name: string }) {
  const picSrc = getStationPic(id).icon;

  if (!picSrc) {
    return <span>{name}</span>;
  }

  const src = `/images/${picSrc}`;

  return <Image src={src} width={25} height={25} alt={name} />;
}
