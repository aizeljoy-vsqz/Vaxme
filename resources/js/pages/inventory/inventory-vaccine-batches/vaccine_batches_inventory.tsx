import { Head, useForm, usePage } from '@inertiajs/react';
import { columns, VaccineBatch } from "./columns"
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

    const { data, setData, post } = useForm({
        // rhu_id: 'ss',
        batch_number: '',
        vaccine_id: 1,
        expiration_date: '',
        stock_receive: 0,
        current_balance: 0,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post('/vaccine/inventory/store');
    }

    interface PageProps {
        [key: string]: unknown
        vaccine_batches: VaccineBatch[]
    }

    const { vaccine_batches } = usePage<PageProps>().props

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='px-2'>
                    <div className='flex justify-between'>
                        <Label className='text-md flex items-center'>Vaccine Inventory</Label>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='bg-blue-600 hover:bg-blue-700'> <Plus /> Add Inventory</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form onSubmit={handleSubmit}>
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
                                                <Input value={data.vaccine_id} onChange={(e) => setData('vaccine_id', Number(e.target.value))}></Input>
                                            </div>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Batch Number:</Label>
                                                <Input value={data.batch_number} onChange={(e) => setData('batch_number', e.target.value)}></Input>
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Stock Received:</Label>
                                                <Input value={data.stock_receive} onChange={(e) => setData('stock_receive', Number(e.target.value))}></Input>
                                            </div>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Expiration Date:</Label>
                                                <Input value={data.expiration_date} onChange={(e) => setData('expiration_date', e.target.value)}></Input>
                                            </div>
                                        </div>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction type={'submit'} className='!bg-blue-600 hover:!bg-blue-700'>Save</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className='px-4'>
                        <DataTable columns={columns} data={vaccine_batches} />
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
