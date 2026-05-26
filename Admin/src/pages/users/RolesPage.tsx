import { Check, ShieldCheck, X } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLES } from "@/constants/app";
import { Badge } from "@/components/ui/badge";

const MODULES = [
  "Dashboard",
  "Products",
  "Banners",
  "Videos",
  "SEO",
  "Orders",
  "Customers",
  "Reviews",
  "Queries",
  "Users",
  "Settings",
];

const PERMISSIONS: Record<string, Record<string, boolean>> = {
  "Super Admin": Object.fromEntries(MODULES.map((m) => [m, true])),
  Admin: Object.fromEntries(MODULES.map((m) => [m, m !== "Users"])),
  "Product Manager": Object.fromEntries(
    MODULES.map((m) => [m, ["Products", "Banners", "Videos", "Reviews", "Dashboard"].includes(m)]),
  ),
  "SEO Manager": Object.fromEntries(
    MODULES.map((m) => [m, ["SEO", "Dashboard", "Products"].includes(m)]),
  ),
  "Support Staff": Object.fromEntries(
    MODULES.map((m) => [m, ["Queries", "Orders", "Customers", "Dashboard"].includes(m)]),
  ),
};

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        description="Define what each role can view and manage across the admin."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {ROLES.map((role) => (
          <Card key={role} className="hover:shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ShieldCheck className="h-4 w-4 text-leaf-600" /> {role}
              </CardTitle>
              <CardDescription>
                {role === "Super Admin"
                  ? "Full access to everything"
                  : role === "Admin"
                    ? "Manage store, except user management"
                    : role === "Product Manager"
                      ? "Catalog, banners, media and reviews"
                      : role === "SEO Manager"
                        ? "SEO settings and product metadata"
                        : "Customer support and order management"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-1.5">
                {MODULES.map((m) => {
                  const allowed = PERMISSIONS[role]?.[m];
                  return (
                    <div
                      key={m}
                      className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-2.5 py-1.5 text-xs"
                    >
                      <span className="font-medium">{m}</span>
                      {allowed ? (
                        <Check className="h-3.5 w-3.5 text-leaf-600" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>Granular permission overview.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2.5 text-left">Module</th>
                  {ROLES.map((r) => (
                    <th key={r} className="py-2.5 text-center">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MODULES.map((m) => (
                  <tr key={m}>
                    <td className="py-2.5 font-medium">{m}</td>
                    {ROLES.map((r) => (
                      <td key={r} className="py-2.5 text-center">
                        {PERMISSIONS[r]?.[m] ? (
                          <Badge variant="success">
                            <Check className="h-3 w-3" /> Allow
                          </Badge>
                        ) : (
                          <Badge variant="neutral">
                            <X className="h-3 w-3" /> Deny
                          </Badge>
                        )}
                      </td>
                    ))}
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
