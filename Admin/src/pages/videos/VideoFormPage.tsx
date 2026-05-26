import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Film, Image as ImageIcon, Save } from "lucide-react";
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
import { FileDropzone } from "@/components/upload/FileDropzone";
import { VIDEO_TYPES, CATEGORIES } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { useCreateVideo, useVideo } from "@/hooks/useVideos";

const schema = z.object({
  title: z.string().min(2),
  description: z.string().optional().or(z.literal("")),
  type: z.string().min(1),
  duration: z.string().optional().or(z.literal("")),
  relatedCategory: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  autoplay: z.boolean().default(false),
  loop: z.boolean().default(false),
  status: z.enum(["published", "draft"]).default("draft"),
});

type FormValues = z.infer<typeof schema>;

export default function VideoFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { data: existing } = useVideo(id);
  const create = useCreateVideo();
  const [thumbnail, setThumbnail] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      type: "Tutorial",
      duration: "",
      relatedCategory: "",
      featured: false,
      autoplay: false,
      loop: false,
      status: "draft",
    },
  });

  useEffect(() => {
    if (!existing) return;
    form.reset({
      title: existing.title,
      description: existing.description,
      type: existing.type,
      duration: existing.duration,
      relatedCategory: existing.relatedCategory ?? "",
      featured: existing.featured,
      autoplay: existing.autoplay,
      loop: existing.loop,
      status: existing.status,
    });
    setThumbnail(existing.thumbnail);
    setVideoUrl(existing.url);
  }, [existing, form]);

  const submit = async (v: FormValues) => {
    await create.mutateAsync({ ...v, thumbnail, url: videoUrl } as any);
    toast.success(isEdit ? "Video updated" : "Video uploaded");
    navigate(ROUTES.VIDEOS);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
      <PageHeader
        title={isEdit ? "Edit Video" : "Upload Video"}
        description="Add details and link videos to products or categories."
        actions={
          <>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.VIDEOS)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4" /> {isEdit ? "Save changes" : "Save video"}
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Details</CardTitle>
              <CardDescription>Visible information for the storefront.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <Label>Title</Label>
                <Input {...form.register("title")} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label>Description</Label>
                <Textarea rows={3} {...form.register("description")} />
              </div>
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VIDEO_TYPES.map((t) => (
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
                <Label>Duration</Label>
                <Input placeholder="e.g. 0:45" {...form.register("duration")} />
              </div>
              <div className="space-y-1.5">
                <Label>Related Category</Label>
                <Controller
                  control={form.control}
                  name="relatedCategory"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Optional" />
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
                <Label>Video URL</Label>
                <Input
                  placeholder="https://cdn.../video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="h-4 w-4 text-leaf-600" /> Upload Video
              </CardTitle>
              <CardDescription>Drop your video file or paste a URL above.</CardDescription>
            </CardHeader>
            <CardContent>
              <FileDropzone
                accept="video/*"
                multiple={false}
                onFiles={(files) => {
                  const file = files[0];
                  setVideoUrl(URL.createObjectURL(file));
                  toast.success("Video added — remember to publish.");
                }}
                hint="MP4, MOV up to 200MB"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-leaf-600" /> Thumbnail
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {thumbnail && (
                <div className="overflow-hidden rounded-xl border border-border">
                  <img src={thumbnail} alt="" className="h-48 w-full object-cover" />
                </div>
              )}
              <FileDropzone
                multiple={false}
                onFiles={(files) => setThumbnail(URL.createObjectURL(files[0]))}
              />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Playback Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(
                [
                  { key: "featured", label: "Featured video" },
                  { key: "autoplay", label: "Auto play" },
                  { key: "loop", label: "Loop" },
                ] as const
              ).map((opt) => (
                <Controller
                  key={opt.key}
                  control={form.control}
                  name={opt.key}
                  render={({ field }) => (
                    <label className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                      <span className="text-sm">{opt.label}</span>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </label>
                  )}
                />
              ))}
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </CardContent>
          </Card>
        </aside>
      </div>
    </form>
  );
}
