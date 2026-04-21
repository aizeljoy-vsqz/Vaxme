"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

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
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "facility_name",
        header: "Name of Health Facility",
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
]