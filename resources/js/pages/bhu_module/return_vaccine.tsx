import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import EmptyPage from '@/components/vaccine_components/empty-page';
import { usePoll } from '@inertiajs/react'

export default function BhuDashboard() {

    const [processing, setProcessing] = useState(false);
    type RequestItem = {
        id: number;
        name: string;
        vaccine: {
            id: number;
            name: string;
        };
        is_vaccinated: boolean;
    };

    type VaccineRequest = {
        id: number;
        type: "request" | "return";
        status: "submitted" | "reviewed" | "approved";
        is_returned: boolean;
        items: RequestItem[];
    };

    type PageProps = {
        requests: VaccineRequest[];
    };

    const handleReturn = () => {
        setProcessing(true);
        if (!selectedRequest) {
            return;
        }

        const unusedItems = selectedRequest.items.filter(
            (item) => !item.is_vaccinated
        );

        router.post('/bhc/return/vaccines/store', {
            preserveScroll: true,
            request_id: selectedRequest.id,
            items: unusedItems.map(item => ({
                name: item.name,
                vaccine_id: item.vaccine.id,
            })),
        }, {
            onSuccess: () => {
                setProcessing(false);
                setOpen(false);
                setSelectedRequest(null);

                router.reload({
                    only: ['requests'],
                });

                toast.success("Return submitted successfully", { position: "top-right" });
            },
            onError: (errors) => {
                setOpen(false);
                setProcessing(false);
                if (errors.request_id) {
                    toast.error(errors.request_id, { position: "top-right" });
                }
            }
        });
    };

    const [open, setOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<VaccineRequest | null>(null);
    const { requests } = usePage<PageProps>().props;

    usePoll(2000)


    return (
        <>
            <Head title="Return Vaccine" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-4">

                {/* Header */}
                <div>

                    <Label className="text-lg font-bold">
                        Return unused vaccines
                    </Label>

                    <p className="text-sm text-muted-foreground">
                        View vaccine requests and return remaining doses
                    </p>

                </div>
                {/* Empty State */}
                {requests.length === 0 ? (
                    <EmptyPage title="No Vaccine To Return Found" description="You have no vaccine to return." />
                ) : (<div className="flex-1 overflow-y-auto">

                    <div className="flex flex-col gap-4 pr-1">

                        {requests.map((request) => {

                            const unusedItems = request.items.filter(
                                (item) => !item.is_vaccinated
                            );

                            const isAlreadyReturned = request.is_returned;

                            return (

                                <div
                                    key={request.id}
                                    onClick={() => {
                                        setSelectedRequest(request);
                                        setOpen(true);
                                    }}
                                    className="group cursor-pointer rounded-2xl border bg-background p-6 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md"
                                >

                                    {/* Header */}
                                    <div className="flex items-start justify-between">

                                        <div className="space-y-1">

                                            <div className="flex items-center gap-2">

                                                <h3 className="text-md font-semibold">
                                                    Request Vaccine
                                                </h3>

                                                <span className="rounded-md bg-muted px-2 py-1 text-xs">
                                                    #{request.id}
                                                </span>

                                            </div>

                                            <p className="text-xs text-muted-foreground">
                                                {unusedItems.length} unused vaccine(s)
                                            </p>


                                        </div>

                                        <Badge className='capitalize font-medium' variant={'outline'}>{unusedItems[0]?.vaccine?.name}</Badge>



                                    </div>

                                    {/* Return Status */}
                                    <div className="mt-4 flex items-center justify-between rounded-xl border px-4 py-3 text-sm border-slate-200 bg-slate-50 text-muted-foreground">

                                        <div>
                                            {isAlreadyReturned
                                                ?
                                                <>
                                                    <p className="text-sm font-medium text-green-500">
                                                        Returned
                                                    </p>

                                                    <p className="text-xs">
                                                        Click to review returned vaccines.
                                                    </p>
                                                </>
                                                :
                                                <>
                                                    <p className="text-sm font-medium text-yellow-500">
                                                        Ready for return
                                                    </p>

                                                    <p className="text-xs">
                                                        Click to review unused vaccines before returning them to RHU.
                                                    </p>
                                                </>
                                            }



                                        </div>

                                    </div>

                                </div>

                            );
                        })}

                    </div>

                </div>)}
                {/* Scrollable Content */}


            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-3xl">

                    <DialogHeader>
                        <DialogTitle>
                            Request Items #{selectedRequest?.id}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 min-h-48 max-h-48 overflow-y-auto">
                        {selectedRequest?.items
                            ?.filter(item => !item.is_vaccinated)
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between rounded-lg border p-3"
                                >
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {item.vaccine?.name}
                                        </p>
                                    </div>

                                    <span className="text-xs text-red-500">
                                        Not vaccinated
                                    </span>
                                </div>
                            ))}
                    </div>
                    <div className="flex justify-end pt-4 border-t">
                        <Button onClick={handleReturn} disabled={processing}>
                            Return
                        </Button>
                    </div>

                </DialogContent>
            </Dialog>
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