import { Head, usePage } from '@inertiajs/react';
import { usePoll } from '@inertiajs/react'
import { useMemo, useState } from 'react';
import TrackVaccine from '@/components/request_vaccine/track_vaccination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import EmptyPage from '@/components/vaccine_components/empty-page';
import track from '@/routes/track';
import type { VaccineType } from '../vaccine-management/column';

export default function TrackVaccination() {

    type RequestItem = {
        id: number;
        name: string;
        vaccine: VaccineType;
        is_vaccinated: boolean;
    };

    type VaccineRequest = {
        id: number;
        type: 'request' | 'return';
        status: 'submitted' | 'reviewed' | 'approved' | 'rejected';
        created_at: string;
        items: RequestItem[];
        rejection_reason: string
    };

    type PageProps = {
        requests: VaccineRequest[];
    };

    const { requests } = usePage<PageProps>().props;

    const [typeFilter, setTypeFilter] = useState<'all' | 'request' | 'return'>('all');

    const filteredRequests = useMemo(() => {
        return requests.filter((request) => {

            const matchesType =
                typeFilter === 'all' || request.type === typeFilter;

            return matchesType;
        });
    }, [requests, typeFilter]);

    console.log(requests);

    usePoll(2000)

    return (
        <>
            <Head title="Track Vaccine Status" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>

                    <Label className='text-lg font-bold'>Track and Manage Vaccines</Label>
                    <p className='text-sm text-gray-500 font-thin'>Manage and track the status of your vaccine requests and returns here.</p>

                </div>



                <div className="flex flex-col gap-3 rounded-2xl md:flex-row md:items-center md:justify-between">

                    {/* COUNTS */}
                    <div className="mt-3 flex flex-wrap gap-3">

                        <div className='flex gap-1'>
                            <span className='text-sm'>All:</span>
                            <Badge variant={'secondary'}>{requests.length}</Badge>
                        </div>
                        <div className='flex gap-1'>
                            <span>Requests:</span>
                            <Badge className='text-blue-500' variant={'secondary'}>{requests.filter((r) => r.type === 'request').length}</Badge>
                        </div>
                        <div className='flex gap-1'>
                            <span>Returns:</span>
                            <Badge className='text-red-500' variant={'secondary'}>{requests.filter((r) => r.type === 'return').length}</Badge>
                        </div>

                    </div>
                    <div className="flex flex-wrap gap-2">

                        {/* TYPE FILTER */}
                        <div className="flex gap-2">

                            <Button
                                type="button"
                                className={"type-filter-button" + (typeFilter === 'all' ? ' bg-blue-600 hover:bg-blue-700 text-white' : '')}
                                variant={typeFilter === 'all' ? 'default' : 'outline'}
                                onClick={() => setTypeFilter('all')}
                            >
                                All
                            </Button>

                            <Button
                                type="button"
                                className={"type-filter-button" + (typeFilter === 'request' ? ' bg-blue-600 hover:bg-blue-700 text-white' : '')}
                                variant={typeFilter === 'request' ? 'default' : 'outline'}
                                onClick={() => setTypeFilter('request')}
                            >
                                Requests
                            </Button>

                            <Button
                                type="button"
                                className={"type-filter-button" + (typeFilter === 'return' ? ' bg-blue-600 hover:bg-blue-700 text-white' : '')}
                                variant={typeFilter === 'return' ? 'default' : 'outline'}
                                onClick={() => setTypeFilter('return')}
                            >
                                Returns
                            </Button>

                        </div>
                    </div>

                </div>
                <div className='flex flex-col gap-4 p-4'>
                    {/* Empty State */}
                    {filteredRequests.length === 0 ? (
                        <EmptyPage title="No Vaccine Requests Found" description="You have no vaccine requests to display." />
                    ) : (
                        /* <TrackVaccine /> */
                        filteredRequests.map((request) => (
                            <TrackVaccine key={request.id} request={request} />
                        ))
                    )}
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
