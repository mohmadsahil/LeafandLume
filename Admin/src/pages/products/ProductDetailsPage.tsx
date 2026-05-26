import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  CircleDollarSign,
  Copy,
  Leaf,
  Package,
  Pencil,
  Search,
  Star,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProducts";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading || !product) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={product.name}
        description={`SKU ${product.sku} · ${product.brand}`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to={ROUTES.PRODUCTS}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Link>
            </Button>
            <Button variant="outline">
              <Copy className="h-4 w-4" /> Duplicate
            </Button>
            <Button asChild>
              <Link to={ROUTES.PRODUCT_EDIT(product.id)}>
                <Pencil className="h-4 w-4" /> Edit Product
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <CardContent className="p-4">
            <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
              <img
                src={product.images[activeImage]?.url}
                className="h-[420px] w-full object-cover"
                alt={product.name}
              />
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={
                    "h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 " +
                    (i === activeImage ? "border-leaf-500" : "border-border")
                  }
                >
                  <img src={img.url} className="h-full w-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">{product.category}</Badge>
                {product.subcategory && <Badge variant="outline">{product.subcategory}</Badge>}
                <StatusBadge status={product.status} />
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
              <div className="flex items-end gap-3">
                <span className="font-display text-3xl font-bold text-foreground">
                  {formatCurrency(product.salePrice)}
                </span>
                {product.salePrice < product.mrpPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatCurrency(product.mrpPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <Badge variant="success" className="ml-auto">
                    {product.discount}% off
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({product.reviewsCount} reviews)</span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {(
                  [
                    { label: "Stock", value: formatNumber(product.inventory.totalStock), icon: Package },
                    { label: "Sold", value: formatNumber(product.totalSold), icon: CircleDollarSign },
                    { label: "Rating", value: product.rating.toFixed(1), icon: Star },
                  ] as const
                ).map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex items-center gap-2 text-leaf-700">
                      <s.icon className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {s.label}
                      </span>
                    </div>
                    <p className="mt-1 font-display text-lg font-bold">{s.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="seo">SEO</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-3 text-sm leading-relaxed">
                  <p className="text-foreground">{product.description}</p>
                  <p>
                    <span className="font-semibold">Benefits:</span> {product.skincare.benefits}
                  </p>
                  <p>
                    <span className="font-semibold">Usage:</span>{" "}
                    {product.skincare.usageInstructions}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.skincare.skinType.map((s) => (
                      <Badge key={s} variant="outline">
                        <Leaf className="h-3 w-3" /> {s}
                      </Badge>
                    ))}
                    {product.skincare.skinConcerns.map((s) => (
                      <Badge key={s} variant="default">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="ingredients" className="text-sm leading-relaxed">
                  {product.skincare.ingredients}
                </TabsContent>
                <TabsContent value="seo" className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Search className="mt-0.5 h-4 w-4 text-leaf-600" />
                    <div>
                      <p className="font-semibold">{product.seo.metaTitle}</p>
                      <p className="text-leaf-700">/{product.seo.slug}</p>
                      <p className="text-muted-foreground">{product.seo.metaDescription}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="inventory">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <Detail label="Total stock" value={product.inventory.totalStock} />
                    <Detail label="Low stock alert" value={product.inventory.lowStockAlert} />
                    <Detail label="Warehouse" value={product.inventory.warehouse} />
                    <Detail label="Batch" value={product.inventory.batchNumber || "—"} />
                    <Detail label="Expiry" value={product.inventory.expiryDate || "—"} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 text-left">Size</th>
                  <th className="py-2 text-left">Volume</th>
                  <th className="py-2 text-left">Fragrance</th>
                  <th className="py-2 text-left">SKU</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {product.variants.map((v) => (
                  <tr key={v.id}>
                    <td className="py-2.5">{v.size ?? "—"}</td>
                    <td className="py-2.5">{v.volume ?? "—"}</td>
                    <td className="py-2.5">{v.fragrance ?? "—"}</td>
                    <td className="py-2.5 font-mono text-xs text-muted-foreground">{v.sku}</td>
                    <td className="py-2.5 text-right font-semibold">{formatCurrency(v.price)}</td>
                    <td className="py-2.5 text-right">{v.stock}</td>
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

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
