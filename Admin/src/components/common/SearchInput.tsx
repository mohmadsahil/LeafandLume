import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void;
  containerClassName?: string;
};

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, value, onClear, ...props }, ref) => {
    const showClear = !!value && (value as string).length > 0 && onClear;
    return (
      <div className={cn("relative", containerClassName)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={ref}
          value={value}
          className={cn(
            "h-10 w-full rounded-lg border border-input bg-white pl-9 pr-9 py-2 text-sm shadow-soft",
            "placeholder:text-muted-foreground transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:border-primary/40",
            className,
          )}
          {...props}
        />
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";
