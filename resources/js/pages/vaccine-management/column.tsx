"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, 
        DropdownMenuContent, 
        DropdownMenuItem, 
        DropdownMenuSeparator, 
        DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"

export type VaccineBatch = {
    id: number
    vaccine_name: string
    vaccine_description: string
}

export const columns: ColumnDef<VaccineBatch>[] = [
    {
        accessorKey: "vaccine_name",
        header: "Vaccine Name"
    },
    {
        accessorKey: "vaccine_description",
        header: "Vaccine Description",
        cell: ({ row }) => {
            return (
                <div className="text-wrap">
                    {row.getValue("vaccine_description")}
                </div>
            )
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