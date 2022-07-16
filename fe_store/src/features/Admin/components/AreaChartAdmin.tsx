import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type AreaChartAdminData = {
  name: string;
  revenue: number;
};

export interface AreaChartAdminProps {
  data: AreaChartAdminData[];
}

export const AreaChartAdmin = ({ data }: AreaChartAdminProps): JSX.Element => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          fill="#8884d8"
        />
        {/* <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="#8884d8" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};
