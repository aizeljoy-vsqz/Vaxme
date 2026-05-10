"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Ellipsis, Trash2Icon } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
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

export type DailyVaccine = {
    id: number
    created_at: Date
    vaccine_batch_id: number,
    stock_transferred: number,
    daily_dispense: number,
    number_of_receipients: number,
    current_balance: number,
    vaccine_lose: number
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
        cell: ({ row }) => {
            const daily_inventory_id = (row.original.id);
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
                                <span className="font-medium">Delete daily vaccine invetory?</span>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your vaccine invetory info.
                                </AlertDialogDescription>
                            </div>
                        </AlertDialogHeader>
                        <Separator />
                        <AlertDialogFooter>
                            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-100 text-red-600 hover:bg-red-200" onClick={() => { handleDelete(daily_inventory_id) }}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )
        }
    },
]