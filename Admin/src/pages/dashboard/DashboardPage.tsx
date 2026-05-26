import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  CircleDollarSign,
  Download,
  FileText,
  Filter,
  Package,
  PackageX,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/cards/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/hooks/useDashboard";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils";
import { RevenueAreaChart } from "@/components/charts/RevenueAreaChart";
import { OrdersBarChart } from "@/components/charts/OrdersBarChart";
import { CustomerGrowthChart } from "@/components/charts/CustomerGrowthChart";
import { SalesByCategoryChart } from "@/components/charts/SalesByCategoryChart";
import { TrafficDonut } from "@/components/charts/TrafficDonut";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { useReviews } from "@/hooks/useReviews";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { getInitials } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

const RANGE_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "12m", label: "Last 12 months" },
];

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();
  const { data: ordersData } = useOrders({ pageSize: 6 });
  const { data: productsData } = useProducts({ pageSize: 10, sortBy: "totalSold", sortDir: "desc" });
  const { data: reviewsData } = useReviews({ pageSize: 4 });
  const [range, setRange] = useState("30d");

  const stats = data?.stats;

  const recentOrders = ordersData?.data ?? [];
  const topProducts = (productsData?.data ?? []).slice(0, 5);
  const lowStockProducts =
    (productsData?.data ?? []).filter((p) => p.inventory.totalStock <= p.inventory.lowStockAlert).slice(0, 5);
  const recentReviews = reviewsData?.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back, Sahil"
        description="Here's what's blooming across Leaf & Lume today."
        actions={
          <>
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="h-10 w-[160px]">
                <Calendar className="mr-1.5 h-4 w-4 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RANGE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <Button variant="outline" onClick={() => toast.success("Exporting analytics CSV…")}>
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button onClick={() => toast.success("Generating PDF report…")}>
              <FileText className="h-4 w-4" /> Download Report
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Total Revenue"
          value={stats ? formatCurrency(stats.totalRevenue.value) : "—"}
          delta={stats?.totalRevenue.delta}
          hint="vs last period"
          icon={CircleDollarSign}
          tone="primary"
          loading={isLoading}
        />
        <StatsCard
          label="Total Orders"
          value={stats ? formatNumber(stats.totalOrders.value) : "—"}
          delta={stats?.totalOrders.delta}
          icon={ShoppingBag}
          tone="info"
          loading={isLoading}
        />
        <StatsCard
          label="Total Customers"
          value={stats ? formatNumber(stats.totalCustomers.value) : "—"}
          delta={stats?.totalCustomers.delta}
          icon={Users}
          tone="success"
          loading={isLoading}
        />
        <StatsCard
          label="Conversion Rate"
          value={stats ? `${stats.conversionRate.value}%` : "—"}
          delta={stats?.conversionRate.delta}
          icon={TrendingUp}
          tone="warning"
          loading={isLoading}
        />
        <StatsCard
          label="Active Subscriptions"
          value={stats ? formatNumber(stats.activeSubscriptions.value) : "—"}
          delta={stats?.activeSubscriptions.delta}
          icon={Sparkles}
          tone="primary"
          loading={isLoading}
        />
        <StatsCard
          label="Refund Orders"
          value={stats ? formatNumber(stats.refundOrders.value) : "—"}
          delta={stats?.refundOrders.delta}
          icon={RefreshCw}
          tone="danger"
          loading={isLoading}
        />
        <StatsCard
          label="Pending Orders"
          value={stats ? formatNumber(stats.pendingOrders.value) : "—"}
          delta={stats?.pendingOrders.delta}
          icon={Package}
          tone="warning"
          loading={isLoading}
        />
        <StatsCard
          label="Low Stock"
          value={stats ? formatNumber(stats.lowStock.value) : "—"}
          delta={stats?.lowStock.delta}
          icon={PackageX}
          tone="danger"
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Track gross revenue over time.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-leaf-700">
              View report <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {data ? <RevenueAreaChart data={data.revenueSeries} /> : <Skeleton className="h-[280px] w-full" />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Analytics</CardTitle>
            <CardDescription>Source breakdown across channels.</CardDescription>
          </CardHeader>
          <CardContent>
            {data ? <TrafficDonut data={data.trafficSources} /> : <Skeleton className="h-[240px] w-full" />}
            <div className="mt-3 space-y-2">
              {data?.trafficSources.map((s) => (
                <div key={s.source} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.source}</span>
                  <span className="font-medium">{s.share}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Orders Analytics</CardTitle>
            <CardDescription>Order volume over the year.</CardDescription>
          </CardHeader>
          <CardContent>
            {data ? <OrdersBarChart data={data.revenueSeries} /> : <Skeleton className="h-[280px] w-full" />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New sign-ups by week.</CardDescription>
          </CardHeader>
          <CardContent>
            {data ? <CustomerGrowthChart data={data.customerGrowth} /> : <Skeleton className="h-[240px] w-full" />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>Top categories by units sold.</CardDescription>
          </CardHeader>
          <CardContent>
            {data ? <SalesByCategoryChart data={data.salesByCategory} /> : <Skeleton className="h-[240px] w-full" />}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest 6 orders across channels.</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-leaf-700">
              <Link to={ROUTES.ORDERS}>
                View all <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-border">
              {recentOrders.map((o) => (
                <Link
                  to={ROUTES.ORDER_DETAILS(o.id)}
                  key={o.id}
                  className="flex items-center justify-between gap-3 py-3 hover:bg-muted/40 px-2 -mx-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={o.customer.avatar} />
                      <AvatarFallback>{getInitials(o.customer.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {o.customer.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {o.orderNumber} · {o.items.length} item{o.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-foreground">
                      {formatCurrency(o.total)}
                    </span>
                    <StatusBadge status={o.orderStatus} />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Bestsellers this period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {topProducts.map((p, i) => (
              <Link
                key={p.id}
                to={ROUTES.PRODUCT_DETAILS(p.id)}
                className="flex items-center gap-3 rounded-lg p-2 -mx-2 hover:bg-muted/40"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-leaf-50 text-[11px] font-bold text-leaf-700">
                  {i + 1}
                </span>
                <img
                  src={p.images[0]?.url}
                  className="h-10 w-10 rounded-lg object-cover"
                  alt={p.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(p.totalSold)} sold
                  </p>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(p.salePrice)}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" /> Low Inventory
            </CardTitle>
            <CardDescription>Products near their threshold.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {lowStockProducts.length === 0 && (
              <p className="text-sm text-muted-foreground">All stock levels look healthy.</p>
            )}
            {lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50/40 p-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.images[0]?.url}
                    className="h-10 w-10 rounded-lg object-cover"
                    alt={p.name}
                  />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">SKU {p.sku}</p>
                  </div>
                </div>
                <Badge variant="warning">{p.inventory.totalStock} left</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-4 w-4 text-leaf-600" /> Recent Reviews
            </CardTitle>
            <CardDescription>Latest customer reviews.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {recentReviews.map((r) => (
              <div key={r.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={r.customer.avatar} />
                      <AvatarFallback>{getInitials(r.customer.name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{r.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < r.rating ? "fill-current" : "opacity-30"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{r.text}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">on {r.product.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-leaf-600" /> Recent Activity
            </CardTitle>
            <CardDescription>Live actions in your workspace.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="relative space-y-4 border-l border-border pl-4">
              {data?.activity.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[21px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-white shadow ring-2 ring-leaf-300" />
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/80">
                    {formatDateTime(a.at)}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
