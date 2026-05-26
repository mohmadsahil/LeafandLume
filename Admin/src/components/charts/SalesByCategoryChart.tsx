import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "@/types/dashboard";

export function SalesByCategoryChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 8, left: 12, bottom: 0 }}
      >
        <CartesianGrid stroke="#eef1ee" horizontal={false} />
        <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          dataKey="label"
          type="category"
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={88}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "white",
            boxShadow: "0 10px 25px -5px rgb(16 24 40 / 0.08)",
            fontSize: 12,
          }}
        />
        <Bar dataKey="sales" fill="#94be91" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
