import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api-error";
import { SpotService } from "../services/spot.service";
import type { SpotFormDTO } from "../dtos/spot.dto";

const QUERY_KEY = ["spots"];

export function useSpots() {
    return useQuery({
        queryKey: QUERY_KEY,
        queryFn: SpotService.listAll,
    });
}

export function useCreateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SpotFormDTO) => SpotService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success("Mesa cadastrada!");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}

export function useUpdateSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: SpotFormDTO }) =>
            SpotService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success("Mesa atualizada!");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}

export function useDeleteSpot() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SpotService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
            toast.success("Mesa excluída!");
        },
        onError: (error) => toast.error(getErrorMessage(error)),
    });
}
