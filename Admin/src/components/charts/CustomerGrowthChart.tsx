import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "@/types/dashboard";

export function CustomerGrowthChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 6, left: -10, bottom: 0 }}>
        <CartesianGrid stroke="#eef1ee" vertical={false} />
        <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "white",
            boxShadow: "0 10px 25px -5px rgb(16 24 40 / 0.08)",
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="customers"
          stroke="#3a6c37"
          strokeWidth={2.5}
          dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
