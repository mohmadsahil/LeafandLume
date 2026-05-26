import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Copy,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import { useDebounced } from "@/hooks/useDebounced";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { Pagination } from "@/components/common/Pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { CATEGORIES, PRODUCT_STATUSES } from "@/constants/app";
import { useDeleteProduct, useDuplicateProduct, useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
import { toast } from "sonner";

export default function ProductListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [bulkDelete, setBulkDelete] = useState(false);

  const debouncedSearch = useDebounced(search, 300);
  const { data, isLoading } = useProducts({
    page,
    pageSize,
    search: debouncedSearch,
    status: status || undefined,
    category: category || undefined,
  });

  const remove = useDeleteProduct();
  const duplicate = useDuplicateProduct();

  const columns: Column<Product>[] = useMemo(
    () => [
      {
        key: "name",
        header: "Product",
        sortable: true,
        render: (p) => (
          <div className="flex items-center gap-3">
            <img
              src={p.images[0]?.url}
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
              alt={p.name}
            />
            <div className="min-w-0">
              <Link
                to={ROUTES.PRODUCT_DETAILS(p.id)}
                className="block truncate text-sm font-semibold text-foreground hover:text-leaf-700"
              >
                {p.name}
              </Link>
              <p className="truncate text-xs text-muted-foreground">{p.brand}</p>
            </div>
          </div>
        ),
      },
      {
        key: "sku",
        header: "SKU",
        render: (p) => <span className="font-mono text-xs text-muted-foreground">{p.sku}</span>,
      },
      {
        key: "category",
        header: "Category",
        render: (p) => <Badge variant="outline">{p.category}</Badge>,
      },
      {
        key: "salePrice",
        header: "Price",
        sortable: true,
        render: (p) => (
          <div className="space-y-0.5">
            <p className="text-sm font-semibold">{formatCurrency(p.salePrice)}</p>
            {p.salePrice < p.mrpPrice && (
              <p className="text-[11px] text-muted-foreground line-through">
                {formatCurrency(p.mrpPrice)}
              </p>
            )}
          </div>
        ),
      },
      {
        key: "stock",
        header: "Stock",
        sortable: true,
        render: (p) => {
          const total = p.inventory.totalStock;
          const isLow = total <= p.inventory.lowStockAlert;
          return (
            <Badge variant={isLow ? "warning" : "neutral"}>
              {formatNumber(total)} {isLow ? "· low" : ""}
            </Badge>
          );
        },
      },
      {
        key: "rating",
        header: "Rating",
        render: (p) => (
          <div className="flex items-center gap-1 text-sm">
            <span className="font-semibold">{p.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({p.reviewsCount})</span>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (p) => <StatusBadge status={p.status} />,
      },
      {
        key: "actions",
        header: "",
        className: "w-12",
        render: (p) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={(e) => e.stopPropagation()}
                aria-label="Actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigate(ROUTES.PRODUCT_DETAILS(p.id))}>
                <Eye className="h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(ROUTES.PRODUCT_EDIT(p.id))}>
                <Pencil className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  duplicate.mutateAsync(p.id).then((d) => toast.success(`Duplicated ${d.name}`))
                }
              >
                <Copy className="h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem danger onClick={() => setToDelete(p)}>
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [duplicate, navigate],
  );

  const hasFilters = !!(search || status || category);
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setCategory("");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your catalog, pricing, inventory and product variations."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Exported catalog.csv")}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button asChild>
              <Link to={ROUTES.PRODUCT_NEW}>
                <Plus className="h-4 w-4" /> Add Product
              </Link>
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            placeholder="Search by name, SKU, brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            containerClassName="w-[260px]"
          />
          <Select value={status || "all"} onValueChange={(v) => setStatus(v === "all" ? "" : v)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              {PRODUCT_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={category || "all"} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <>
              <Badge variant="outline">{selected.length} selected</Badge>
              <Button variant="outline" size="sm" onClick={() => setBulkDelete(true)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" /> More filters
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        rowKey={(p) => p.id}
        loading={isLoading}
        selectable
        selected={selected}
        onSelectedChange={setSelected}
        emptyTitle="No products yet"
        emptyDescription="Create your first skincare product to get started."
        footer={
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data?.total ?? 0}
            onPageChange={setPage}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPage(1);
            }}
          />
        }
      />

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title={`Delete ${toDelete?.name}?`}
        description="This action cannot be undone. The product and all related data will be permanently removed."
        confirmText="Delete product"
        variant="destructive"
        loading={remove.isPending}
        onConfirm={() =>
          toDelete &&
          remove
            .mutateAsync(toDelete.id)
            .then(() => {
              toast.success("Product deleted");
              setToDelete(null);
            })
        }
      />

      <ConfirmDialog
        open={bulkDelete}
        onOpenChange={setBulkDelete}
        title={`Delete ${selected.length} product${selected.length > 1 ? "s" : ""}?`}
        description="This will remove the selected products permanently."
        confirmText="Delete selection"
        variant="destructive"
        onConfirm={() => {
          toast.success(`${selected.length} products deleted`);
          setSelected([]);
          setBulkDelete(false);
        }}
      />
    </div>
  );
}
