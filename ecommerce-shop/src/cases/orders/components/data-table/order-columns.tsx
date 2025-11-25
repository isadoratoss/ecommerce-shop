import type { ColumnDef } from "@tanstack/react-table";
import type { OrderDTO } from "../../dtos/order.dto";
import { DataTableAction } from "@/components/layout/data-table-actions";

export const orderColumns: ColumnDef<OrderDTO>[] = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'name',
        header: 'Nome da Marca'
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const Order = row.original;

            return(
                <div className="flex justify-end mr-4">
                    <DataTableAction itemId={Order.id!} />
                </div>
            )
        }
    }
];