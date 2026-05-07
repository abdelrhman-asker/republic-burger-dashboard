"use client";

import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
  ReferenceDot,
  Area,
} from "recharts";

const ordersData = [
  { day: "Sun", orders: 1 },
  { day: "Mon", orders: 2 },
  { day: "Tue", orders: 1.5 },
  { day: "Wed", orders: 3 },
  { day: "Thu", orders: 4 },
  { day: "Fri", orders: 3 },
  { day: "Sat", orders: 2.5 },
];

const revenuesData = [
  { branch: "Nasr City", revenue: 4000, color: "#FF8A00" },
  { branch: "Nasr City", revenue: 1000, color: "#E50914" },
  { branch: "Airport", revenue: 5600, color: "#FF8A00" },
  { branch: "Airport", revenue: 1400, color: "#E50914" },
  { branch: "Airport", revenue: 3000, color: "#FF8A00" },
  { branch: "Airport", revenue: 5400, color: "#E50914" },
  { branch: "Airport", revenue: 1600, color: "#FF8A00" },
];
const yAxisLabels: Record<number, string> = {
  0: "9AM",
  1: "10AM",
  2: "1AM",
  3: "2AM",
  4: "3AM",
  5: "11PM",
};
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload.day !== "Thu") return null;

  return (
    <g>
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={180}
        stroke="#FF8A00"
        strokeDasharray="4 4"
        strokeWidth={1}
      />
      
      <circle cx={cx} cy={cy} r={5} fill="#fff" stroke="#FF8A00" strokeWidth={2} />
 <rect
        x={cx - 26}
        y={cy - 30}
        width={52}
        height={18}
        rx={6}
        fill="#fff"
        filter="drop-shadow(0px 2px 6px rgba(0,0,0,0.12))"
      />

      <text
        x={cx}
        y={cy - 17}
        textAnchor="middle"
        fill="#FF8A00"
        fontSize={10}
        fontWeight={600}
      >        50 Orders
      </text>
    </g>
  );
};
export default function DashboardCharts() {
  return (
    <div className="mt-8 flex flex-wrap gap-[3%] max-w-[100%] w-full ">
      {/* Orders over time */}
      <div className="flex flex-col justify-between rounded-[12px] w-[44%] min-w-[350px] border border-[#DEDEDE] bg-white p-6">
        <h2 className="mb-6 text-[24px] font-extrabold text-mainBlack">
          Orders over time
        </h2>
        <div className="h-[210px]">
          <ResponsiveContainer width="100%" height="100%">
<AreaChart data={ordersData} margin={{ top: 20, right: 40, left: -10, bottom: 0 }}>
  <defs>
    <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FF8A00" stopOpacity={0.15} />
      <stop offset="100%" stopColor="#FF8A00" stopOpacity={0} />
    </linearGradient>
  </defs>
  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d3d3d3" />
  <XAxis  dataKey="day" tick={{ fontSize: 11, fill: "#1A1A1A" }} axisLine={false} tickLine={false} tickMargin={10} />
  <YAxis
    width={40}
    type="number"
    domain={[0, 5]}
    ticks={[0, 1, 2, 3, 4, 5]}
    tickFormatter={(value) => yAxisLabels[value] ?? value}
    tick={{ fontSize: 11, fill: "#1A1A1A" }}
    axisLine={false}
    tickLine={false}
    interval={0}
  />
  <Tooltip />
  <Area
    type="monotone"
    dataKey="orders"
    stroke="#FF8A00"
    strokeWidth={2}
    fill="url(#ordersGradient)"
    fillOpacity={1}
    dot={<CustomDot />}
    activeDot={{ r: 5, fill: "#fff", stroke: "#FF8A00", strokeWidth: 2 }}
  />
</AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenues by Branch */}
      <div className="rounded-[12px] w-[53%] min-w-[350px] border border-[#DEDEDE] bg-white p-6">
        <h2 className="mb-6 text-[24px] font-extrabold text-mainBlack">
          Revenues by Branch
        </h2>
        <div className="h-[315px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenuesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="branch"
                tick={{ fontSize: 11, fill: "#9E9E9E" }}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9E9E9E" }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 1000, 2000, 4000, 6000, 8000, 10000]}
                tickMargin={10}
              />
              <Tooltip />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={22}>
                {revenuesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}