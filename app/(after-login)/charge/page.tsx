import { PriceChart } from './price-chart';
import { ChargeTable } from './charge-table';
import { StatisticsCard } from './statistics-card';

export default async function ChargePage() {
  return (
    <div className="relative mt-16 p-4 grid grid-cols-8 gap-4 mx-[160px]">
      <div className="max-h-[calc(100vh-104px)] flex flex-col gap-y-3 no-scroll-bar overflow-y-auto col-span-4">
        <ChargeTable />
      </div>
      <div className="col-span-4 flex flex-col gap-4 items-stretch">
        <StatisticsCard />
        <PriceChart />
      </div>
    </div>
  );
}
