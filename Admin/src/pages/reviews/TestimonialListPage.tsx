import { Quote, Star } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useReviews } from "@/hooks/useReviews";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function TestimonialListPage() {
  const { data, isLoading } = useReviews();
  const featured = (data?.data ?? []).filter((r) => r.featured);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        description="Hand-picked, featured testimonials that appear across the storefront."
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <Card key={r.id} className="relative overflow-hidden hover:shadow-elevated">
              <CardContent className="space-y-3 p-6">
                <Quote className="h-6 w-6 text-leaf-300" />
                <p className="text-sm leading-relaxed">{r.text}</p>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "opacity-30"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={r.customer.avatar} />
                      <AvatarFallback>{getInitials(r.customer.name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{r.customer.name}</span>
                  </div>
                  <Badge variant="default">{r.product.name.split(" ")[0]}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
