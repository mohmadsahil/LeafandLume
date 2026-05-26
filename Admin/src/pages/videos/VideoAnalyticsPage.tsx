import { Eye, Film, Heart, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/cards/StatsCard";
import { useVideos } from "@/hooks/useVideos";
import { OrdersBarChart } from "@/components/charts/OrdersBarChart";
import { formatNumber } from "@/lib/utils";

export default function VideoAnalyticsPage() {
  const { data } = useVideos();
  const videos = data?.data ?? [];
  const totalViews = videos.reduce((s, v) => s + v.views, 0);
  const totalLikes = videos.reduce((s, v) => s + v.likes, 0);
  const engagement = totalViews ? +((totalLikes / totalViews) * 100).toFixed(2) : 0;
  const series = videos.map((v) => ({ label: v.title.slice(0, 12), orders: v.views }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Video Analytics"
        description="Track views, likes and engagement across your video content."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Videos" value={videos.length} icon={Film} tone="primary" />
        <StatsCard label="Total Views" value={formatNumber(totalViews)} icon={Eye} tone="info" />
        <StatsCard label="Total Likes" value={formatNumber(totalLikes)} icon={Heart} tone="success" />
        <StatsCard label="Engagement" value={`${engagement}%`} icon={TrendingUp} tone="warning" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Views by Video</CardTitle>
          <CardDescription>Top performing content.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersBarChart data={series} />
        </CardContent>
      </Card>
    </div>
  );
}
