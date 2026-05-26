import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import { useDebounced } from "@/hooks/useDebounced";
import { useCustomers } from "@/hooks/useCustomers";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { Pagination } from "@/components/common/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Customer } from "@/types/customer";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatCurrency, formatNumber, getInitials } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export default function CustomerListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const debounced = useDebounced(search, 300);
  const { data, isLoading } = useCustomers({ page, pageSize, search: debounced });

  const columns: Column<Customer>[] = useMemo(
    () => [
      {
        key: "name",
        header: "Customer",
        render: (c) => (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9">
              <AvatarImage src={c.avatar} />
              <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.email}</p>
            </div>
          </div>
        ),
      },
      { key: "phone", header: "Phone", render: (c) => <span className="text-sm">{c.phone}</span> },
      {
        key: "orders",
        header: "Orders",
        render: (c) => <Badge variant="outline">{formatNumber(c.ordersCount)}</Badge>,
      },
      {
        key: "spend",
        header: "Total Spend",
        render: (c) => <span className="font-semibold">{formatCurrency(c.totalSpend)}</span>,
      },
      {
        key: "skinType",
        header: "Skin Type",
        render: (c) => <Badge variant="default">{c.skinType}</Badge>,
      },
      {
        key: "concerns",
        header: "Concerns",
        render: (c) => (
          <div className="flex flex-wrap gap-1">
            {c.skinConcerns.slice(0, 2).map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
            {c.skinConcerns.length > 2 && (
              <Badge variant="neutral">+{c.skinConcerns.length - 2}</Badge>
            )}
          </div>
        ),
      },
      {
        key: "loyalty",
        header: "Loyalty",
        render: (c) => <span className="text-sm font-medium">{formatNumber(c.loyaltyPoints)} pts</span>,
      },
      { key: "status", header: "Status", render: (c) => <StatusBadge status={c.status} /> },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="View profiles, purchase history and skin preferences."
        actions={
          <Button variant="outline" onClick={() => toast.success("Customer CSV exported")}>
            <Download className="h-4 w-4" /> Export
          </Button>
        }
      />

      <SearchInput
        placeholder="Search by name, email, phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        containerClassName="w-[280px]"
      />

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        rowKey={(c) => c.id}
        loading={isLoading}
        onRowClick={(c) => navigate(ROUTES.CUSTOMER_DETAILS(c.id))}
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
