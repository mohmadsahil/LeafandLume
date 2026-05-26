import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/common/Logo";
import { useOrder } from "@/hooks/useOrders";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrderInvoicePage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(id);

  if (isLoading || !order) return <Skeleton className="h-96 w-full" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Invoice ${order.orderNumber}`}
        description="Customer-ready invoice with itemized totals."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to={ROUTES.ORDER_DETAILS(order.id)}>
                <ArrowLeft className="h-4 w-4" /> Back to order
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4" /> Print
            </Button>
            <Button>
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          </>
        }
      />

      <Card>
        <CardContent className="space-y-6 p-8">
          <div className="flex items-start justify-between">
            <Logo />
            <div className="text-right">
              <p className="font-display text-2xl font-bold">INVOICE</p>
              <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/40 p-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Billed to</p>
              <p className="mt-1 font-medium">{order.customer.name}</p>
              <p className="text-muted-foreground">{order.customer.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Ship to</p>
              <p className="mt-1">{order.shippingAddress.line1}</p>
              <p className="text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2.5 text-left">Item</th>
                <th className="py-2.5 text-right">Qty</th>
                <th className="py-2.5 text-right">Price</th>
                <th className="py-2.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {order.items.map((it) => (
                <tr key={it.id}>
                  <td className="py-3">
                    <p className="font-medium">{it.productName}</p>
                    {it.variant && <p className="text-xs text-muted-foreground">{it.variant}</p>}
                  </td>
                  <td className="py-3 text-right">{it.quantity}</td>
                  <td className="py-3 text-right">{formatCurrency(it.price)}</td>
                  <td className="py-3 text-right font-semibold">{formatCurrency(it.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="ml-auto w-full max-w-sm space-y-1.5 rounded-xl bg-muted/40 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>- {formatCurrency(order.discount)}</span>
            </div>
            <div className="my-1.5 border-t border-border" />
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total Due</span>
              <span className="font-bold">{formatCurrency(order.total)}</span>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Thank you for shopping with Leaf &amp; Lume. For support, email admin@leafandlume.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
