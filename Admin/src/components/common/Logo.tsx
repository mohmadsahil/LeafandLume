import { cn } from "@/lib/utils";
import { APP } from "@/constants/app";

type LogoProps = {
  className?: string;
  variant?: "full" | "icon";
};

export function Logo({ className, variant = "full" }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-leaf-400 to-leaf-600 text-white shadow-soft">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96a1 1 0 0 1 1.8.2c.6 1.6 1 5-2 9-2 2.5-5 4-9 4Z" />
          <path d="M2 22c1.04-.97 3-4 6-7" />
        </svg>
      </span>
      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            {APP.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {APP.tagline}
          </span>
        </div>
      )}
    </div>
  );
}
