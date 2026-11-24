import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api-error";
import { OrderService } from "../services/order.service";
import { getOrderStatus } from "../order-status";
import type { OrderDTO, OrderStatus } from "../dtos/order.dto";

const QUERY_KEY = ["orders"];

export function useOrders(guestCheckId?: string) {
    return useQuery({
        queryKey: [...QUERY_KEY, guestCheckId ?? "all"],
        queryFn: () => OrderService.listAll(guestCheckId),
        refetchInterval: 15_000,
    });
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
            OrderService.updateStatus(id, status),

        onMutate: async ({ id, status }) => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEY });

            const previous = queryClient.getQueriesData<OrderDTO[]>({ queryKey: QUERY_KEY });

            queryClient.setQueriesData<OrderDTO[]>({ queryKey: QUERY_KEY }, (orders) =>
                orders?.map((order) => (order.id === id ? { ...order, status } : order))
            );

            return { previous };
        },

        onSuccess: (_order, { status }) => {
            toast.success(`Pedido marcado como "${getOrderStatus(status).label}".`);
        },

        onError: (error, _variables, context) => {
            context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data));
            toast.error(getErrorMessage(error));
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
    });
}
