import { useQuery } from '@tanstack/react-query';
import { DOMAIN_HOST } from '@/lib/const';
import { IApiResponse, IChargingStation } from '@/lib/types/common';
import { IChargingStationVO } from '@/lib/types/vo';

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

export function useChargeStations() {
  async function getChargeStations() {
    const chargingStationsData = await fetch(DOMAIN_HOST + '/api/charge-station');
    const { data, success } = (await chargingStationsData.json()) as IApiResponse<IChargingStation[]>;

    if (!success) {
      throw new Error('获取充电站失败');
    }

    const voData = data.map((station: IChargingStation): IChargingStationVO => {
      return {
        ...station,
        imgs: getStationPic(station.id),
      };
    });

    return voData;
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
