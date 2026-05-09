"use client"

import { ColumnDef } from "@tanstack/react-table"
import { dailyVaccineInventory } from "@/routes"
import { Link, usePage } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VaccineBatch = {
    id: number
    facility_name: string
    batch_number: string
    vaccine_id: number
    expiration_date: Date
    stock_receive: number
    current_balance: number
    status: string
}

export const columns: ColumnDef<VaccineBatch>[] = [
    {
        accessorKey: "batch_number",
        header: "Name of Health Facility",
        cell: ({ row }) => {
            console.log(row.original.id);
            
            return <Link href={dailyVaccineInventory(row.original.id).url}>RHU</Link>
        }
    },
    {
        accessorKey: "batch_number",
        header: "Batch Lot Number",
    },
    {
        accessorKey: "vaccine_id",
        header: "Name of Drug",
        cell: ({row})=>{
            return row.original.vaccine_id
        }
    },
    {
        accessorKey: "expiration_date",
        header: "Expiration Date",
        cell: ({ row }) => {
            const date = row.getValue("expiration_date") as string
            return new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        }
    },
    {
        accessorKey: "stock_receive",
        header: "Stock Received",
    },
    {
        accessorKey: "current_balance",
        header: "Balance",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell:({row})=>{
            const status = row.original.status == '1' ? 'active' : 'inactive'
            return status
        }
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