import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Filter } from "lucide-react";
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
import { useOrders } from "@/hooks/useOrders";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { Pagination } from "@/components/common/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { Order } from "@/types/order";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";
import { ORDER_STATUSES } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export default function OrderListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const debounced = useDebounced(search, 300);

  const { data, isLoading } = useOrders({
    page,
    pageSize,
    search: debounced,
    status: status || undefined,
  });

  const columns: Column<Order>[] = useMemo(
    () => [
      {
        key: "orderNumber",
        header: "Order ID",
        render: (o) => (
          <span className="font-mono text-sm font-semibold text-foreground">{o.orderNumber}</span>
        ),
      },
      {
        key: "customer",
        header: "Customer",
        render: (o) => (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8">
              <AvatarImage src={o.customer.avatar} />
              <AvatarFallback>{getInitials(o.customer.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{o.customer.name}</p>
              <p className="text-xs text-muted-foreground">{o.customer.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: "items",
        header: "Products",
        render: (o) => (
          <Badge variant="outline">
            {o.items.length} item{o.items.length > 1 ? "s" : ""}
          </Badge>
        ),
      },
      {
        key: "total",
        header: "Amount",
        render: (o) => <span className="font-semibold">{formatCurrency(o.total)}</span>,
      },
      {
        key: "payment",
        header: "Payment",
        render: (o) => <StatusBadge status={o.paymentStatus} />,
      },
      {
        key: "status",
        header: "Order",
        render: (o) => <StatusBadge status={o.orderStatus} />,
      },
      {
        key: "createdAt",
        header: "Date",
        render: (o) => <span className="text-sm text-muted-foreground">{formatDate(o.createdAt)}</span>,
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track, fulfill and manage all incoming customer orders."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Exporting orders.csv")}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button>
              <Filter className="h-4 w-4" /> Advanced filters
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput
          placeholder="Search by order #, name, email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          containerClassName="w-[260px]"
        />
        <Select value={status || "all"} onValueChange={(v) => setStatus(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        rowKey={(o) => o.id}
        loading={isLoading}
        onRowClick={(o) => navigate(ROUTES.ORDER_DETAILS(o.id))}
        emptyTitle="No orders yet"
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
    </div>
  );
}
