import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Beaker,
  BookText,
  CircleDollarSign,
  ImagePlus,
  Layers,
  Leaf,
  Plus,
  Save,
  Search,
  Tag,
  Trash2,
  Warehouse,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FileDropzone } from "@/components/upload/FileDropzone";
import { ImagePreviewGrid, type GalleryImage } from "@/components/upload/ImagePreviewGrid";
import {
  CATEGORIES,
  PRODUCT_STATUSES,
  SKIN_CONCERNS,
  SKIN_TYPES,
} from "@/constants/app";
import { productSchema, type ProductFormValues } from "./product-schema";
import { useCreateProduct, useProduct, useUpdateProduct } from "@/hooks/useProducts";
import { ROUTES } from "@/constants/routes";
import { cn, slugify } from "@/lib/utils";

const SUBCATEGORIES = ["Brightening", "Anti-Aging", "Hydration", "Cream", "Gel", "Oil", "Foam"];

const DEFAULT_VALUES: ProductFormValues = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  sku: "",
  brand: "Leaf & Lume",
  category: "",
  subcategory: "",
  tags: [],
  mrpPrice: 0,
  salePrice: 0,
  discount: 0,
  tax: 8,
  currency: "USD",
  inventory: {
    totalStock: 0,
    lowStockAlert: 10,
    warehouse: "NY-WH-01",
    batchNumber: "",
    expiryDate: "",
  },
  skincare: {
    skinType: [],
    skinConcerns: [],
    ingredients: "",
    usageInstructions: "",
    benefits: "",
    dermatologicallyTested: false,
    vegan: true,
    crueltyFree: true,
    sulfateFree: true,
    parabenFree: true,
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    slug: "",
    ogImage: "",
  },
  status: "draft",
};

type Variant = {
  id: string;
  size: string;
  volume: string;
  fragrance: string;
  sku: string;
  price: number;
  stock: number;
};

