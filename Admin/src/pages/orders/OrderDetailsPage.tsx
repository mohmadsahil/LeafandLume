import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Truck,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOrder } from "@/hooks/useOrders";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDateTime, getInitials } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(id);

  if (isLoading || !order) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Order ${order.orderNumber}`}
        description={`Placed ${formatDateTime(order.createdAt)}`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to={ROUTES.ORDERS}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4" /> Update status
            </Button>
            <Button asChild>
              <Link to={ROUTES.ORDER_INVOICE(order.id)}>
                <FileText className="h-4 w-4" /> View invoice
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Items</CardTitle>
              <div className="flex items-center gap-2">
                <StatusBadge status={order.orderStatus} />
                <StatusBadge status={order.paymentStatus} />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {order.items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={it.productImage}
                      className="h-12 w-12 rounded-lg object-cover"
                      alt={it.productName}
                    />
                    <div>
                      <p className="text-sm font-medium">{it.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {it.variant ? `${it.variant} · ` : ""}Qty {it.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{formatCurrency(it.total)}</span>
                </div>
              ))}

              <dl className="mt-4 space-y-1.5 rounded-lg bg-muted/40 p-4 text-sm">
                <Row label="Subtotal" value={formatCurrency(order.subtotal)} />
                <Row label="Shipping" value={formatCurrency(order.shipping)} />
                <Row label="Tax" value={formatCurrency(order.tax)} />
                <Row label="Discount" value={`- ${formatCurrency(order.discount)}`} />
                <div className="my-1.5 border-t border-border" />
                <Row label="Total" value={formatCurrency(order.total)} bold />
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-4 border-l border-border pl-4">
                {order.timeline.map((t) => (
                  <li key={t.id}>
                    <span className="absolute -left-[7px] flex h-3 w-3 items-center justify-center rounded-full bg-leaf-500 ring-2 ring-white" />
                    <p className="text-sm font-medium">{t.status}</p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {formatDateTime(t.date)}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={order.customer.avatar} />
                  <AvatarFallback>{getInitials(order.customer.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> {order.customer.email}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" /> +1 555 0000
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-leaf-600" /> Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-leaf-600" /> Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{order.paymentMethod}</p>
              <p>Status: <StatusBadge status={order.paymentStatus} /></p>
            </CardContent>
          </Card>

          {order.trackingNumber && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-leaf-600" /> Shipment
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{order.carrier}</p>
                <p className="font-mono">{order.trackingNumber}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "text-base font-bold text-foreground" : "font-medium"}>{value}</span>
    </div>
  );
}
