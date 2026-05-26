import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrendBadge({ delta, className }: { delta: number; className?: string }) {
  const positive = delta >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        positive ? "bg-success-soft text-success" : "bg-red-50 text-red-700",
        className,
      )}
    >
      {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {positive ? "+" : ""}
      {delta.toFixed(1)}%
    </span>
  );
}
