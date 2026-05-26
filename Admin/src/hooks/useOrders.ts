import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";
import type { QueryParams } from "@/types/common";
import type { Order } from "@/types/order";

const KEY = "orders";

export function useOrders(params: QueryParams = {}) {
  return useQuery({ queryKey: [KEY, params], queryFn: () => orderService.list(params) });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: [KEY, "detail", id],
    queryFn: () => orderService.get(id!),
  });
}

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Order> }) =>
      orderService.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
