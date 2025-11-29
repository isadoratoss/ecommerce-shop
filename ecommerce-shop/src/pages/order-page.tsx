import { OrderContent } from "@/cases/orders/components/order-content";
import { useOrders } from "@/cases/orders/hooks/use-order";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function OrderPage(){
    const {data: orders, isLoading} = useOrders();
    return(
        <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                <BreadcrumbSeparator />
            
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Pedidos</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-8">
                {isLoading ? (
                    <h1>Carregando</h1>
                ) : (
                    <OrderContent orders={orders!} />
                )}
            </div>
        </div>
    )
}