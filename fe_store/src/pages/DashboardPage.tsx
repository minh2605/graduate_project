import SvgAccount from "common/components/svg/Account";
import SvgOrder from "common/components/svg/Order";
import SvgRevenue from "common/components/svg/Revenue";
import { Widget } from "features/Admin/components/Widget";
import {
  OrderPaginationProps,
  OrderProps,
} from "features/Admin/pages/ManageOrdersPage";
import { useLoading } from "hooks/useLoading";
import { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import API from "api/axios";
import {
  AreaChartAdmin,
  AreaChartAdminData,
  AreaChartAdminProps,
} from "features/Admin/components/AreaChartAdmin";

export interface DateRangeFilterProps {
  from: string;
  to: string;
}
export type RevenueData = {
  date: string;
  price: number;
};

export interface UserProps {
  email: string;
  password: string;
  role_name: string;
  order_ids?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const DashboardPage = (): JSX.Element => {
  const [showLoading, hideLoading] = useLoading();
  const [ordersByDate, setOrdersByDate] = useState<AreaChartAdminData[]>([]);
  const [orderList, setOrderList] = useState<OrderPaginationProps>();
  const [userList, setUserList] = useState<number>(0);
  const [dateRangeFilter, setDateRangeFilter] = useState<DateRangeFilterProps>({
    from: new Date().toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    setDateRangeFilter((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     showLoading();
  //     const data: number = await API.get(`/auth/amount`);
  //     setUserList(data);
  //     hideLoading();
  //   };
  //   fetchData();
  // }, [showLoading, hideLoading]);

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: RevenueData[] = await API.get(
        `/order/revenue?${queryString.stringify(dateRangeFilter)}`
      );
      const newData = data.map((it) => {
        return { name: it.date, revenue: it.price };
      });
      setOrdersByDate(newData);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, dateRangeFilter]);

  const totalRevenue = useMemo(() => {
    return ordersByDate.reduce((result: number, it: AreaChartAdminData) => {
      return (result += it.revenue);
    }, 0);
  }, [ordersByDate]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between font-medium mb-6">
        <div className="font-bold text-h1 leading-8">Dashboard</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>From</span>
            <input
              type="date"
              name="from"
              value={dateRangeFilter.from}
              className="border py-2 px-4 rounded text-sm"
              onChange={handleDateChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <span>To</span>
            <input
              type="date"
              name="to"
              value={dateRangeFilter.to}
              className="border py-2 px-4 rounded text-sm"
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-rows-4 grid-cols-4 w-full gap-4">
        <Widget
          name="Total Revenue"
          icon={<SvgRevenue />}
          className="col-span-2"
          amount={" $ " + totalRevenue}
        />
        <Widget
          name="Total Client"
          icon={<SvgAccount color="#FFF" />}
          className="col-span-2"
          amount={userList.toString()}
        />
        <div className="row-span-3 col-span-4">
          <h2 className="text-h2 mb-4">Revenue chart</h2>
          <AreaChartAdmin data={ordersByDate} />
        </div>
      </div>
    </div>
  );
};
