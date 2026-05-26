import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import type { QueryParams } from "@/types/common";

const KEY = "reviews";

export function useReviews(params: QueryParams = {}) {
  return useQuery({ queryKey: [KEY, params], queryFn: () => reviewService.list(params) });
}

export function useApproveReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewService.approve(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useRejectReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewService.reject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
