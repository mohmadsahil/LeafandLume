import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ImagePlus, Save, Smartphone, Monitor } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDropzone } from "@/components/upload/FileDropzone";
import { BANNER_TYPES } from "@/constants/app";
import { useBanner, useCreateBanner } from "@/hooks/useBanners";
import { ROUTES } from "@/constants/routes";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional().or(z.literal("")),
  type: z.string().min(1),
  ctaText: z.string().min(1, "CTA text is required"),
  ctaUrl: z.string().min(1, "CTA URL is required"),
  position: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "scheduled"]),
});

type FormValues = z.infer<typeof schema>;

export default function BannerFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { data: existing } = useBanner(id);
  const create = useCreateBanner();

  const [desktopImage, setDesktopImage] = useState<string>("");
  const [mobileImage, setMobileImage] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      subtitle: "",
      type: "Hero Banner",
      ctaText: "Shop now",
      ctaUrl: "/collections/new",
      position: "Homepage Hero",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (!existing) return;
    form.reset({
      title: existing.title,
      subtitle: existing.subtitle ?? "",
      type: existing.type,
      ctaText: existing.ctaText,
      ctaUrl: existing.ctaUrl,
      position: existing.position,
      startDate: existing.startDate,
      endDate: existing.endDate ?? "",
      status: existing.status,
    });
    setDesktopImage(existing.desktopImage);
    setMobileImage(existing.mobileImage);
  }, [existing, form]);

  const submit = async (v: FormValues) => {
    await create.mutateAsync({ ...v, desktopImage, mobileImage } as any);
    toast.success(isEdit ? "Banner updated" : "Banner created");
    navigate(ROUTES.BANNERS);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
      <PageHeader
        title={isEdit ? "Edit Banner" : "Add Banner"}
        description="Configure visuals, scheduling, and call-to-actions."
        actions={
          <>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.BANNERS)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit" disabled={create.isPending}>
              <Save className="h-4 w-4" /> {isEdit ? "Save" : "Create banner"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Banner Details</CardTitle>
              <CardDescription>
                Title, type and the position where this banner appears.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <Label>Title</Label>
                <Input {...form.register("title")} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Subtitle</Label>
                <Input {...form.register("subtitle")} />
              </div>
              <div className="space-y-1.5">
                <Label>Banner Type</Label>
                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BANNER_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Position</Label>
                <Input {...form.register("position")} />
              </div>
              <div className="space-y-1.5">
                <Label>CTA Text</Label>
                <Input {...form.register("ctaText")} />
              </div>
              <div className="space-y-1.5">
                <Label>CTA URL</Label>
                <Input {...form.register("ctaUrl")} />
              </div>
              <div className="space-y-1.5">
                <Label>Start Date</Label>
                <Input type="date" {...form.register("startDate")} />
              </div>
              <div className="space-y-1.5">
                <Label>End Date</Label>
                <Input type="date" {...form.register("endDate")} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Status</Label>
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-leaf-600" /> Banner Images
              </CardTitle>
              <CardDescription>Upload both desktop and mobile artwork.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Tabs defaultValue="desktop">
                <TabsList>
                  <TabsTrigger value="desktop">
                    <Monitor className="h-4 w-4" /> Desktop
                  </TabsTrigger>
                  <TabsTrigger value="mobile">
                    <Smartphone className="h-4 w-4" /> Mobile
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="desktop" className="space-y-3">
                  {desktopImage ? (
                    <div className="overflow-hidden rounded-xl border border-border">
                      <img src={desktopImage} alt="Desktop" className="h-48 w-full object-cover" />
                    </div>
                  ) : null}
                  <FileDropzone
                    multiple={false}
                    onFiles={(files) => setDesktopImage(URL.createObjectURL(files[0]))}
                    hint="Recommended 1920×800px"
                  />
                </TabsContent>
                <TabsContent value="mobile" className="space-y-3">
                  {mobileImage ? (
                    <div className="overflow-hidden rounded-xl border border-border">
                      <img src={mobileImage} alt="Mobile" className="h-64 w-full object-cover" />
                    </div>
                  ) : null}
                  <FileDropzone
                    multiple={false}
                    onFiles={(files) => setMobileImage(URL.createObjectURL(files[0]))}
                    hint="Recommended 750×900px"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription>What your storefront will show.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-leaf-50 to-white">
              {desktopImage ? (
                <img src={desktopImage} className="h-44 w-full object-cover" alt="" />
              ) : (
                <div className="flex h-44 items-center justify-center bg-muted/30 text-xs text-muted-foreground">
                  Upload an image to preview
                </div>
              )}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-4 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] opacity-90">
                    {form.watch("type")}
                  </p>
                  <p className="font-display text-lg font-semibold">
                    {form.watch("title") || "Banner title"}
                  </p>
                  <p className="text-xs opacity-90">{form.watch("subtitle")}</p>
                  <Button size="sm" className="mt-2 bg-white text-foreground hover:bg-white/90">
                    {form.watch("ctaText")}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
