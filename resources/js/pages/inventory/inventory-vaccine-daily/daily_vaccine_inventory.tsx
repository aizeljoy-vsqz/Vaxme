import { Head, useForm, usePage } from '@inertiajs/react';
import { usePoll } from '@inertiajs/react'
import { CircleAlert, CircleCheckBig, Plus } from 'lucide-react';
import type { SyntheticEvent } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '../data-table';
import type { VaccineBatch } from '../inventory-vaccine-batches/columns';
import { columns } from './columns';
import type { DailyVaccine } from './columns';

export default function DailyInventory() {

    interface PageProps {
        [key: string]: unknown
        batch_id: number
        daily_inventory: DailyVaccine[]
        vaccine_name: string

        selected_vaccine_batch: VaccineBatch
    }

    const { batch_id, daily_inventory, vaccine_name, selected_vaccine_batch } = usePage<PageProps>().props

    const expired = selected_vaccine_batch.status


    // For Form Submission
    const { data, setData, post, errors, reset, clearErrors, processing } = useForm({
        vaccine_batch_id: batch_id,
        stock_transferred: '',
        daily_dispense: '',
        number_of_receipients: '',
        current_balance: 0,
        vaccine_lose: ''
    })

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        console.log(data);
        post('/daily/vaccine/inventory/store', {
            onSuccess: () => {
                reset();
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleCheckBig className="p-1 text-green-500" />
                        <Label>Daily vaccine inventory has been created.</Label>
                    </div>, { position: 'top-right' });
            }
        });
    }

    const { delete: destroy } = useForm()
    const handleDelete = (daily_inventory_id: number) => {
        destroy(`/daily/vaccine/inventory/delete/${daily_inventory_id}`, {
            onSuccess: () => {
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleAlert className="p-1 text-red-500" />
                        <Label>Daily vaccine inventory has been deleted.</Label>
                    </div>, { position: 'top-right' });
            }
        });
    }
    console.log(errors);
    console.log(vaccine_name);

    usePoll(2000)

    return (
        <>
            <Head title="Daily Inventory" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='px-2 h-full'>
                    <div className='flex justify-between mb-2'>
                        <Label className='text-md flex items-center'>{vaccine_name}</Label>
                        <div className='flex gap-2'>
                            {/* <Button variant={'outline'} className='text-blue-600 border border-blue-600 hover:text-blue-700'><Download />Export</Button> */}
                            <AlertDialog>
                                {expired ?
                                    <AlertDialogTrigger asChild>
                                        <Button onClick={() => clearErrors()} className='bg-blue-600 hover:bg-blue-700' disabled={processing}>
                                            <Plus /> Add Inventory
                                        </Button>
                                    </AlertDialogTrigger>
                                    :
                                    <AlertDialogTrigger asChild>
                                        <Button disabled onClick={() => clearErrors()} className='bg-blue-600 hover:bg-blue-700'><Plus /> Add Inventory</Button>
                                    </AlertDialogTrigger>
                                }

                                <AlertDialogContent>
                                    <form onSubmit={handleSubmit}>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Vaccinne ({vaccine_name})</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Enter vaccine details.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex gap-4'>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>Daily Dispensed:</Label>
                                                    <Input value={data.daily_dispense} onChange={(e) => setData('daily_dispense', e.target.value)} placeholder='e.g. 5'></Input>
                                                    <div className='text-red-500 text-sm'>{errors.daily_dispense}</div>
                                                </div>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>No. of Receipients:</Label>
                                                    <Input value={data.number_of_receipients} onChange={(e) => setData('number_of_receipients', e.target.value)} placeholder='e.g. 5'></Input>
                                                    <div className='text-red-500 text-sm'>{errors.number_of_receipients}</div>
                                                </div>
                                            </div>
                                            <div className='flex gap-4'>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>Stock Transferred:</Label>
                                                    <Input value={data.stock_transferred} onChange={(e) => setData('stock_transferred', e.target.value)} placeholder='e.g. 5'></Input>
                                                    <div className='text-red-500 text-sm'>{errors.stock_transferred}</div>
                                                </div>
                                                <div className='flex flex-col w-full gap-2'>
                                                    <Label>Expiration/Lose/Damage:</Label>
                                                    <Input value={data.vaccine_lose} onChange={(e) => setData('vaccine_lose', e.target.value)} placeholder='e.g. 2'></Input>
                                                    <div className='text-red-500 text-sm'>{errors.vaccine_lose}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <Button type='submit' className='!bg-blue-600 hover:!bg-blue-700' disabled={processing}>
                                                Save
                                            </Button>
                                        </AlertDialogFooter>
                                    </form>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Track your daily vaccine inventory.</span>
                    <div className='px-4'>
                        <DataTable columns={columns(handleDelete)} data={daily_inventory ?? []} />
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
        },
    ],
};
