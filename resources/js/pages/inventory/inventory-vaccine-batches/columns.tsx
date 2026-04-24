"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { dailyVaccineInventory } from "@/routes"
import { Link } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VaccineBatch = {
    id: number
    facility_name: string
    batch_lot_no: string
    drug_name: string
    expiration_date: string
    stock_received: number
    balance: number
    status: string
}

export const columns: ColumnDef<VaccineBatch>[] = [
    {
        accessorKey: "facility_name",
        header: "Name of Health Facility",
        cell: ({ row }) => {
            return <Link href={dailyVaccineInventory().url}>Name of Health Facility</Link>
        }
    },
    {
        accessorKey: "batch_lot_no",
        header: "Batch Lot Number",
    },
    {
        accessorKey: "drug_name",
        header: "Name of Drug",
    },
    {
        accessorKey: "expiration_date",
        header: "Expiration Date",
    },
    {
        accessorKey: "stock_received",
        header: "Stock Received",
    },
    {
        accessorKey: "balance",
        header: "Balance",
    },
    {
        accessorKey: "status",
        header: "Status",
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