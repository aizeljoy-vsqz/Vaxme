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
import { ArrowBigLeftDashIcon } from 'lucide-react';

export default function BhuDashboard() {
    return (
        <>
            <Head title="Barangay Name" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-6">
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <Label className='text-md font-bold'>Return Vaccine</Label>
                        <p className='text-xs text-gray-500 font-thin'>Unused vaccine items are auto added below</p>
                    </div>
                    <Button className='bg-blue-600 w-auto hover:bg-blue-700 cursor-pointer'>Return <ArrowBigLeftDashIcon></ArrowBigLeftDashIcon></Button>
                </div>
                <div className='h-full'>
                    <RequestTable></RequestTable>
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