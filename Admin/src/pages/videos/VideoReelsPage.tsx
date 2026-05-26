import { Heart, MessageCircle, Music2, Play, Share2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useVideos } from "@/hooks/useVideos";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

export default function VideoReelsPage() {
  const { data, isLoading } = useVideos();
  const reels = (data?.data ?? []).filter((v) => v.type === "Reel" || v.featured);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reels"
        description="Vertical, short-form videos featured across product pages and the home feed."
      />

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[9/16] w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {reels.map((v) => (
            <div
              key={v.id}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-black shadow-soft"
            >
              <img
                src={v.thumbnail}
                className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                alt={v.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <Badge className="absolute left-3 top-3" variant="default">
                {v.type}
              </Badge>
              <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 text-white">
                <button className="rounded-full bg-white/15 p-2 backdrop-blur transition hover:bg-white/25">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="rounded-full bg-white/15 p-2 backdrop-blur transition hover:bg-white/25">
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button className="rounded-full bg-white/15 p-2 backdrop-blur transition hover:bg-white/25">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <p className="font-display text-sm font-semibold line-clamp-1">{v.title}</p>
                <div className="mt-1 flex items-center justify-between text-[11px] opacity-90">
                  <span className="inline-flex items-center gap-1">
                    <Music2 className="h-3 w-3" /> Original audio
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Play className="h-3 w-3 fill-current" /> {formatNumber(v.views)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
