"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"

export type VaccineType = {
    id: number
    name: string
    description: string
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
        cell: ({ row }) => {
            const delete_vaccine_id = row.original.id
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
                        <DropdownMenuItem variant="destructive" onClick={()=>{handleDelete(delete_vaccine_id)}}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]