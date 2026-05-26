import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/cards/StatsCard";
import { MousePointerClick, Eye, Layers, Percent } from "lucide-react";
import { useBanners } from "@/hooks/useBanners";
import { OrdersBarChart } from "@/components/charts/OrdersBarChart";
import { formatNumber } from "@/lib/utils";

export default function BannerAnalyticsPage() {
  const { data } = useBanners();
  const banners = data?.data ?? [];
  const totalImpressions = banners.reduce((s, b) => s + b.impressions, 0);
  const totalClicks = banners.reduce((s, b) => s + b.clicks, 0);
  const ctr = totalImpressions > 0 ? +((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

  const series = banners.map((b) => ({ label: b.title.slice(0, 14), orders: b.clicks }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banner Analytics"
        description="Impressions, clicks and conversion performance for your banners."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Banners" value={banners.length} icon={Layers} tone="primary" />
        <StatsCard
          label="Impressions"
          value={formatNumber(totalImpressions)}
          icon={Eye}
          tone="info"
        />
        <StatsCard
          label="Clicks"
          value={formatNumber(totalClicks)}
          icon={MousePointerClick}
          tone="success"
        />
        <StatsCard label="Avg. CTR" value={`${ctr}%`} icon={Percent} tone="warning" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clicks by Banner</CardTitle>
          <CardDescription>How each banner is performing.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrdersBarChart data={series} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2.5 text-left">Banner</th>
                  <th className="py-2.5 text-left">Type</th>
                  <th className="py-2.5 text-right">Impressions</th>
                  <th className="py-2.5 text-right">Clicks</th>
                  <th className="py-2.5 text-right">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {banners.map((b) => (
                  <tr key={b.id}>
                    <td className="py-2.5 font-medium">{b.title}</td>
                    <td className="py-2.5 text-muted-foreground">{b.type}</td>
                    <td className="py-2.5 text-right">{formatNumber(b.impressions)}</td>
                    <td className="py-2.5 text-right">{formatNumber(b.clicks)}</td>
                    <td className="py-2.5 text-right font-semibold">{b.ctr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
