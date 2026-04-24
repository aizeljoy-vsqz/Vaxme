"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis} from "lucide-react"
import { ArrowUpDown } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VaccineBatch = {
    id: number
    batch_id: number
    date: Date
    quantity_in: number
    expired_lose_damage: number
    quantity_out: number
    no_of_receipients: number
    balance: number
}

export const columns: ColumnDef<VaccineBatch>[] = [
    {
        accessorKey: "date",
        header:({column})=>{
            return (
                <Button variant={"ghost"} 
                onClick={()=>column.toggleSorting(column.getIsSorted()=== 'asc')}
                >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },



    },
    {
        accessorKey: "quantity_in",
        header: "Stock Transfered"
    },
    {
        accessorKey: "expired_lose_damage",
        header: "Expired/lose/damage"
    },
    {
        accessorKey: "quantity_out",
        header: "Daily Dispensed"
    },
    {
        accessorKey: "no_of_receipients",
        header: "No. of Receipients"
    },
    {
        accessorKey: "balance",
        header: "Balance"
    },
    {
        accessorKey: "actions",
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size={'icon'}>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    },
]