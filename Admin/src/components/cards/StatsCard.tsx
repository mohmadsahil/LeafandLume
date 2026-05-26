import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TrendBadge } from "@/components/common/TrendBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  label: string;
  value: string | number;
  delta?: number;
  hint?: string;
  icon: LucideIcon;
  tone?: "primary" | "info" | "warning" | "danger" | "success";
  loading?: boolean;
  className?: string;
};

const toneStyles: Record<NonNullable<StatsCardProps["tone"]>, string> = {
  primary: "bg-leaf-50 text-leaf-700",
  info: "bg-sky-50 text-sky-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  success: "bg-emerald-50 text-emerald-700",
};

export function StatsCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  tone = "primary",
  loading,
  className,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden p-5 transition-all hover:shadow-elevated",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            {loading ? (
              <Skeleton className="h-7 w-24" />
            ) : (
              <p className="font-display text-2xl font-bold tracking-tight text-foreground">
                {value}
              </p>
            )}
            <div className="flex items-center gap-2">
              {typeof delta === "number" && <TrendBadge delta={delta} />}
              {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
            </div>
          </div>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl shadow-soft transition-transform group-hover:scale-105",
              toneStyles[tone],
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
