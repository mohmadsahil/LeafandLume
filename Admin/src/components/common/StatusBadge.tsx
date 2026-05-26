import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_MAP: Record<string, { label?: string; variant: "success" | "warning" | "danger" | "info" | "neutral" | "default" }> = {
  active: { variant: "success" },
  inactive: { variant: "neutral" },
  scheduled: { variant: "info" },
  pending: { variant: "warning" },
  processing: { variant: "info" },
  shipped: { variant: "info" },
  delivered: { variant: "success" },
  cancelled: { variant: "danger" },
  returned: { variant: "danger" },
  paid: { variant: "success" },
  failed: { variant: "danger" },
  refunded: { variant: "neutral" },
  draft: { variant: "neutral" },
  published: { variant: "success" },
  archived: { variant: "neutral" },
  approved: { variant: "success" },
  rejected: { variant: "danger" },
  new: { variant: "info" },
  "in-progress": { variant: "warning", label: "In progress" },
  resolved: { variant: "success" },
  closed: { variant: "neutral" },
  invited: { variant: "info" },
  good: { variant: "success" },
  warning: { variant: "warning" },
  poor: { variant: "danger" },
  low: { variant: "neutral" },
  medium: { variant: "info" },
  high: { variant: "warning" },
  urgent: { variant: "danger" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const config = STATUS_MAP[status] ?? { variant: "default" as const };
  const label = config.label ?? status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <Badge variant={config.variant} className={cn("capitalize", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </Badge>
  );
}
