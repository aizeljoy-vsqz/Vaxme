"use client"

import { ColumnDef } from "@tanstack/react-table"
import { dailyVaccineInventory } from "@/routes"
import { Link, useForm } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis, Trash2Icon } from "lucide-react"
import { VaccineType } from "@/pages/vaccine-management/column"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import DeleteConfirmation from "@/components/vaccine_components/alert-dialog"
import VaccineBatchesForm from "@/components/vaccine_components/vaccine-batches-form"
import { useState } from "react"


export type VaccineBatch = {
    id: number
    facility_name: string
    batch_number: string
    vaccine_id: number
    expiration_date: Date
    stock_receive: number
    current_balance: number
    status: string
    vaccine: VaccineType
}


export const columns = (handleDelete: (delete_vaccine: number) => void): ColumnDef<VaccineBatch>[] => [
    {
        accessorKey: "batch_number",
        header: "Name of Health Facility",
        cell: ({ row }) => {
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
        cell: ({ row }) => {
            return row.original.vaccine.name
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
        cell: ({ row }) => {
            const status = row.original.status == '1' ? 'active' : 'inactive'
            return status
        }
    },
    {
        accessorKey: "actions",
        id: "actions",
        cell: ({ row }) => {
            const delete_vaccine = row.original.id
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <Button variant={'ghost'} className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size={'icon'}>
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        {/* Edit */}
                        <VaccineBatchesForm update_batch_id={row.original} />
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        {/* Delete */}
                        <DeleteConfirmation handleDelete={() => handleDelete(delete_vaccine)} delete_vaccine_id={delete_vaccine} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]