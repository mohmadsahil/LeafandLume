import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ShieldCheck, ShieldOff } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/common/SearchInput";
import { useDebounced } from "@/hooks/useDebounced";
import { useUsers } from "@/hooks/useUsers";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { Pagination } from "@/components/common/Pagination";
import type { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { formatDateTime, getInitials } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export default function UserListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const debounced = useDebounced(search);
  const { data, isLoading } = useUsers({ page, pageSize, search: debounced });

  const columns: Column<User>[] = useMemo(
    () => [
      {
        key: "name",
        header: "User",
        render: (u) => (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9">
              <AvatarImage src={u.avatar} />
              <AvatarFallback>{getInitials(u.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{u.name}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
          </div>
        ),
      },
      { key: "role", header: "Role", render: (u) => <Badge variant="default">{u.role}</Badge> },
      {
        key: "twoFactor",
        header: "2FA",
        render: (u) =>
          u.twoFactor ? (
            <Badge variant="success">
              <ShieldCheck className="h-3 w-3" /> Enabled
            </Badge>
          ) : (
            <Badge variant="neutral">
              <ShieldOff className="h-3 w-3" /> Disabled
            </Badge>
          ),
      },
      {
        key: "lastLogin",
        header: "Last Login",
        render: (u) => (
          <span className="text-xs text-muted-foreground">
            {u.lastLogin ? formatDateTime(u.lastLogin) : "Never"}
          </span>
        ),
      },
      { key: "status", header: "Status", render: (u) => <StatusBadge status={u.status} /> },
      {
        key: "active",
        header: "Active",
        render: (u) => (
          <Switch
            defaultChecked={u.status === "active"}
            onCheckedChange={(v) => toast.success(v ? "User activated" : "User deactivated")}
          />
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage admin accounts, roles, and login access."
        actions={
          <Button asChild>
            <Link to={ROUTES.USER_NEW}>
              <Plus className="h-4 w-4" /> Add User
            </Link>
          </Button>
        }
      />

      <SearchInput
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        containerClassName="w-[280px]"
      />

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        rowKey={(u) => u.id}
        loading={isLoading}
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
