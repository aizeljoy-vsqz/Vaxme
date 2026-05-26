import { Head, usePage } from '@inertiajs/react';
import { usePoll } from '@inertiajs/react'
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmptyPage from '@/components/vaccine_components/empty-page';
import VaccineRequestCard from '@/components/vaccine_components/vaccine-request-card';
import { vaccineRequest } from '@/routes';
import type { VaccineBatch } from '../inventory/inventory-vaccine-batches/columns';

export default function VaccineRequest() {

    type RequestItem = {
        id: number;
        name: string;
        vaccine: {
            id: number
            name: string
        };
        is_vaccinated: boolean;
    };

    type VaccineRequest = {
        id: number;
        type: 'request' | 'return';
        status: 'submitted' | 'reviewed' | 'approved' | 'rejected';
        created_at: string;
        items: RequestItem[];
    };

    type PageProps = {
        requests: VaccineRequest[];
        batches: VaccineBatch[];
    };

    const { requests, batches } = usePage<PageProps>().props;

    const submittedRequests = requests.filter(
        (request) => request.status === "submitted"
    );

    const rejectedRequests = requests.filter(
        (request) => request.status === "rejected"
    );

    const approvedRequests = requests.filter(
        (request) => request.status === "approved"
    );

    console.log(requests);
    console.log(batches);

    usePoll(2000)


    return (
        <>
            <Head title="Vaccine Request" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4 px-6">
                <Label className='text-md flex items-center'>Barangay Vaccine Request</Label>
                <span className="text-sm text-muted-foreground">
                    Review and manage vaccine requests from barangays.
                </span>
                <Tabs defaultValue="submitted" className="w-full">
                    <TabsList className='mb-2'>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="submitted">Submitted</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                    </TabsList>
                    {/* Empty State */}
                    {requests.length === 0 ? (
                        <EmptyPage title="No Vaccine Requests Found" description="You have no vaccine requests to display." />
                    ) : (
                        <div>
                            <TabsContent value='all'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center'>
                                    {requests.map((request) => (
                                        <VaccineRequestCard
                                            key={request.id}
                                            request={request}
                                            batches={batches}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value='submitted'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center'>
                                    {submittedRequests.map((request) => (
                                        <VaccineRequestCard
                                            key={request.id}
                                            request={request}
                                            batches={batches}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value='rejected'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center'>
                                    {rejectedRequests.map((request) => (
                                        <VaccineRequestCard
                                            key={request.id}
                                            request={request}
                                            batches={batches}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value='approved'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center'>
                                    {approvedRequests.map((request) => (
                                        <VaccineRequestCard
                                            key={request.id}
                                            request={request}
                                            batches={batches}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                        </div>
                    )}
                </Tabs>
            </div>
        </>
    );
}

VaccineRequest.layout = {
    breadcrumbs: [
        {
            title: 'Vaccine Request',
            href: vaccineRequest(),
        },
    ],
};
