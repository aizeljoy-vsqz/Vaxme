import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { dailyVaccineInventory } from '@/routes';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { DataTable } from '../data-table';
import { columns } from './columns';

export default function DailyInventory() {

    const data = [{
    id: 1,
    batch_id: 22,
    date: 'May 6, 2024',
    quantity_in: 50,
    expired_lose_damage: 2,
    quantity_out: 10,
    no_of_receipients: 10,
    balance: 38
    },]

    return (
        <>
            <Head title="Daily Inventory" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex justify-between'>
                    <Label className='text-md flex items-center'>Penta</Label>
                    <div className='flex gap-2'>
                    <Button variant={'outline'} className='text-blue-600 border border-blue-600 hover:text-blue-700'><Plus />Export</Button>
                    <Button className='bg-blue-600 hover:bg-blue-700'><Plus />Add Inventory</Button>

                    </div>
                </div>
                <div className='px-4'>
                    <DataTable columns={columns} data={data} />
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
