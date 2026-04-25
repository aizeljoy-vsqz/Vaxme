"use client";

import { Head } from '@inertiajs/react';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Upload} from 'lucide-react';
import { PopulationTable } from './Details/details';

type PopulationRow = {
    id: string;
    barangayName?: string;
    ageRange: string;
    male: number;
    female: number;
    total: number;
};

export function BarangayDetails({ populations = [] }: { populations?: PopulationRow[] }) {
    return (
    <>
         <Head title="Registration" />
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-2">
               <Label className="text-lg font semibold">Barangay Alawihao Registration (2024)</Label>
                <Button variant="outline"
                className="text-blue-500 border-blue-400 hover:bg-blue-600 hover:text-white">
                        <Upload/>
                        Export
                   </Button>
            </div >
            <div className='px-2'>
             <PopulationTable populations={populations}/>
            </div>
        </div>
    </>
    );
}

BarangayDetails.layout = {
    breadcrumbs: [
        {

        title: 'Registration',
        href: '/registration/brgy-details',

        },
    ]
};

export default BarangayDetails;
