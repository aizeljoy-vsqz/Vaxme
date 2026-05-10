"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
export type DailyVaccine = {
    id: number
    created_at: Date
    vaccine_batch_id: number,
    stock_transferred: number,
    daily_dispense: number,
    number_of_receipients: number,
    current_balance: number,
    vaccine_lose: number
}

export const columns = (handleDelete:(daily_inventory_id:number)=>void): ColumnDef<DailyVaccine>[] => [
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("created_at") as string
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        }
    },
    {
        accessorKey: "stock_transferred",
        header: "Stock Transfered"
    },
    {
        accessorKey: "vaccine_lose",
        header: "Expired/lose/damage"
    },
    {
        accessorKey: "daily_dispense",
        header: "Daily Dispensed"
    },
    {
        accessorKey: "number_of_receipients",
        header: "No. of Receipients"
    },
    {
        accessorKey: "current_balance",
        header: "Balance"
    },
    {
        accessorKey: "actions",
        id: "actions",
        cell: ({row}) => {
            const daily_inventory_id = (row.original.id);  
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size={'icon'}>
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onClick={()=>{handleDelete(daily_inventory_id)}}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]