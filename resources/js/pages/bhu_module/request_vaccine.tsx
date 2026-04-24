import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import RequestTable from '@/components/request_vaccine/request_table';
import { Input } from '@/components/ui/input';
import Request_Select from '@/components/request_vaccine/request_select';
import { Separator } from '@/components/ui/separator';
import { Plus, Send } from 'lucide-react';

export default function BhuDashboard() {
    return (
        <>
            <Head title="Barangay Name" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-6">
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <Label className='text-md font-bold'>Request New Vaccine</Label>
                        <p className='text-xs text-gray-500 font-thin'>Add names and vaccine below to request vaccines</p>
                    </div>
                    <Button className='bg-blue-600'>Send <Send></Send></Button>
                </div>
                <div className='h-full'>
                <RequestTable></RequestTable>
                </div>
                <Separator></Separator>
                <div className='flex gap-2'>
                    <Input placeholder='Enter full name: e.g. José Protasio Rizal Mercado y Alonso Realonda' className='flex-1'></Input>
                    <Request_Select></Request_Select>
                    <Button className='bg-blue-600'>Add <Plus></Plus></Button>
                </div>
            </div>
        </>
    );
}

BhuDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};