import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "../constants/order-status";

type OrderStatusBadgeProps = {
    status: string | number;
}
export function OrderStatusBadge({
    status
}: OrderStatusBadgeProps) {
    const info = OrderStatus.find((s) => s.value === status)

    return (
        status ? (
            <Badge
                variant="outline"
                className={`${info?.bg} ${info?.border} ${info?.text}`}
            >
                {info?.label}
            </Badge>
        ) : (
            <p> Não encontrado!</p>
        )
    )
}