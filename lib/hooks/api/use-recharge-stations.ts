import { useQuery } from '@tanstack/react-query';
import { DomainHost } from '@/lib/const';
import { IChargingStation } from '@/lib/types/data-model';

const StationPicMap = {
  '1': {
    big: 'tld-big.jpg',
    icon: 'tld-icon.png',
  },
  '2': {
    big: 'xjcd-big.webp',
    icon: 'xjcd-icon.jpeg',
  },
  '3': {
    big: 'zgsh-big.jpg',
    icon: 'zgsh-icon.jpg',
  },
  '4': {
    big: 'yhyy-big.jpg',
    icon: 'yhyy-icon.jpg',
  },
};

export function useRechargeStations() {
  async function getChargeStations() {
    const chargingStationsData = await fetch(DomainHost + '/api/recharge-station');
    const chargingStations: IChargingStation[] = await chargingStationsData.json();

    return chargingStations;
  }

  const query = useQuery({ queryKey: ['chargeStations'], queryFn: getChargeStations });

  return query;
}

export function getStationPic(id: number) {
  return {
    big: StationPicMap[String(id) as keyof typeof StationPicMap].big,
    icon: StationPicMap[String(id) as keyof typeof StationPicMap].icon,
  };
}
