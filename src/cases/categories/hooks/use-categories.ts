import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api-error";
import { CategoryService } from "../services/category.service";
import type { CategoryFormDTO } from "../dtos/category.dto";

const QUERY_KEY = ["categories"];

export function useCategories() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: CategoryService.listAll,
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CategoryFormDTO) => CategoryService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success("Categoria cadastrada!");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: CategoryFormDTO }) =>
            CategoryService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Categoria atualizada!");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => CategoryService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Categoria excluída!");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}
