import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useActivityLogs } from "@/hooks/useUsers";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime, getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ActivityLogsPage() {
  const { data, isLoading } = useActivityLogs();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Logs"
        description="Audit who did what across the admin workspace."
      />

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {data?.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={a.user.avatar} />
                      <AvatarFallback>{getInitials(a.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{a.user.name}</span>{" "}
                        <span className="text-muted-foreground">{a.action}</span>{" "}
                        <span className="font-medium">{a.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(a.at)} · IP {a.ip}
                      </p>
                    </div>
                  </div>
                  {a.meta && <Badge variant="outline">{a.meta}</Badge>}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
