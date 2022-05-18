import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

export const Chart = (): JSX.Element => {
  return (
    <ResponsiveContainer height="100%">
      <LineChart width={400} height={400} data={data}>
        <Tooltip />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
