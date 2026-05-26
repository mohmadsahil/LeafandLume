import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  Film,
  Heart,
  MoreHorizontal,
  Pencil,
  Play,
  Plus,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDebounced } from "@/hooks/useDebounced";
import { useDeleteVideo, useVideos } from "@/hooks/useVideos";
import { ROUTES } from "@/constants/routes";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchInput } from "@/components/common/SearchInput";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
import type { Video } from "@/types/video";
import { VIDEO_TYPES } from "@/constants/app";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function VideoListPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const debounced = useDebounced(search);
  const { data, isLoading } = useVideos({ search: debounced, status: type || undefined });
  const remove = useDeleteVideo();
  const [toDelete, setToDelete] = useState<Video | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Videos"
        description="Manage product videos, tutorials, testimonials and reels."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to={ROUTES.VIDEO_ANALYTICS}>
                <TrendingUp className="h-4 w-4" /> Analytics
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={ROUTES.REELS}>
                <Film className="h-4 w-4" /> Reels
              </Link>
            </Button>
            <Button asChild>
              <Link to={ROUTES.VIDEO_NEW}>
                <Plus className="h-4 w-4" /> Upload Video
              </Link>
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <SearchInput
          placeholder="Search videos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          containerClassName="w-[260px]"
        />
        <Select value={type || "all"} onValueChange={(v) => setType(v === "all" ? "" : v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {VIDEO_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((v) => (
            <Card key={v.id} className="group overflow-hidden hover:shadow-elevated">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={v.thumbnail}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={v.title}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" className="rounded-full">
                    <Play className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  {v.duration}
                </span>
                <div className="absolute left-2 top-2">
                  <Badge variant="default">{v.type}</Badge>
                </div>
              </div>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-base font-semibold">{v.title}</h3>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{v.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(ROUTES.VIDEO_EDIT(v.id))}>
                        <Pencil className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem danger onClick={() => setToDelete(v)}>
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {formatNumber(v.views)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" /> {formatNumber(v.likes)}
                    </span>
                  </div>
                  <StatusBadge status={v.status} />
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
        confirmText="Delete video"
        variant="destructive"
        onConfirm={() =>
          toDelete &&
          remove.mutateAsync(toDelete.id).then(() => {
            toast.success("Video deleted");
            setToDelete(null);
          })
        }
      />
    </div>
  );
}
