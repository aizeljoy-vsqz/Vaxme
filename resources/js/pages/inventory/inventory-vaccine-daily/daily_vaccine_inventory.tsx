import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { dailyVaccineInventory } from '@/routes';
import { Head, useForm } from '@inertiajs/react';
import { Download, Plus } from 'lucide-react';
import { DataTable } from '../data-table';
import { columns } from './columns';
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
import { SyntheticEvent } from 'react';
import { setDate } from 'date-fns';
export default function DailyInventory() {

    const dataa = [
        {
            id: 1,
            batch_id: 22,
            date: new Date("2024-06-01"),
            quantity_in: 50,
            expired_lose_damage: 2,
            quantity_out: 10,
            no_of_receipients: 10,
            balance: 38
        },
    ]

    // For Form Submission
    const { data, setData, post } = useForm({
        vaccine_batches_id: 1,
        stock_transferred: 0,
        daily_dispense: 0,
        number_of_receipients: 0,
        current_balance: 0,
        vaccine_lose: 0
    })

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(data);
        post('/daily/vaccine/inventory/store');        
    }

    return (
        <>
            <Head title="Daily Inventory" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='px-2'>
                    <div className='flex justify-between'>
                        <Label className='text-md flex items-center'>Penta</Label>
                        <div className='flex gap-2'>
                            <Button variant={'outline'} className='text-blue-600 border border-blue-600 hover:text-blue-700'><Download />Export</Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className='bg-blue-600 hover:bg-blue-700'><Plus /> Add Inventory</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <form onSubmit={handleSubmit}>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Vaccinne (Penta)</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Enter vaccine details.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-4'>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>Daily Dispensed:</Label>
                                                    <Input value={data.daily_dispense} onChange={(e) => setData('daily_dispense', Number(e.target.value))} placeholder='e.g. 5'></Input>
                                                </div>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>No. of Receipients:</Label>
                                                    <Input value={data.number_of_receipients} onChange={(e) => setData('number_of_receipients', Number(e.target.value))} placeholder='e.g. 5'></Input>
                                                </div>
                                            </div>
                                            <div className='flex gap-4'>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>Stock Transferred:</Label>
                                                    <Input value={data.stock_transferred} onChange={(e) => setData('stock_transferred', Number(e.target.value))} placeholder='e.g. 5'></Input>
                                                </div>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>Expiration/Lose/Damage:</Label>
                                                    <Input value={data.vaccine_lose} onChange={(e) => setData('vaccine_lose', Number(e.target.value))} placeholder='e.g. 2'></Input>
                                                </div>
                                            </div>
                                        </div>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction type='submit' className='!bg-blue-600 hover:!bg-blue-700'>Save</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </form>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    <div className='px-4'>
                        <DataTable columns={columns} data={dataa} />
                    </div>
                </div>
            </div>
        </>
    );
}

DailyInventory.layout = {
    breadcrumbs: [
        {
            title: 'Daily Vaccine Inventory',
            href: dailyVaccineInventory(),
        },
    ],
};
