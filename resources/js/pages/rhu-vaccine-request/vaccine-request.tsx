import { Head } from '@inertiajs/react';
import { vaccineRequest } from '@/routes';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VaccineRequestCard from '@/components/vaccine_components/vaccine-request-card';
export default function VaccineRequest() {
    return (
        <>
            <Head title="Vaccine Request" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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
                    <div className='flex gap-4'>
                        <VaccineRequestCard/>
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
