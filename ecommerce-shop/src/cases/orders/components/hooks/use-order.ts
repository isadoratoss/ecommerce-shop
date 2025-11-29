import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../../services/order.service";
import type { OrderDTO } from "../../dtos/order.dto";
import toast from "react-hot-toast";

export function useOrders() {
    return useQuery<OrderDTO[]>({
        queryKey: ["orders"],
        queryFn: () => OrderService.list(),
    });
}

export function useOrder(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ["order", id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id,
    });
}

export function useUpdateOrder(id: string) {
    const queryClient = useQueryClient();

    return useMutation<OrderDTO, Error, Omit<OrderDTO, "id">>({
        mutationFn: (order: Omit<OrderDTO, "id">) => OrderService.update(id, order),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Registro alterado com sucesso!");
        },
        onError: (error) => {
            toast.error(`Erro ao alterar: ${error.message}`);
        },
    });
}
