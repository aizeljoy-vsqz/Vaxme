import { Head, usePage } from '@inertiajs/react';
import track from '@/routes/track';
import { Label } from '@/components/ui/label';
import TrackVaccine from '@/components/request_vaccine/track_vaccination';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


export default function TrackVaccination() {

    type RequestItem = {
        id: number;
        name: string;
        vaccine: string;
        is_vaccinated: boolean;
    };

    type VaccineRequest = {
        id: number;
        type: 'request' | 'return';
        status: 'submitted' | 'reviewed' | 'approved';
        created_at: string;
        items: RequestItem[];
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
                    <div className="mt-3 flex flex-wrap items-center gap-2">

                        <Badge variant={'outline'}>All: {requests.length}</Badge>
                        <Badge variant={'outline'}>Requests: {requests.filter((r) => r.type === 'request').length}</Badge>
                        <Badge variant={'outline'}>Returns: {requests.filter((r) => r.type === 'return').length}</Badge>

                    </div>
                    <div className="flex flex-wrap gap-2">

                        {/* TYPE FILTER */}
                        <div className="flex gap-2">

                            <Button
                                type="button"
                                variant={typeFilter === 'all' ? 'default' : 'outline'}
                                onClick={() => setTypeFilter('all')}
                            >
                                All
                            </Button>

                            <Button
                                type="button"
                                variant={typeFilter === 'request' ? 'default' : 'outline'}
                                onClick={() => setTypeFilter('request')}
                            >
                                Requests
                            </Button>

                            <Button
                                type="button"
                                variant={typeFilter === 'return' ? 'default' : 'outline'}
                                onClick={() => setTypeFilter('return')}
                            >
                                Returns
                            </Button>

                        </div>

                    </div>

                </div>
                <div className='flex flex-col gap-4 p-4'>
                    {/* <TrackVaccine /> */}
                    {filteredRequests.map((request) => (
                        <TrackVaccine key={request.id} request={request} />
                    ))}
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
