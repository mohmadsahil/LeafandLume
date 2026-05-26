import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { videoService } from "@/services/video.service";
import type { QueryParams } from "@/types/common";
import type { Video } from "@/types/video";

const KEY = "videos";

export function useVideos(params: QueryParams = {}) {
  return useQuery({ queryKey: [KEY, params], queryFn: () => videoService.list(params) });
}

export function useVideo(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: [KEY, "detail", id],
    queryFn: () => videoService.get(id!),
  });
}

export function useCreateVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Video>) => videoService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => videoService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
