import { Head, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
        status: 'submitted' | 'reviewed' | 'approved';
        created_at: string;
        items: RequestItem[];
    };

    type PageProps = {
        requests: VaccineRequest[];
        batches: VaccineBatch[];
    };

    const { requests, batches } = usePage<PageProps>().props;

    console.log(requests);
    console.log(batches);

    return (
        <>
            <Head title="Vaccine Request" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4 px-6">
                <Label className='text-md flex items-center'>Barangay Vaccine Request</Label>
                <span className="text-sm text-muted-foreground">
                    Review and manage vaccine requests from barangays.
                </span>
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className='mb-2'>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>
                    </TabsList>

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
