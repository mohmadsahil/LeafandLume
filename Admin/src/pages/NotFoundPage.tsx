import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="font-display text-7xl font-bold text-leaf-600">404</div>
      <p className="mt-2 font-display text-xl font-semibold">Page not found</p>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        The page you're looking for is missing or has been moved. Let's get you back on track.
      </p>
      <Button asChild className="mt-6">
        <Link to={ROUTES.DASHBOARD}>
          <Home className="h-4 w-4" /> Back to dashboard
        </Link>
      </Button>
    </div>
  );
}
