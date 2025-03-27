'use client';
import dayjs from 'dayjs';
import { CompactTable } from '@table-library/react-table-library/compact';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

import { Pagination } from '@/components/pagination/pagination';
import { useChargeRecords } from '@/lib/hooks/api/use-charge-records';
import { RangeCharging } from './range-charging';
import { ChargeStationPic } from './charge-station-pic';
import { IChargeRecordVO } from '@/lib/types/vo';
import { AddChargeModal } from '../add-charge-modal';
import { useState } from 'react';

export function ChargeTable() {
  const INIT_PAGINATION = {
    total: 0,
    page: 0,
    pageSize: 10,
    totalPages: 0,
  };

  const [currentPage, setCurrentPage] = useState(INIT_PAGINATION.page);

  const { data, isLoading } = useChargeRecords(currentPage + 1, INIT_PAGINATION.pageSize);

  const { data: chargeRecords, pagination: paginationData } = data || {
    data: [],
    pagination: INIT_PAGINATION,
  };

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: 120px 1fr 70px 1fr 80px 90px;
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
      Cell: `
        padding: 8px;
      `,
    },
  ]);

  const tableData = isLoading
    ? {
        nodes: Array.from({ length: 10 }, (_, index) => ({
          id: index,
        })) as IChargeRecordVO[],
      }
    : {
        nodes: chargeRecords,
      };

  const paginationInst = usePagination(
    tableData,
    {
      state: {
        page: INIT_PAGINATION.page,
        size: INIT_PAGINATION.pageSize,
      },
      onChange: (_action, state) => {
        setCurrentPage(state.page);
      },
    },
    {
      isServer: true,
    }
  );

  const handlePageChange = (page: number) => {
    paginationInst.fns.onSetPage(page);
  };

  const COLUMNS = [
    {
      label: '日期',
      renderCell: (item: IChargeRecordVO) =>
        isLoading ? <div className="skeleton w-24 h-4 my-3"></div> : dayjs(item.date).format('YYYY/MM/DD'),
    },
    {
      label: '费用/度数',
      renderCell: (item: IChargeRecordVO) =>
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
      renderCell: (item: IChargeRecordVO) =>
        isLoading ? <div className="skeleton h-4 my-3"></div> : <span className="text-info">{item.price}</span>,
    },
    {
      label: '续航',
      renderCell: (item: IChargeRecordVO) =>
        isLoading ? (
          <div className="skeleton h-4 my-3"></div>
        ) : (
          <RangeCharging
            beforeRange={item.rangeBeforeCharging ?? 0}
            afterRange={item.rangeAfterCharging ?? 0}
            beforeSoc={item.socBeforeCharging ?? 0}
            afterSoc={item.socAfterCharging ?? 0}
          />
        ),
    },
    {
      label: '总里程',
      renderCell: (item: IChargeRecordVO) => (isLoading ? <div className="skeleton h-4 my-3"></div> : item.totalMileage ?? '-'),
    },
    {
      label: '充电站',
      renderCell: (item: IChargeRecordVO) =>
        isLoading ? (
          <div className="skeleton h-4 my-3"></div>
        ) : (
          <ChargeStationPic id={item.chargingStationId} name={item.chargingStation.name} />
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-y-3">
      <AddChargeModal />
      <CompactTable columns={COLUMNS} data={tableData} theme={theme} layout={{ custom: true }} pagination={paginationInst} />
      {paginationData.totalPages > 1 && (
        <Pagination
          totalPages={paginationData.totalPages}
          edgePageCount={3}
          middlePagesSiblingCount={1}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        >
          <Pagination.PrevButton />
          <Pagination.PageButton activeClassName="" inactiveClassName="" className="" />
          <Pagination.NextButton />
        </Pagination>
      )}
    </div>
  );
}
