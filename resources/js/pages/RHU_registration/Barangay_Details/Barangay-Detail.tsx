"use client";

import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { PopulationTable } from './Details/details';
// import ExportDialog from './Dialog_Edit/ExportDetails';

type PopulationRow = {
    id: string;
    barangayName?: string;
    ageRange: string;
    male: number;
    female: number;
    total: number;
};

export function BarangayDetails({ populations = [], selectedBarangayId }: { populations?: PopulationRow[]; selectedBarangayId?: string }) {
    const barangayName = populations?.[0]?.barangayName ?? 'Barangay';
    const year = new Date().getFullYear();

    return (
        <>
            <Head title="Registration" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col px-2">
                    <div className="flex items-center justify-between">
                        <Label className="text-md">{`Barangay ${barangayName} Registration (${year})`}</Label>
                        {/* <ExportDialog bhcId={selectedBarangayId} barangayName={barangayName} /> */}
                    </div >
                    <div className=''>
                        <PopulationTable populations={populations} />
                    </div>
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
