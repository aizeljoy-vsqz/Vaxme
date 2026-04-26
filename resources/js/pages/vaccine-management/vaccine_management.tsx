import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DataTable } from "./data-table"
import { columns } from "./column"
import { Plus } from "lucide-react"

export default function VaccineManagement() {
    const data = [
        {
            id: 1,
            vaccine_name: "Penta",
            vaccine_description: "Pentavalent vaccine protects against five diseases."
        },
    ]

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="px-2">
                    <div className='flex justify-between'>
                        <Label className='text-md flex items-center'>Vaccine Management</Label>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='bg-blue-600 hover:bg-blue-700'> <Plus /> Add Inventory</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Vaccine Details</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Enter vaccine details.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className='flex flex-col gap-2'>
                                    <div className='w-full gap-2 flex flex-col'>
                                        <Label>Name of Vaccine:</Label>
                                        <Input></Input>
                                    </div>
                                    <div className='w-full gap-2 flex flex-col'>
                                        <Label>Vaccine Description:</Label>
                                        <Input></Input>
                                    </div>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className='!bg-blue-600 hover:!bg-blue-700'>Save</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className='px-4'>
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}

VaccineManagement.layout = {
    breadcrumbs: [
        {
            title: 'Vaccine Management',
        },
    ],
}   