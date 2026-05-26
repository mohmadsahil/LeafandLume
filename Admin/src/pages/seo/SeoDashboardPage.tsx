import {
  AlertCircle,
  CheckCircle2,
  FileSearch,
  Link2,
  ListChecks,
  Search,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/cards/StatsCard";
import { Progress } from "@/components/ui/progress";
import { useSeoOverview } from "@/hooks/useSEO";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function SeoDashboardPage() {
  const { data, isLoading } = useSeoOverview();

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Overview"
        description="Monitor your site's search performance and recommended fixes."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Average SEO Score"
          value={data ? `${data.averageScore}` : "—"}
          icon={Search}
          tone="primary"
          loading={isLoading}
        />
        <StatsCard
          label="Indexed Pages"
          value={data ? `${data.indexedPages} / ${data.totalPages}` : "—"}
          icon={ListChecks}
          tone="success"
          loading={isLoading}
        />
        <StatsCard
          label="Broken Links"
          value={data?.brokenLinks ?? "—"}
          icon={AlertCircle}
          tone="danger"
          loading={isLoading}
        />
        <StatsCard
          label="Redirects"
          value={data?.redirects ?? "—"}
          icon={Link2}
          tone="info"
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>SEO Health Score</CardTitle>
            <CardDescription>Overall site quality across pages and metadata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              <>
                <div className="flex items-end justify-between">
                  <p className="font-display text-5xl font-bold text-leaf-700">
                    {data!.averageScore}
                    <span className="text-base font-medium text-muted-foreground"> / 100</span>
                  </p>
                  <Badge variant="success">
                    <CheckCircle2 className="h-3 w-3" /> Good
                  </Badge>
                </div>
                <Progress value={data!.averageScore} />
                <p className="text-sm text-muted-foreground">
                  Your site is healthier than 78% of e-commerce stores. Focus on the action items
                  below to push your score above 90.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Keywords</CardTitle>
            <CardDescription>Where your store currently ranks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data?.topKeywords.map((k) => (
              <div
                key={k.keyword}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{k.keyword}</p>
                  <p className="text-xs text-muted-foreground">
                    Vol. {k.volume.toLocaleString()}
                  </p>
                </div>
                <Badge variant="default">
                  <TrendingUp className="h-3 w-3" /> #{k.position}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSearch className="h-4 w-4 text-leaf-600" /> Recommendations
          </CardTitle>
          <CardDescription>Apply these to improve SEO quickly.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data?.recommendations.map((rec) => (
              <li
                key={rec.id}
                className="flex items-start justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={
                      "mt-1 inline-block h-2 w-2 rounded-full " +
                      (rec.level === "critical"
                        ? "bg-red-500"
                        : rec.level === "warning"
                          ? "bg-amber-500"
                          : "bg-sky-500")
                    }
                  />
                  <p className="text-sm">{rec.message}</p>
                </div>
                <Badge
                  variant={
                    rec.level === "critical"
                      ? "danger"
                      : rec.level === "warning"
                        ? "warning"
                        : "info"
                  }
                  className="capitalize"
                >
                  {rec.level}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
