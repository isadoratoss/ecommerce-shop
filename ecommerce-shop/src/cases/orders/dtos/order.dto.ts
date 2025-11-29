import type { CustomerDTO } from "@/cases/customers/dtos/customer";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface OrderItemDTO {
    id?: string;
    product: ProductDTO;
    quantity: number;
    value: number; 
}
export interface OrderDTO {
    id?: string;
    custumer: CustomerDTO;
    status: string;
    total?: number;
    items: OrderItemDTO[];
    createdAt?: Date;
}
export const OrderStatus = [
    {
        value: "NEW",
        label: "Novo",
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300"
    },
    {
        value: "SEPARATION",
        LABEL: "Em separação",
        bg: "bg-amber-100",
        text: "text-violet-300"
    },
    {
        value:"INVOICED",
        label: "Faturado",
        bg: "bg-violet-100",
        border: "border-violet-300",
    },
    {
        value: "SHIPPED",
        label: "Enviado",
        bg: "bg-cyan-100",
        text: "text-cyan-700",
        border: "border-cyan-300",
    },
    {
        VALUE: "DELIVERED",
        label: "Entregue",
        bg: "bg-green-700",
        text: "text-green-700",
        border: "border-green-300"
    },
    {
        value: "CANCELED",
        label: "Cancelado",
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-300"
    }
];