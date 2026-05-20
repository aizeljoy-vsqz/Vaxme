"use client"

import { Link } from "@inertiajs/react"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Ellipsis } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DeleteConfirmation from "@/components/vaccine_components/alert-dialog"
import { VaccineBatchesForm } from "@/components/vaccine_components/vaccine-batches-form"
import type { VaccineType } from "@/pages/vaccine-management/column"
import { dailyVaccineInventory } from "@/routes"


export type VaccineBatch = {
    id: number
    facility_name: string
    batch_number: string
    vaccine_id: number
    expiration_date: Date
    stock_receive: number
    current_balance: number
    status: string
    computed_balance: number
    vaccine: VaccineType
}

type ActionCellProps = {
    row: {
        original: VaccineBatch
    }
    handleDelete: (delete_vaccine: number) => void
}

function ActionCell({ row, handleDelete }: ActionCellProps) {
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const delete_vaccine = row.original.id

    return (
        <>
            {/* DROPDOWN ONLY */}
            <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <button
                        className="w-full text-left px-2 py-1"
                        onClick={() => {
                            setOpenEdit(true)
                            setOpenDropdown(false)
                        }}
                    >
                        Edit
                    </button>

                    <DropdownMenuSeparator />

                    <DeleteConfirmation
                        handleDelete={() => handleDelete(delete_vaccine)}
                        delete_vaccine_id={delete_vaccine}
                    />
                </DropdownMenuContent>
            </DropdownMenu>

            {/* DIALOG OUTSIDE DROPDOWN */}
            <VaccineBatchesForm
                open={openEdit}
                onOpenChange={setOpenEdit}
                update_batch_id={row.original}
            />
        </>
    )
}

export const columns = (handleDelete: (delete_vaccine: number) => void): ColumnDef<VaccineBatch>[] => [
    {
        accessorKey: "batch_number",
        header: "Batch Lot Number",
        cell: ({ row }) => {
            return <Link href={dailyVaccineInventory(row.original.id).url}>{row.original.batch_number}</Link>
        }
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
        // header: "Expiration Date",
        header: ({ column }) => {
            return (
                <Button variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Expiration Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        cell: ({ row }) => {
            return row.original.current_balance
        }
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

        cell: ({ row }) => (
            <ActionCell
                row={row}
                handleDelete={handleDelete}
            />
        )
    }
]