import { useNavigate } from "react-router-dom";
import {
  Banknote,
  Bell,
  Globe,
  Save,
  Settings as SettingsIcon,
  Truck,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Section = "general" | "website" | "notifications" | "payments" | "shipping";

const TABS: { value: Section; label: string; path: string; icon: typeof SettingsIcon }[] = [
  { value: "general", label: "General", path: ROUTES.SETTINGS_GENERAL, icon: SettingsIcon },
  { value: "website", label: "Website", path: ROUTES.SETTINGS_WEBSITE, icon: Globe },
  { value: "notifications", label: "Notifications", path: ROUTES.SETTINGS_NOTIFICATIONS, icon: Bell },
  { value: "payments", label: "Payments", path: ROUTES.SETTINGS_PAYMENTS, icon: Banknote },
  { value: "shipping", label: "Shipping", path: ROUTES.SETTINGS_SHIPPING, icon: Truck },
];

export default function SettingsPage({ section }: { section: Section }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure your store, notifications, payments and shipping."
        actions={
          <Button onClick={() => toast.success("Settings saved")}>
            <Save className="h-4 w-4" /> Save changes
          </Button>
        }
      />
      <Tabs value={section} onValueChange={(v) => navigate(TABS.find((t) => t.value === v)!.path)}>
        <TabsList>
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="gap-2">
              <t.icon className="h-4 w-4" /> {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className={cn(section === "general" ? "block" : "hidden")}>
        <General />
      </div>
      <div className={cn(section === "website" ? "block" : "hidden")}>
        <Website />
      </div>
      <div className={cn(section === "notifications" ? "block" : "hidden")}>
        <Notifications />
      </div>
      <div className={cn(section === "payments" ? "block" : "hidden")}>
        <Payments />
      </div>
      <div className={cn(section === "shipping" ? "block" : "hidden")}>
        <Shipping />
      </div>
    </div>
  );
}

function General() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Store identity and contact info.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Store name" defaultValue="Leaf & Lume" />
        <Field label="Support email" defaultValue="admin@leafandlume.com" />
        <Field label="Phone" defaultValue="+1 415 555 0100" />
        <Field label="Timezone" defaultValue="America/Los_Angeles" />
        <div className="md:col-span-2 space-y-1.5">
          <Label>Store description</Label>
          <Textarea
            rows={4}
            defaultValue="Modern, plant-powered skincare crafted in small batches. Vegan and cruelty-free."
          />
        </div>
      </CardContent>
    </Card>
  );
}

function Website() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
        <CardDescription>Theme, language and storefront layout.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Primary language</Label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Default currency</Label>
          <Select defaultValue="USD">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ToggleRow label="Enable maintenance mode" hint="Pause your storefront temporarily." />
        <ToggleRow label="Show cookie banner" defaultChecked />
      </CardContent>
    </Card>
  );
}

function Notifications() {
  const opts = [
    "New order placed",
    "Low stock alert",
    "New customer signed up",
    "Review submitted",
    "Refund requested",
    "Weekly summary email",
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Choose what your team gets pinged about.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {opts.map((o, i) => (
          <ToggleRow key={o} label={o} defaultChecked={i % 2 === 0} />
        ))}
      </CardContent>
    </Card>
  );
}

function Payments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Enable and configure how you accept payments.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {[
          { name: "Stripe", on: true, hint: "Credit / debit cards" },
          { name: "PayPal", on: true, hint: "PayPal balance and cards" },
          { name: "Apple Pay", on: true, hint: "One-tap on iOS / Safari" },
          { name: "Google Pay", on: false, hint: "Android / Chrome" },
          { name: "Klarna", on: false, hint: "Buy now, pay later" },
          { name: "Bank Transfer", on: false, hint: "Wire / ACH" },
        ].map((p) => (
          <ToggleRow key={p.name} label={p.name} hint={p.hint} defaultChecked={p.on} />
        ))}
      </CardContent>
    </Card>
  );
}

function Shipping() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Zones</CardTitle>
        <CardDescription>Define shipping rates per region.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2.5 text-left">Region</th>
                <th className="py-2.5 text-left">Carrier</th>
                <th className="py-2.5 text-right">Rate</th>
                <th className="py-2.5 text-right">Free shipping over</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["United States", "UPS Ground", "$6.00", "$50"],
                ["Canada", "Canada Post", "$10.00", "$80"],
                ["UK & EU", "DHL Express", "$14.00", "$120"],
                ["APAC", "FedEx Intl", "$22.00", "$180"],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="py-2.5 font-medium">{r[0]}</td>
                  <td className="py-2.5 text-muted-foreground">{r[1]}</td>
                  <td className="py-2.5 text-right">{r[2]}</td>
                  <td className="py-2.5 text-right">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input defaultValue={defaultValue} />
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  defaultChecked,
}: {
  label: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <Switch defaultChecked={defaultChecked} />
    </label>
  );
}