export default function ProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { data: existing, isLoading: loadingExisting } = useProduct(id);
  const create = useCreateProduct();
  const update = useUpdateProduct();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!existing) return;
    form.reset({
      name: existing.name,
      slug: existing.slug,
      shortDescription: existing.shortDescription,
      description: existing.description,
      sku: existing.sku,
      brand: existing.brand,
      category: existing.category,
      subcategory: existing.subcategory ?? "",
      tags: existing.tags,
      mrpPrice: existing.mrpPrice,
      salePrice: existing.salePrice,
      discount: existing.discount,
      tax: existing.tax,
      currency: existing.currency,
      inventory: {
        totalStock: existing.inventory.totalStock,
        lowStockAlert: existing.inventory.lowStockAlert,
        warehouse: existing.inventory.warehouse,
        batchNumber: existing.inventory.batchNumber ?? "",
        expiryDate: existing.inventory.expiryDate ?? "",
      },
      skincare: existing.skincare,
      seo: existing.seo,
      status: existing.status,
    });
    setImages(existing.images.map((img) => ({ id: img.id, url: img.url, isFeatured: img.isFeatured })));
    setVariants(
      existing.variants.map((v) => ({
        id: v.id,
        size: v.size ?? "",
        volume: v.volume ?? "",
        fragrance: v.fragrance ?? "",
        sku: v.sku,
        price: v.price,
        stock: v.stock,
      })),
    );
  }, [existing, form]);

  const tags = form.watch("tags");

  const addTag = () => {
    const t = tagInput.trim();
    if (!t) return;
    if (!tags.includes(t)) form.setValue("tags", [...tags, t]);
    setTagInput("");
  };

  const onUpload = (files: File[]) => {
    const next: GalleryImage[] = files.map((f, i) => ({
      id: `local_${Date.now()}_${i}`,
      url: URL.createObjectURL(f),
      isFeatured: images.length === 0 && i === 0,
    }));
    setImages((prev) => [...prev, ...next]);
  };

  const setFeatured = (id: string) =>
    setImages((prev) => prev.map((p) => ({ ...p, isFeatured: p.id === id })));

  const removeImage = (id: string) => setImages((prev) => prev.filter((p) => p.id !== id));

  const addVariant = () =>
    setVariants((prev) => [
      ...prev,
      {
        id: `var_${Date.now()}`,
        size: "",
        volume: "",
        fragrance: "",
        sku: "",
        price: 0,
        stock: 0,
      },
    ]);

  const onSubmit = async (values: ProductFormValues) => {
    const payload = {
      ...values,
      images: images.map((i, idx) => ({
        id: i.id,
        url: i.url,
        isFeatured: i.isFeatured ?? idx === 0,
      })),
      variants,
    };
    try {
      if (isEdit && id) {
        await update.mutateAsync({ id, payload: payload as any });
        toast.success("Product updated");
      } else {
        await create.mutateAsync(payload as any);
        toast.success("Product created");
      }
      navigate(ROUTES.PRODUCTS);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const setSlugFromName = () => {
    const name = form.getValues("name");
    if (!name) return;
    const s = slugify(name);
    form.setValue("slug", s);
    form.setValue("seo.slug", s);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <PageHeader
        title={isEdit ? "Edit Product" : "Add Product"}
        description={
          isEdit
            ? "Update product details, pricing, inventory and SEO."
            : "Create a new skincare product with rich details and SEO."
        }
        actions={
          <>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.PRODUCTS)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit" disabled={create.isPending || update.isPending || loadingExisting}>
              <Save className="h-4 w-4" />
              {isEdit ? "Save Changes" : "Create Product"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookText className="h-4 w-4 text-leaf-600" />
                <CardTitle>Basic Information</CardTitle>
              </div>
              <CardDescription>Identity, description, taxonomy and tags.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <Label>Product Name</Label>
                <Input placeholder="e.g. Hydra Bloom Vitamin C Serum" {...form.register("name")} onBlur={setSlugFromName} />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Product Slug</Label>
                <Input placeholder="hydra-bloom-vitamin-c-serum" {...form.register("slug")} />
              </div>
              <div className="space-y-1.5">
                <Label>SKU</Label>
                <Input placeholder="LL-SRM-001" {...form.register("sku")} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Short Description</Label>
                <Input placeholder="A weightless serum for a radiant glow." {...form.register("shortDescription")} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Full Description</Label>
                <Textarea
                  rows={6}
                  placeholder="Describe the formulation, benefits, scent, texture…"
                  {...form.register("description")}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Brand</Label>
                <Input {...form.register("brand")} />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Controller
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Subcategory</Label>
                <Controller
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Optional" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBCATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap items-center gap-2 rounded-lg border border-input bg-white p-2 shadow-soft">
                  {tags.map((t) => (
                    <Badge key={t} variant="outline" className="gap-1 py-1 pl-2 pr-1">
                      <Tag className="h-3 w-3" /> {t}
                      <button
                        type="button"
                        className="ml-1 rounded p-0.5 text-muted-foreground hover:bg-muted"
                        onClick={() =>
                          form.setValue("tags", tags.filter((x) => x !== t))
                        }
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Type and press Enter"
                    className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-leaf-600" />
                <CardTitle>Pricing</CardTitle>
              </div>
              <CardDescription>Set MRP, sale price, discount and tax.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="space-y-1.5">
                <Label>MRP</Label>
                <Input type="number" step="0.01" {...form.register("mrpPrice")} />
              </div>
              <div className="space-y-1.5">
                <Label>Sale Price</Label>
                <Input type="number" step="0.01" {...form.register("salePrice")} />
              </div>
              <div className="space-y-1.5">
                <Label>Discount %</Label>
                <Input type="number" step="0.01" {...form.register("discount")} />
              </div>
              <div className="space-y-1.5">
                <Label>Tax %</Label>
                <Input type="number" step="0.01" {...form.register("tax")} />
              </div>
              <div className="space-y-1.5 col-span-2 md:col-span-1">
                <Label>Currency</Label>
                <Controller
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-leaf-600" />
                <CardTitle>Product Images</CardTitle>
              </div>
              <CardDescription>
                Upload multiple images. Drag to reorder, set a featured image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileDropzone onFiles={onUpload} />
              <ImagePreviewGrid
                images={images}
                onRemove={removeImage}
                onSetFeatured={setFeatured}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-leaf-600" />
                  <CardTitle>Variants</CardTitle>
                </div>
                <Button type="button" variant="soft" size="sm" onClick={addVariant}>
                  <Plus className="h-4 w-4" /> Add variant
                </Button>
              </div>
              <CardDescription>Different sizes, volumes or fragrances.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {variants.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No variants yet — add sizes, volumes or fragrances.
                </p>
              ) : (
                variants.map((v, idx) => (
                  <div
                    key={v.id}
                    className="grid grid-cols-2 gap-3 rounded-xl border border-border p-3 md:grid-cols-7"
                  >
                    <div className="space-y-1">
                      <Label className="text-xs">Size</Label>
                      <Input
                        value={v.size}
                        onChange={(e) =>
                          setVariants(variants.map((x, i) => (i === idx ? { ...x, size: e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Volume</Label>
                      <Input
                        value={v.volume}
                        onChange={(e) =>
                          setVariants(variants.map((x, i) => (i === idx ? { ...x, volume: e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Fragrance</Label>
                      <Input
                        value={v.fragrance}
                        onChange={(e) =>
                          setVariants(variants.map((x, i) => (i === idx ? { ...x, fragrance: e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">SKU</Label>
                      <Input
                        value={v.sku}
                        onChange={(e) =>
                          setVariants(variants.map((x, i) => (i === idx ? { ...x, sku: e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Price</Label>
                      <Input
                        type="number"
                        value={v.price}
                        onChange={(e) =>
                          setVariants(variants.map((x, i) => (i === idx ? { ...x, price: +e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Stock</Label>
                      <Input
                        type="number"
                        value={v.stock}
                        onChange={(e) =>
                          setVariants(variants.map((x, i) => (i === idx ? { ...x, stock: +e.target.value } : x)))
                        }
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => setVariants(variants.filter((_, i) => i !== idx))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Warehouse className="h-4 w-4 text-leaf-600" />
                <CardTitle>Inventory</CardTitle>
              </div>
              <CardDescription>Stock, alerts and warehouse tracking.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Total Stock</Label>
                <Input type="number" {...form.register("inventory.totalStock")} />
              </div>
              <div className="space-y-1.5">
                <Label>Low Stock Alert</Label>
                <Input type="number" {...form.register("inventory.lowStockAlert")} />
              </div>
              <div className="space-y-1.5">
                <Label>Warehouse</Label>
                <Input {...form.register("inventory.warehouse")} />
              </div>
              <div className="space-y-1.5">
                <Label>Batch Number</Label>
                <Input {...form.register("inventory.batchNumber")} />
              </div>
              <div className="space-y-1.5">
                <Label>Expiry Date</Label>
                <Input type="date" {...form.register("inventory.expiryDate")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Beaker className="h-4 w-4 text-leaf-600" />
                <CardTitle>Skin Care Details</CardTitle>
              </div>
              <CardDescription>
                Help customers find the right product by skin profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Skin Type</Label>
                  <Controller
                    control={form.control}
                    name="skincare.skinType"
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2">
                        {SKIN_TYPES.map((t) => {
                          const active = field.value.includes(t);
                          return (
                            <button
                              type="button"
                              key={t}
                              onClick={() =>
                                field.onChange(active ? field.value.filter((x) => x !== t) : [...field.value, t])
                              }
                              className={cn(
                                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                                active
                                  ? "border-leaf-300 bg-leaf-50 text-leaf-800"
                                  : "border-border bg-white text-muted-foreground hover:bg-muted",
                              )}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Skin Concerns</Label>
                  <Controller
                    control={form.control}
                    name="skincare.skinConcerns"
                    render={({ field }) => (
                      <div className="flex flex-wrap gap-2">
                        {SKIN_CONCERNS.map((t) => {
                          const active = field.value.includes(t);
                          return (
                            <button
                              type="button"
                              key={t}
                              onClick={() =>
                                field.onChange(active ? field.value.filter((x) => x !== t) : [...field.value, t])
                              }
                              className={cn(
                                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                                active
                                  ? "border-leaf-300 bg-leaf-50 text-leaf-800"
                                  : "border-border bg-white text-muted-foreground hover:bg-muted",
                              )}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-1.5 md:col-span-3">
                  <Label>Ingredients</Label>
                  <Textarea rows={3} placeholder="Full INCI list…" {...form.register("skincare.ingredients")} />
                </div>
                <div className="space-y-1.5 md:col-span-3">
                  <Label>Usage Instructions</Label>
                  <Textarea rows={3} {...form.register("skincare.usageInstructions")} />
                </div>
                <div className="space-y-1.5 md:col-span-3">
                  <Label>Product Benefits</Label>
                  <Textarea rows={3} {...form.register("skincare.benefits")} />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {(
                  [
                    { key: "dermatologicallyTested", label: "Dermatologically Tested" },
                    { key: "vegan", label: "Vegan" },
                    { key: "crueltyFree", label: "Cruelty Free" },
                    { key: "sulfateFree", label: "Sulfate Free" },
                    { key: "parabenFree", label: "Paraben Free" },
                  ] as const
                ).map((opt) => (
                  <Controller
                    key={opt.key}
                    control={form.control}
                    name={`skincare.${opt.key}` as const}
                    render={({ field }) => (
                      <label className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                        <span className="flex items-center gap-2 text-sm">
                          <Leaf className="h-4 w-4 text-leaf-600" /> {opt.label}
                        </span>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </label>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-leaf-600" />
                <CardTitle>SEO</CardTitle>
              </div>
              <CardDescription>Optimize for search engines and social preview.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Meta Title</Label>
                <Input {...form.register("seo.metaTitle")} />
              </div>
              <div className="space-y-1.5">
                <Label>Focus Keyword</Label>
                <Input {...form.register("seo.focusKeyword")} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Meta Description</Label>
                <Textarea rows={3} {...form.register("seo.metaDescription")} />
              </div>
              <div className="space-y-1.5">
                <Label>SEO Slug</Label>
                <Input {...form.register("seo.slug")} />
              </div>
              <div className="space-y-1.5">
                <Label>Open Graph Image URL</Label>
                <Input {...form.register("seo.ogImage")} />
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>Choose how this product is published.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <div className="space-y-2">
                    {PRODUCT_STATUSES.map((s) => {
                      const active = field.value === s;
                      return (
                        <label
                          key={s}
                          className={cn(
                            "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors",
                            active
                              ? "border-leaf-300 bg-leaf-50/60"
                              : "border-border hover:bg-muted/40",
                          )}
                        >
                          <div>
                            <p className="text-sm font-medium capitalize">{s}</p>
                            <p className="text-xs text-muted-foreground">
                              {s === "draft" && "Save without publishing."}
                              {s === "published" && "Visible to customers."}
                              {s === "archived" && "Hidden but kept on file."}
                            </p>
                          </div>
                          <Checkbox checked={active} onCheckedChange={() => field.onChange(s)} />
                        </label>
                      );
                    })}
                  </div>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-border bg-white">
                {images[0]?.url ? (
                  <img src={images[0].url} className="h-44 w-full object-cover" alt="" />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-muted/40 text-xs text-muted-foreground">
                    No image yet
                  </div>
                )}
                <div className="space-y-2 p-3">
                  <Badge variant="default">{form.watch("category") || "Category"}</Badge>
                  <p className="font-display text-base font-semibold">
                    {form.watch("name") || "Product name"}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      ${form.watch("salePrice") || 0}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      ${form.watch("mrpPrice") || 0}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </form>
  );
}
