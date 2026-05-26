import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border",
  {
    variants: {
      variant: {
        default: "bg-leaf-50 text-leaf-700 border-leaf-100",
        success: "bg-success-soft text-success border-emerald-200",
        warning: "bg-warning-soft text-warning border-amber-200",
        danger: "bg-red-50 text-red-700 border-red-200",
        info: "bg-info-soft text-info border-sky-200",
        neutral: "bg-muted text-muted-foreground border-border",
        outline: "border-border text-foreground bg-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
