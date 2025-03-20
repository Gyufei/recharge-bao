'use client';
import { DomainHost } from '@/lib/const';
import { IRechargeRecord } from '@/lib/types/data-model';
import { useEffect, useState } from 'react';

export default function RechargeTable() {
  const [data, setData] = useState<IRechargeRecord[]>([]);

  useEffect(() => {
    async function getData() {
      const chargingRecordsData = await fetch(DomainHost + '/api/recharge-data');
      const chargingRecords: IRechargeRecord[] = await chargingRecordsData.json();
      setData(chargingRecords);
    }
    
    getData();
  }, []);

  console.log('456', data);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>日期</th>
            <th>费用</th>
            <th>度数</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              <td>{record.date.toString()}</td>
              <td>{record.chargingCost}</td>
              <td>{record.chargingKWh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
