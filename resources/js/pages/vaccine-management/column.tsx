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
import { Ellipsis, Trash2Icon } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
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

                <AlertDialog>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size={'icon'}>
                                <Ellipsis />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem variant="destructive" >Delete</DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent size="sm">
                        <AlertDialogHeader className="flex flex-col gap-3">
                            <div className="p-2 rounded-md bg-red-100 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                <Trash2Icon className="" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-medium">Delete vaccine?</span>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your vaccine info.
                                </AlertDialogDescription>
                            </div>
                        </AlertDialogHeader>
                        <Separator />
                        <AlertDialogFooter>
                            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-100 text-red-600 hover:bg-red-200" onClick={() => { handleDelete(delete_vaccine_id) }}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            )
        }
    },
]