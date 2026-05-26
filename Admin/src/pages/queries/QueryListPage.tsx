import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { useDebounced } from "@/hooks/useDebounced";
import { useContactQueries } from "@/hooks/useQueries";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { Pagination } from "@/components/common/Pagination";
import type { Query } from "@/types/query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDateTime, getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/constants/routes";

export default function QueryListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const debounced = useDebounced(search);
  const { data, isLoading } = useContactQueries({
    page,
    pageSize,
    search: debounced,
    status: status || undefined,
  });

  const columns: Column<Query>[] = useMemo(
    () => [
      {
        key: "name",
        header: "From",
        render: (q) => (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{getInitials(q.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{q.name}</p>
              <p className="text-xs text-muted-foreground">{q.email}</p>
            </div>
          </div>
        ),
      },
      {
        key: "subject",
        header: "Subject",
        render: (q) => (
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{q.subject}</p>
            <p className="line-clamp-1 text-xs text-muted-foreground">{q.message}</p>
          </div>
        ),
      },
      {
        key: "priority",
        header: "Priority",
        render: (q) => <StatusBadge status={q.priority} />,
      },
      {
        key: "assignedTo",
        header: "Assigned",
        render: (q) =>
          q.assignedTo ? (
            <Badge variant="default">{q.assignedTo.name}</Badge>
          ) : (
            <Badge variant="neutral">Unassigned</Badge>
          ),
      },
      { key: "status", header: "Status", render: (q) => <StatusBadge status={q.status} /> },
      {
        key: "createdAt",
        header: "Received",
        render: (q) => <span className="text-xs text-muted-foreground">{formatDateTime(q.createdAt)}</span>,
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Queries"
        description="Reply to customer messages, assign tickets and track resolution."
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={status || "all"} onValueChange={(v) => setStatus(v === "all" ? "" : v)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="in-progress">In progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>
        <SearchInput
          placeholder="Search by name, subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          containerClassName="w-[260px]"
        />
      </div>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        rowKey={(q) => q.id}
        loading={isLoading}
        onRowClick={(q) => navigate(ROUTES.QUERY_DETAILS(q.id))}
        emptyTitle="No queries yet"
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
