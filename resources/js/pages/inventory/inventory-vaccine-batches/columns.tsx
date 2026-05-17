"use client"

import { ColumnDef } from "@tanstack/react-table"
import { dailyVaccineInventory } from "@/routes"
import { Link } from "@inertiajs/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Ellipsis } from "lucide-react"
import { VaccineType } from "@/pages/vaccine-management/column"
import DeleteConfirmation from "@/components/vaccine_components/alert-dialog"
import { VaccineBatchesForm } from "@/components/vaccine_components/vaccine-batches-form"
import { useState } from "react"
import { Dialog } from "radix-ui"


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
            // For dropdown edit open state
            const [openDropdown, setOpenDropdown] = useState(false)
            // For disabling button when vaccine expiired
            const expired_vaccine = row.original.status

            return (
                <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>

                    {/* start diable button if expired vaccine ----------*/}
                    {
                        expired_vaccine
                            ?
                            <DropdownMenuTrigger asChild >
                                <Button variant={'ghost'} className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size={'icon'}>
                                    <Ellipsis />
                                </Button>
                            </DropdownMenuTrigger>
                            :
                            <Button disabled variant={'ghost'} className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size={'icon'}>
                                <Ellipsis />
                            </Button>
                    }
                    {/* ---------- end diable button if expired vaccine */}

                    <DropdownMenuContent >
                        {/* Edit */}
                        {/* <VaccineBatchesForm onOpenDropdown={() => setOpenDropdown(false)} update_batch_id={row.original} /> */}
                        <VaccineBatchesForm update_batch_id = {row.original}></VaccineBatchesForm>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        {/* Delete */}
                        <DeleteConfirmation handleDelete={() => handleDelete(delete_vaccine)} delete_vaccine_id={delete_vaccine} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]