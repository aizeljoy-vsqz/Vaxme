"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Ellipsis } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import DeleteConfirmation from "@/components/vaccine_components/alert-dialog"
import VaccineForm from "@/components/vaccine_components/vaccine-management-form"
export type VaccineType = {
    id: number
    name: string
    description: string
    length: number
}

type ActionCellProps = {
    row: {
        original: VaccineType
    }
    handleDelete: (delete_vaccine_id: number) => void
}

function ActionCell({ row, handleDelete }: ActionCellProps) {
    const delete_vaccine_id = row.original.id

    const [openDropdown, setOpenDropdown] = useState(false)

    return (
        <DropdownMenu
            open={openDropdown}
            onOpenChange={setOpenDropdown}
        >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                >
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <VaccineForm
                    update_vaccine_id={row.original}
                    onOpenDropdown={() => setOpenDropdown(false)}
                />

                <DropdownMenuSeparator />

                <DeleteConfirmation
                    handleDelete={() => handleDelete(delete_vaccine_id)}
                    delete_vaccine_id={delete_vaccine_id}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns = (handleDelete: (delete_vaccine_id: number) => void): ColumnDef<VaccineType>[] => [
    {
        accessorKey: "name",
        header: "Vaccine Name"
    },
    {
        accessorKey: "description",
        header: "Vaccine Description",
        cell: ({ row }) => {
            return (
                <div className="text-wrap">
                    {row.getValue("description")}
                </div>
            )
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
    },
]