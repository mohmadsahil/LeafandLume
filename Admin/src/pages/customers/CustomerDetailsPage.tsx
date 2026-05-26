import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Mail, MapPin, Phone, Sparkles, ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCustomer } from "@/hooks/useCustomers";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate, formatNumber, getInitials } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/cards/StatsCard";
import { useOrders } from "@/hooks/useOrders";

export default function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: customer, isLoading } = useCustomer(id);
  const { data: ordersData } = useOrders({ pageSize: 8 });
  const customerOrders = (ordersData?.data ?? []).filter((o) => o.customer.id === id);

  if (isLoading || !customer) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={customer.name}
        description={`Customer since ${formatDate(customer.createdAt)}`}
        actions={
          <Button asChild variant="outline">
            <Link to={ROUTES.CUSTOMERS}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardContent className="space-y-4 p-6 text-center">
            <Avatar className="mx-auto h-20 w-20">
              <AvatarImage src={customer.avatar} />
              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-display text-xl font-semibold">{customer.name}</h2>
              <StatusBadge status={customer.status} className="mt-1.5" />
            </div>
            <div className="space-y-2 text-left text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" /> {customer.email}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" /> {customer.phone}
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> {customer.addresses[0]?.city ?? "—"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-3 text-left">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Skin Type</p>
                <Badge variant="default" className="mt-1">{customer.skinType}</Badge>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Loyalty</p>
                <p className="mt-1 text-sm font-semibold">{formatNumber(customer.loyaltyPoints)} pts</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Skin Concerns</p>
              <div className="mt-1 flex flex-wrap justify-center gap-1">
                {customer.skinConcerns.map((c) => (
                  <Badge key={c} variant="outline">{c}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            <StatsCard label="Orders" value={formatNumber(customer.ordersCount)} icon={ShoppingBag} tone="info" />
            <StatsCard label="Total Spend" value={formatCurrency(customer.totalSpend)} icon={Sparkles} tone="primary" />
            <StatsCard label="Wishlist" value={customer.wishlist.length} icon={Heart} tone="warning" />
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="orders">
                <TabsList>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                  <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="space-y-2">
                  {customerOrders.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No orders yet.</p>
                  ) : (
                    customerOrders.map((o) => (
                      <Link
                        key={o.id}
                        to={ROUTES.ORDER_DETAILS(o.id)}
                        className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/40"
                      >
                        <div>
                          <p className="text-sm font-semibold">{o.orderNumber}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(o.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={o.orderStatus} />
                          <span className="font-semibold">{formatCurrency(o.total)}</span>
                        </div>
                      </Link>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="addresses" className="space-y-3">
                  {customer.addresses.map((a) => (
                    <div key={a.id} className="rounded-lg border border-border p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{a.label}</p>
                        {a.isDefault && <Badge variant="default">Default</Badge>}
                      </div>
                      <p className="text-muted-foreground">
                        {a.line1}, {a.city}, {a.state} {a.zip}, {a.country}
                      </p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="wishlist">
                  {customer.wishlist.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Empty wishlist.</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {customer.wishlist.map((w) => (
                        <div key={w.productId} className="rounded-lg border border-border p-3">
                          <img src={w.image} className="h-28 w-full rounded-lg object-cover" alt={w.name} />
                          <p className="mt-2 text-sm font-medium">{w.name}</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(w.price)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="subscriptions" className="space-y-2">
                  {customer.subscriptionHistory.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No subscriptions.</p>
                  ) : (
                    customer.subscriptionHistory.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div>
                          <p className="text-sm font-semibold">{s.plan}</p>
                          <p className="text-xs text-muted-foreground">
                            Started {formatDate(s.startDate)}
                            {s.nextRenewal ? ` · Renews ${formatDate(s.nextRenewal)}` : ""}
                          </p>
                        </div>
                        <Badge variant="success">{s.status}</Badge>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
