import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bannerService } from "@/services/banner.service";
import type { QueryParams } from "@/types/common";
import type { Banner } from "@/types/banner";

const KEY = "banners";

export function useBanners(params: QueryParams = {}) {
  return useQuery({ queryKey: [KEY, params], queryFn: () => bannerService.list(params) });
}

export function useBanner(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: [KEY, "detail", id],
    queryFn: () => bannerService.get(id!),
  });
}

export function useCreateBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Banner>) => bannerService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteBanner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bannerService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
