import { useMemo, useState } from "react";
import { Check, Shield, ShieldAlert, Star, ThumbsDown, Video } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApproveReview, useRejectReview, useReviews } from "@/hooks/useReviews";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchInput } from "@/components/common/SearchInput";
import { useDebounced } from "@/hooks/useDebounced";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { formatDate, getInitials } from "@/lib/utils";
import { toast } from "sonner";

export default function ReviewListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const debounced = useDebounced(search);
  const { data, isLoading } = useReviews({ search: debounced, status: status || undefined });
  const approve = useApproveReview();
  const reject = useRejectReview();

  const tab = status || "all";
  const counts = useMemo(() => {
    const all = data?.data ?? [];
    return {
      all: all.length,
      pending: all.filter((r) => r.status === "pending").length,
      approved: all.filter((r) => r.status === "approved").length,
      rejected: all.filter((r) => r.status === "rejected").length,
    };
  }, [data]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews"
        description="Approve, reject and feature customer reviews from your store."
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onValueChange={(v) => setStatus(v === "all" ? "" : v)}>
          <TabsList>
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap items-center gap-2">
          <SearchInput
            placeholder="Search reviews"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            containerClassName="w-[240px]"
          />
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ratings</SelectItem>
              <SelectItem value="5">5 stars</SelectItem>
              <SelectItem value="4">4 stars</SelectItem>
              <SelectItem value="3">3 stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {(isLoading ? Array.from({ length: 4 }) : data?.data ?? []).map((r: any, i: number) => (
          <Card key={r?.id ?? i} className="transition-shadow hover:shadow-elevated">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={r?.customer?.avatar} />
                  <AvatarFallback>{r ? getInitials(r.customer.name) : ""}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm">{r?.customer?.name ?? "Loading…"}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {r ? formatDate(r.createdAt) : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-3.5 w-3.5 ${r && idx < r.rating ? "fill-current" : "opacity-30"}`}
                  />
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/40 p-2">
                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={r?.product?.image}
                    className="h-9 w-9 rounded object-cover"
                    alt={r?.product?.name}
                  />
                  <span className="font-medium">{r?.product?.name}</span>
                </div>
                {r && <StatusBadge status={r.status} />}
              </div>
              {r?.title && <p className="text-sm font-semibold">"{r.title}"</p>}
              <p className="text-sm leading-relaxed">{r?.text}</p>
              {r?.images?.length ? (
                <div className="flex gap-2">
                  {r.images.map((img: string) => (
                    <img
                      key={img}
                      src={img}
                      alt=""
                      className="h-16 w-16 rounded-lg object-cover ring-1 ring-border"
                    />
                  ))}
                </div>
              ) : null}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                <div className="flex items-center gap-2 text-xs">
                  {r?.hasVideo && (
                    <Badge variant="info">
                      <Video className="h-3 w-3" /> Video
                    </Badge>
                  )}
                  <Badge
                    variant={r?.spamScore > 15 ? "danger" : r?.spamScore > 7 ? "warning" : "success"}
                  >
                    {r?.spamScore > 15 ? (
                      <ShieldAlert className="h-3 w-3" />
                    ) : (
                      <Shield className="h-3 w-3" />
                    )}
                    Spam {r?.spamScore}/100
                  </Badge>
                  <label className="ml-2 flex items-center gap-1.5 text-xs">
                    <span className="text-muted-foreground">Featured</span>
                    <Switch
                      defaultChecked={r?.featured}
                      onCheckedChange={(v) => toast.success(v ? "Featured" : "Unfeatured")}
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => r && reject.mutateAsync(r.id).then(() => toast.success("Rejected"))}
                  >
                    <ThumbsDown className="h-4 w-4" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => r && approve.mutateAsync(r.id).then(() => toast.success("Approved"))}
                  >
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
