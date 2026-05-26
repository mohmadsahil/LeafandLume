import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBanners, useDeleteBanner } from "@/hooks/useBanners";
import { ROUTES } from "@/constants/routes";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
import type { Banner } from "@/types/banner";
import { Switch } from "@/components/ui/switch";
import { formatDate, formatNumber } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function BannerListPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useBanners();
  const remove = useDeleteBanner();
  const [toDelete, setToDelete] = useState<Banner | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banners"
        description="Manage hero banners, popups, and seasonal promotions across the storefront."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to={ROUTES.BANNER_ANALYTICS}>
                <TrendingUp className="h-4 w-4" /> Analytics
              </Link>
            </Button>
            <Button asChild>
              <Link to={ROUTES.BANNER_NEW}>
                <Plus className="h-4 w-4" /> Add Banner
              </Link>
            </Button>
          </>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data?.data.map((b) => (
            <Card
              key={b.id}
              className="group overflow-hidden transition-shadow hover:shadow-elevated"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={b.desktopImage}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={b.title}
                />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <Badge variant="default">{b.type}</Badge>
                  <StatusBadge status={b.status} />
                </div>
                <div className="absolute right-3 top-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon-sm"
                        variant="outline"
                        className="bg-white/95 backdrop-blur"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(ROUTES.BANNER_EDIT(b.id))}>
                        <Pencil className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem danger onClick={() => setToDelete(b)}>
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardContent className="space-y-3 p-4">
                <div>
                  <h3 className="font-display text-base font-semibold">{b.title}</h3>
                  {b.subtitle && <p className="text-sm text-muted-foreground">{b.subtitle}</p>}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{b.position}</span>
                  <span className="text-border">•</span>
                  <span>
                    {formatDate(b.startDate)}
                    {b.endDate ? ` → ${formatDate(b.endDate)}` : ""}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Stat label="Impressions" value={formatNumber(b.impressions)} />
                  <Stat label="Clicks" value={formatNumber(b.clicks)} />
                  <Stat label="CTR" value={`${b.ctr}%`} />
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    Active
                    <Switch
                      defaultChecked={b.status === "active"}
                      onCheckedChange={(c) => toast.success(c ? "Banner activated" : "Banner paused")}
                    />
                  </div>
                  <Button asChild size="sm" variant="ghost" className="text-leaf-700">
                    <Link to={ROUTES.BANNER_EDIT(b.id)}>
                      <Pencil className="h-4 w-4" /> Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        onOpenChange={(o) => !o && setToDelete(null)}
        title={`Delete "${toDelete?.title}"?`}
        description="This banner will be removed from your storefront."
        confirmText="Delete banner"
        variant="destructive"
        loading={remove.isPending}
        onConfirm={() =>
          toDelete &&
          remove.mutateAsync(toDelete.id).then(() => {
            toast.success("Banner deleted");
            setToDelete(null);
          })
        }
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted/40 p-2 text-center">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
