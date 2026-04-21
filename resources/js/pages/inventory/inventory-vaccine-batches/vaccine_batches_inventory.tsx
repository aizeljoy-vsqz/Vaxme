import { Head } from '@inertiajs/react';
import { columns } from "./columns"
import { DataTable } from "../data-table"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { batchesVaccineInventory } from '@/routes';

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
                        <Button className='bg-blue-600 hover:bg-blue-700'><Plus /> Add Inventory</Button>
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
