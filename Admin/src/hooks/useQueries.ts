import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryService } from "@/services/query.service";
import type { QueryParams } from "@/types/common";

const KEY = "queries";

export function useContactQueries(params: QueryParams = {}) {
  return useQuery({ queryKey: [KEY, params], queryFn: () => queryService.list(params) });
}

export function useContactQuery(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: [KEY, "detail", id],
    queryFn: () => queryService.get(id!),
  });
}

export function useReplyQuery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, message }: { id: string; message: string }) =>
      queryService.reply(id, message),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
