'use client';
import dayjs from 'dayjs';
import { divide, utils } from 'safebase';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import { useRechargeRecords } from '@/lib/hooks/api/use-recharge-records';
import { RangeCharging } from './range-charging';
import { SocCharging } from './soc-charging';
import { ChargingStationPic } from './charging-station-pic';
import { IRechargeRecord } from '@/lib/types/data-model';

function getPrice(chargingCost: number, chargingKWh: number) {
  const price = divide(String(chargingCost), String(chargingKWh));
  return utils.roundResult(price, 2);
}

export default function RechargeTable() {
  const { data, isLoading } = useRechargeRecords();

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  120px 1fr 70px 140px 140px 80px 100px;
      `,
      HeaderRow: `
        color: var(--color-accent-content)
      `,
      HeaderCell: `
        font-size: 14px;
        font-weight: normal;

        &>div {
          display: flex;
          align-items: center;
        }
      `,
      Row: `
        font-size: 16px;
      `,
    },
  ]);

  const tableData = {
    nodes: data || [],
  };

  const COLUMNS = [
    {
      label: '日期',
      renderCell: (item: IRechargeRecord) =>
        isLoading ? <div className="skeleton w-24 h-4 my-3"></div> : dayjs(item.date).format('YYYY/MM/DD'),
    },
    {
      label: '费用/度数',
      renderCell: (item: IRechargeRecord) =>
        isLoading ? (
          <div className="skeleton h-4 my-3"></div>
        ) : (
          <>
            <span className="text-accent">{item.chargingCost}</span>/<span className="text-neutral text-sm">{item.chargingKWh}度</span>
          </>
        ),
    },
    {
      label: '价格',
      renderCell: (item: IRechargeRecord) =>
        isLoading ? (
          <div className="skeleton h-4 my-3"></div>
        ) : (
          <span className="text-info">{getPrice(item.chargingCost, item.chargingKWh)}</span>
        ),
    },
    {
      label: '续航',
      renderCell: (item: IRechargeRecord) =>
        isLoading ? (
          <div className="skeleton h-4 my-3"></div>
        ) : (
          <RangeCharging before={item.rangeBeforeCharging ?? 0} after={item.rangeAfterCharging ?? 0} />
        ),
    },
    {
      label: 'Soc',
      renderCell: (item: IRechargeRecord) =>
        isLoading ? (
          <div className="skeleton h-4 my-3"></div>
        ) : (
          <SocCharging before={item.socBeforeCharging} after={item.socAfterCharging} />
        ),
    },
    {
      label: '总里程',
      renderCell: (item: IRechargeRecord) => (isLoading ? <div className="skeleton h-4 my-3"></div> : item.totalMileage ?? '-'),
    },
    {
      label: '充电站',
      renderCell: (item: IRechargeRecord) =>
        isLoading ? (
          <div className="skeleton h-4 my-3"></div>
        ) : (
          <ChargingStationPic id={item.chargingStationId} name={item.chargingStation.name} />
        ),
    },
  ];

  return <CompactTable columns={COLUMNS} data={tableData} theme={theme} layout={{ custom: true }} />;
}
