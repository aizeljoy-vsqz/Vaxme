"use client"

import { usePage } from "@inertiajs/react"
import type { ColumnDef } from "@tanstack/react-table"
import { Ellipsis } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import DeleteConfirmation from "@/components/vaccine_components/alert-dialog"
import DailyBatchesForm from "@/components/vaccine_components/daily-batches-form"
import type { VaccineBatch } from "../inventory-vaccine-batches/columns"

export type DailyVaccine = {
    id: number
    created_at: Date
    vaccine_batch_id: number,
    stock_transferred: number,
    daily_dispense: number,
    number_of_receipients: number,
    current_balance: number,
    vaccine_lose: number

    selected_vaccine_batch: VaccineBatch,
}

type ActionCellProps = {
    row: {
        original: DailyVaccine
    }
    handleDelete: (daily_inventory_id: number) => void
}

function ActionCell({ row, handleDelete }: ActionCellProps) {
    const daily_inventory_id = row.original.id

    // now hooks are VALID here
    const [openDropdown, setOpenDropdown] = useState(false)

    const { selected_vaccine_batch } = usePage<any>().props

    const expired = selected_vaccine_batch.status

    return (
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            {
                expired ? (
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'ghost'}
                            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                            size={'icon'}
                        >
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                ) : (
                    <DropdownMenuTrigger asChild>
                        <Button
                            disabled
                            variant={'ghost'}
                            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                            size={'icon'}
                        >
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                )
            }

            <DropdownMenuContent>
                <DailyBatchesForm
                    onOpenDropdown={() => setOpenDropdown(false)}
                    update_daily_inventory={row.original}
                />

                <DropdownMenuSeparator />

                <DeleteConfirmation
                    handleDelete={() => handleDelete(daily_inventory_id)}
                    delete_vaccine_id={daily_inventory_id}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns = (handleDelete: (daily_inventory_id: number) => void): ColumnDef<DailyVaccine>[] => [
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

        cell: ({ row }) => (
            <ActionCell
                row={row}
                handleDelete={handleDelete}
            />
        )
    }
]