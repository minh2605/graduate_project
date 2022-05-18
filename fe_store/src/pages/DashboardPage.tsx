import SvgAccount from "common/components/svg/Account";
import SvgOrder from "common/components/svg/Order";
import SvgRevenue from "common/components/svg/Revenue";
import { Widget } from "features/Admin/components/Widget";

export const DashboardPage = (): JSX.Element => {
  return (
    <div className="w-full">
      <h1 className="font-bold text-h1 leading-8 pb-6">Dashboard</h1>
      <div className="grid grid-rows-4 grid-cols-4 w-full gap-4">
        <Widget name="Total Revenue" icon={<SvgRevenue />} />
        <Widget name="Total Orders" icon={<SvgOrder color="#FFF" />} />
        <Widget name="Total Client" icon={<SvgAccount color="#FFF" />} />
        <Widget name="Total Revenue" icon={<SvgRevenue />} />
      </div>
    </div>
  );
};
