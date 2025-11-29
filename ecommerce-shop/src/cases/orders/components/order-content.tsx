import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item";
import { FormattedNumber, IntlProvider } from "react-intl";
import type { OrderDTO } from "../dtos/order.dto";
import { OrderStatusBadge } from "./order-status";

type OrderContentProps ={
    orders: OrderDTO[];
}
export function OrderContent({
    orders
}: OrderContentProps) {
    return(
        <div className="flex gap-4">
            <Card className="w-full mt-8">
                <CardContent>
                    <ItemGroup className="gap-4" >
                        {orders.map((item, index) => {

                            const createdAt = item.createdAt
                                ? new Date(item.createdAt)
                                : null;

                            return (
                                <Item key={index} variant="muted" role="listitem" asChild>
                                    <div>
                                        <ItemContent>
                                            <ItemTitle className="line-clamp-1">
                                                {`${createdAt 
                                                    ? createdAt.toLocaleDateString('pt-BR') 
                                                    : 'Data inválida'
                                                } - ${item.custumer?.name ?? ''}`}
                                            </ItemTitle>

                                            <ItemDescription>
                                                {item.id}
                                            </ItemDescription>

                                            <ItemContent className="flex-none text-cover">
                                                <ItemTitle>
                                                    <div className="flex flex-row gap-4">
                                                        <div>
                                                            <OrderStatusBadge status={item.status} />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <p className="font-semibold flex justify-end gap-1.5">
                                                                <IntlProvider locale="pt-BR">
                                                                    <FormattedNumber 
                                                                        value={item.total || 0}
                                                                        style="currency" 
                                                                        currency="BRL" 
                                                                    />
                                                                </IntlProvider>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </ItemTitle>
                                            </ItemContent>
                                        </ItemContent>
                                    </div>
                                </Item>
                            );
                        })}
                    </ItemGroup>
                </CardContent>
            </Card>

            <div className="flex flex-col w-md mt-8 gap-4">
            </div>

        </div>
    )
}
