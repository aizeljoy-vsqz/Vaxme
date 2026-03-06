import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns, Payment } from './columns';
import { DataTable } from '../data-table';
import { Separator } from '@/components/ui/separator';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/inventory',
    },
];

const data: Payment[] = [
    // Fetch data from your API here.
    {
        id: "728ed52f",
        health_facility: "RHU-1",
        batch_no: 1,
        drug_name: "Penta",
        expiration: "09/19/27",
        stock_received: 10,
        balance: 20,
        status: 'good',
        actions: "...",
    },
]

export default function Inventory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* container for label & button */}
                <div className='flex justify-between items-center'>
                    <label className='text-sm font-medium'>Vaccine Inventory</label>
                    <Button className='bg-blue-500 hover:bg-blue-700'><Plus />Add inventory</Button>
                </div>
                <Separator/>
                {/* container for table */}
                <div className='px-2'>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
