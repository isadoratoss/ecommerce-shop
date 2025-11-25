import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomerService } from "../services/customer.service";
import type { CustomerDTO } from "../dtos/customer.dto";
import { toast } from "react-toastify";


export function useCustomers() {
    return useQuery<CustomerDTO[]>({
        queryKey: ['customers'],
        queryFn: CustomerService.list
    });
}

export function useCustomer(id: string) {
    return useQuery<CustomerDTO>({
        queryKey: ['customer', id],
        queryFn: () => CustomerService.getById(id),
        enabled: !!id //-> or Boolean(id)
    });
}

export function useCreateCustomer(){
    const queryClient = useQueryClient();

    return useMutation<CustomerDTO, Error, Omit<CustomerDTO, 'id'>>({
        mutationFn: (customer: Omit<CustomerDTO, 'id'>) => CustomerService.create(customer),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['customers']});
            toast.success('Registro adicionado com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao adicionar: ${error.message}`)
        }
    });
}

export function useUpdateCustomer(){
    const queryClient = useQueryClient();

    return useMutation<CustomerDTO, Error, {id: string, customer: CustomerDTO}>({
        mutationFn: ({id, customer}) => CustomerService.update(id, customer),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['customers']});
            toast.success('Registro alterado com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao alterar: ${error.message}`)
        }
    });
}

export function useDeleteCustomer(){
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => CustomerService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['customers']});
            toast.success('Registro exluído com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao excluir: ${error.message}`)
        }
    });
}