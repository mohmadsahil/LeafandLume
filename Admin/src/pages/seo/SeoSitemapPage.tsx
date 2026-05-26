import { Download, FileCode2, Globe, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function SeoSitemapPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sitemap & Technical SEO"
        description="Generate sitemaps, configure crawling and manage technical SEO rules."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-leaf-600" /> sitemap.xml
            </CardTitle>
            <CardDescription>Auto-generated and submitted to search engines.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs text-muted-foreground">
              https://leafandlume.com/sitemap.xml
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => toast.success("Sitemap regenerated")}>
                <RefreshCw className="h-4 w-4" /> Regenerate
              </Button>
              <Button variant="outline" onClick={() => toast.success("Downloading…")}>
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-leaf-600" /> robots.txt
            </CardTitle>
            <CardDescription>Tell crawlers what to index and what to ignore.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              rows={8}
              defaultValue={`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://leafandlume.com/sitemap.xml`}
              className="font-mono text-xs"
            />
            <Button onClick={() => toast.success("robots.txt saved")}>Save</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Technical SEO</CardTitle>
          <CardDescription>Toggle technical SEO and crawling settings.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            { label: "Auto-generate canonical tags", on: true },
            { label: "Force HTTPS", on: true },
            { label: "Compress images on upload", on: true },
            { label: "Inline critical CSS", on: false },
            { label: "Lazy load images", on: true },
            { label: "Pretty URLs", on: true },
          ].map((s) => (
            <label
              key={s.label}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5"
            >
              <Label>{s.label}</Label>
              <Switch defaultChecked={s.on} />
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
