import { ReactNode, useMemo } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";

export type Column<T> = {
  key: string;
  header: ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
  render: (row: T) => ReactNode;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  selected?: string[];
  onSelectedChange?: (ids: string[]) => void;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  onSortChange?: (key: string) => void;
  footer?: ReactNode;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  loading,
  emptyTitle = "Nothing to show",
  emptyDescription = "Try adjusting your filters or check back later.",
  onRowClick,
  selectable,
  selected = [],
  onSelectedChange,
  sortBy,
  sortDir,
  onSortChange,
  footer,
  className,
}: DataTableProps<T>) {
  const allIds = useMemo(() => data.map(rowKey), [data, rowKey]);
  const allChecked = selectable && allIds.length > 0 && selected.length === allIds.length;
  const someChecked = selectable && selected.length > 0 && !allChecked;

  const toggleAll = () => {
    if (!onSelectedChange) return;
    onSelectedChange(allChecked ? [] : allIds);
  };

  const toggleRow = (id: string) => {
    if (!onSelectedChange) return;
    onSelectedChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id],
    );
  };

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr className="border-b border-border">
              {selectable && (
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={allChecked || (someChecked ? "indeterminate" : false)}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sortBy === col.key;
                return (
                  <th
                    key={col.key}
                    className={cn(
                      "whitespace-nowrap px-4 py-3 text-left font-semibold",
                      col.sortable && "cursor-pointer select-none hover:text-foreground",
                      col.headerClassName,
                    )}
                    onClick={col.sortable ? () => onSortChange?.(col.key) : undefined}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.header}
                      {col.sortable &&
                        (isSorted ? (
                          sortDir === "asc" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-40" />
                        ))}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="hover:bg-transparent">
                    {selectable && (
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-4" />
                      </td>
                    )}
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-4">
                        <Skeleton className="h-4 w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.length === 0
                ? (
                  <tr>
                    <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6">
                      <EmptyState title={emptyTitle} description={emptyDescription} />
                    </td>
                  </tr>
                )
                : data.map((row) => {
                    const id = rowKey(row);
                    return (
                      <tr
                        key={id}
                        className={cn(
                          "group transition-colors",
                          onRowClick && "cursor-pointer hover:bg-muted/40",
                        )}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                      >
                        {selectable && (
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selected.includes(id)}
                              onCheckedChange={() => toggleRow(id)}
                              aria-label="Select row"
                            />
                          </td>
                        )}
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className={cn("px-4 py-3 align-middle", col.className)}
                          >
                            {col.render(row)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
          </tbody>
        </table>
      </div>
      {footer}
    </div>
  );
}
