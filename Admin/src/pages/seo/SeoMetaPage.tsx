import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { useSeoPages } from "@/hooks/useSEO";
import type { SeoPage } from "@/types/seo";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function SeoMetaPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSeoPages();

  const pages = useMemo(() => {
    const list = data ?? [];
    if (!search) return list;
    const s = search.toLowerCase();
    return list.filter(
      (p) => p.url.toLowerCase().includes(s) || p.title.toLowerCase().includes(s),
    );
  }, [data, search]);

  const columns: Column<SeoPage>[] = [
    {
      key: "page",
      header: "Page",
      render: (p) => (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{p.title}</p>
          <p className="truncate text-xs text-muted-foreground">{p.url}</p>
        </div>
      ),
    },
    {
      key: "meta",
      header: "Meta",
      render: (p) => (
        <div className="min-w-0 space-y-0.5">
          <p className="truncate text-xs text-muted-foreground">
            {p.metaTitle || <span className="text-red-600">No meta title</span>}
          </p>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {p.metaDescription || <span className="text-red-600">No meta description</span>}
          </p>
        </div>
      ),
    },
    {
      key: "keywords",
      header: "Keywords",
      render: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.keywords.map((k) => (
            <Badge key={k} variant="outline">
              {k}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "indexed",
      header: "Indexed",
      render: (p) =>
        p.indexed ? <Badge variant="success">Yes</Badge> : <Badge variant="danger">No</Badge>,
    },
    {
      key: "score",
      header: "Score",
      render: (p) => (
        <div className="min-w-[120px] space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold">{p.score}</span>
            <StatusBadge status={p.status} />
          </div>
          <Progress value={p.score} />
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      render: () => (
        <Button variant="ghost" size="icon-sm">
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Meta Pages"
        description="Manage page-level SEO metadata for products, collections and content pages."
      />

      <SearchInput
        placeholder="Search by page URL or title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        containerClassName="w-[320px]"
      />

      <DataTable columns={columns} data={pages} rowKey={(p) => p.id} loading={isLoading} />
    </div>
  );
}
