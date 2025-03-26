import RechargeTable from './recharge-table';
import StatisticsCard from './statistics-card';

export default async function Recharge() {
  return (
    <div className="bg-base-100 mx-auto max-w-[100rem] p-4 grid grid-cols-8 gap-4">
      <div className="max-h-[calc(100vh-40px)] no-scroll-bar overflow-y-auto col-span-4">
        <RechargeTable />
      </div>
      <div className="col-span-4 flex flex-col gap-4 items-stretch">
        <StatisticsCard />
      </div>
    </div>
  );
}
