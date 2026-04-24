import { Head } from '@inertiajs/react';
import { columns } from "./columns"
import { DataTable } from "../data-table"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { batchesVaccineInventory } from '@/routes';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';

export default function InventoryByBatch() {

    const data = [{
        id: 1,
        facility_name: "RHU 1",
        batch_lot_no: "BLN-001",
        drug_name: "Pentavalent Vaccine",
        expiration_date: "2024-12-31",
        stock_received: 100,
        balance: 80,
        status: "Active",
    },]

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='px-2'>
                    <div className='flex justify-between'>
                        <Label className='text-md flex items-center'>Vaccine Inventory</Label>
                        {/* <Button className='bg-blue-600 hover:bg-blue-700'><Plus /> Add Inventory</Button> */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='bg-blue-600 hover:bg-blue-700'> <Plus /> Add Inventory</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Vaccinne</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Enter vaccine details.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className='flex flex-col gap-2'>
                                    <div className='w-full gap-2 flex flex-col'>
                                        <Label>Name of Health Faculty:</Label>
                                        <Input></Input>
                                    </div>
                                    <div className='flex gap-4'>
                                        <div className='w-full flex flex-col gap-2'>
                                            <Label>Name of Drug:</Label>
                                            <Input></Input>
                                        </div>
                                        <div className='w-full flex flex-col gap-2'>
                                            <Label>Batch Number:</Label>
                                            <Input></Input>
                                        </div>
                                    </div>
                                    <div className='flex gap-4'>
                                        <div className='w-full flex flex-col gap-2'>
                                            <Label>Stock Received:</Label>
                                            <Input></Input>
                                        </div>
                                        <div className='w-full flex flex-col gap-2'>
                                            <Label>Expiration Date:</Label>
                                            <Input></Input>
                                        </div>
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
    );
}

InventoryByBatch.layout = {
    breadcrumbs: [
        {
            title: 'Vaccine Inventory',
            href: batchesVaccineInventory(),
        },
    ],
};
