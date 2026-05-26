import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product";
import type { QueryParams } from "@/types/common";

const KEY = "products";

export function useProducts(params: QueryParams = {}) {
  return useQuery({
    queryKey: [KEY, params],
    queryFn: () => productService.list(params),
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: [KEY, "detail", id],
    queryFn: () => productService.get(id!),
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Product>) => productService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Product> }) =>
      productService.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDuplicateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.duplicate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
