import { Head } from '@inertiajs/react';
import HistoryItem from '@/components/request_vaccine/history_vaccination_item';
import { Label } from '@/components/ui/label';

export default function HistoryVaccination() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Label>Vaccination History</Label>
                <div>
                    <Label className='p-8'>Monday 22, February 2026</Label>
                    <HistoryItem />  
                </div>
            </div>
        </>
    );
}

HistoryVaccination.layout = {
    breadcrumbs: [
        {
            title: 'History Vaccinatio',
            href: '',
        },
    ],
};
