import { Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable, type Column } from "@/components/tables/DataTable";
import { useSeoRedirects } from "@/hooks/useSEO";
import type { SeoRedirect } from "@/types/seo";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatNumber } from "@/lib/utils";
import { toast } from "sonner";

export default function SeoRedirectsPage() {
  const { data, isLoading } = useSeoRedirects();

  const columns: Column<SeoRedirect>[] = [
    { key: "from", header: "From", render: (r) => <code className="font-mono text-xs">{r.from}</code> },
    { key: "to", header: "To", render: (r) => <code className="font-mono text-xs">{r.to}</code> },
    {
      key: "type",
      header: "Type",
      render: (r) => <Badge variant={r.type === "301" ? "success" : "info"}>{r.type}</Badge>,
    },
    { key: "hits", header: "Hits", render: (r) => formatNumber(r.hits) },
    { key: "createdAt", header: "Created", render: (r) => formatDate(r.createdAt) },
    {
      key: "actions",
      header: "",
      render: () => (
        <Button variant="ghost" size="icon-sm" className="text-red-600">
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Redirects"
        description="Manage 301 and 302 redirects to preserve SEO equity."
      />

      <Card>
        <CardHeader>
          <CardTitle>Add Redirect</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_120px_140px]"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Redirect added");
            }}
          >
            <div className="space-y-1">
              <Label className="text-xs">From URL</Label>
              <Input placeholder="/old-url" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">To URL</Label>
              <Input placeholder="/new-url" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Type</Label>
              <Input defaultValue="301" />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        data={data ?? []}
        rowKey={(r) => r.id}
        loading={isLoading}
        emptyTitle="No redirects"
      />
    </div>
  );
}
