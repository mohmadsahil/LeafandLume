import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "@/types/dashboard";
import { formatCompact, formatCurrency } from "@/lib/utils";

export function RevenueAreaChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 6, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#549641" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#549641" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#eef1ee" vertical={false} />
        <XAxis
          dataKey="label"
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(v) => `$${formatCompact(v)}`}
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            background: "white",
            boxShadow: "0 10px 25px -5px rgb(16 24 40 / 0.08)",
            fontSize: 12,
          }}
          formatter={(v: number) => formatCurrency(v)}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3a6c37"
          strokeWidth={2.2}
          fill="url(#revGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
