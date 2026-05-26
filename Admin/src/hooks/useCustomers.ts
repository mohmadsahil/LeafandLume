import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services/customer.service";
import type { QueryParams } from "@/types/common";

const KEY = "customers";

export function useCustomers(params: QueryParams = {}) {
  return useQuery({ queryKey: [KEY, params], queryFn: () => customerService.list(params) });
}

export function useCustomer(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: [KEY, "detail", id],
    queryFn: () => customerService.get(id!),
  });
}
