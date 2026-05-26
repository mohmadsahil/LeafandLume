import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/hooks/useUsers";
import { ROLES } from "@/constants/app";
import { ROUTES } from "@/constants/routes";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  role: z.string().min(1),
  twoFactor: z.boolean().default(false),
  status: z.enum(["active", "inactive", "invited"]).default("invited"),
});

type FormValues = z.infer<typeof schema>;

export default function UserFormPage() {
  const navigate = useNavigate();
  const create = useCreateUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "Admin",
      twoFactor: true,
      status: "invited",
    },
  });

  const submit = async (v: FormValues) => {
    await create.mutateAsync(v as any);
    toast.success("User invited");
    navigate(ROUTES.USERS);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
      <PageHeader
        title="Add User"
        description="Invite a new admin to your workspace and assign their role."
        actions={
          <>
            <Button type="button" variant="outline" onClick={() => navigate(ROUTES.USERS)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4" /> Send invite
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Basic information and role.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5 md:col-span-2">
              <Label>Name</Label>
              <Input {...form.register("name")} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" {...form.register("email")} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input {...form.register("phone")} />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Controller
                control={form.control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
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
                      <SelectItem value="invited">Invited</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
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
              <ShieldCheck className="h-4 w-4 text-leaf-600" /> Security
            </CardTitle>
            <CardDescription>Multi-factor and access controls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Controller
              control={form.control}
              name="twoFactor"
              render={({ field }) => (
                <label className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">
                      Require an authenticator app at sign-in.
                    </p>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </label>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
