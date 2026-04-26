import { Head } from '@inertiajs/react';
import track from '@/routes/track';
import { Label } from '@/components/ui/label';
import TrackVaccine from '@/components/request_vaccine/track_vaccination';

export default function TrackVaccination() {
    return (
        <>
            <Head title="Track Vaccine Status" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Label className='text-md font-bold'>Return and Request Vaccine Status</Label>
                    <p className='text-xs text-gray-500 font-thin'>Track the status of your vaccine requests and returns here.</p>
                </div>
                <div className='flex flex-col gap-4 p-4'>
                    <TrackVaccine />
                </div>
            </div>
        </>
    );
}

TrackVaccination.layout = {
    breadcrumbs: [
        {
            title: 'Track Vaccine Status',
            href: track.vaccination(),
        },
    ],
};
