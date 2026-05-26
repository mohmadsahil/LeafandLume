import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-2 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="space-y-1.5">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-[28px]">
          {title}
        </h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
