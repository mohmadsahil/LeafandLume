import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import type { QueryParams } from "@/types/common";
import type { User } from "@/types/user";

const KEY = "users";

export function useUsers(params: QueryParams = {}) {
  return useQuery({ queryKey: [KEY, params], queryFn: () => userService.list(params) });
}

export function useUser(id: string | undefined) {
  return useQuery({
    enabled: !!id,
    queryKey: [KEY, "detail", id],
    queryFn: () => userService.get(id!),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<User>) => userService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useActivityLogs() {
  return useQuery({ queryKey: [KEY, "activity"], queryFn: () => userService.activity() });
}
