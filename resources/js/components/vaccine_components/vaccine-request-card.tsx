
import { router } from "@inertiajs/react"
import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import type { VaccineBatch } from "@/pages/inventory/inventory-vaccine-batches/columns"
import { CircleAlert, CircleCheckBig } from "lucide-react"
import { Label } from "../ui/label"

interface VaccineRequestCardProps {
    request: {
        id: number;
        type: 'request' | 'return';
        status: 'submitted' | 'reviewed' | 'approved' | 'rejected';
        rejection_reason?: string;
        created_at: string;
        batch_id?: number;
        items: {
            id: number;
            name: string;
            vaccine: {
                id: number;
                name: string;
            };
            is_vaccinated: boolean;
        }[];
        bhc?: {
            barangay_name: string;
        }
        batch?: {
            batch_number: string;
        };
    }
    batches: VaccineBatch[];
}

export default function VaccineRequestCard({ request, batches }: VaccineRequestCardProps) {

    console.log("request batch id:", request.batch_id);
    const [selectedBatch, setSelectedBatch] = useState("");
    const [openApprove, setOpenApprove] = useState(false);
    const isReturn = request.type === "return";
    const isRequest = request.type === "request";
    const isApproved = request.status === "approved";
    const isRejected = request.status === "rejected";
    const [processing, setProcessing] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");

    const filteredBatches = batches.filter(
        (batch) =>
            (batch.vaccine.name).toLowerCase() === request.items[0]?.vaccine.name.toLowerCase() &&
            batch.status &&
            batch.current_balance >= request.items.length
    )

    const handleApprove = () => {
        router.put(`/vaccine-request/${request.id}/approve`,
            {
                batch_id: selectedBatch,
            },
            {
                onSuccess: () => {
                    setOpenApprove(false);

                    // toast.success("Approved successfully", { position: "top-right" });
                    toast(
                        <div className="flex gap-1 justify-center">
                            <CircleCheckBig className="p-1 text-green-500" />
                            <Label>Request approved successfully.</Label>
                        </div>, { position: 'top-right' }
                    );
                },
                onError: (errors) => {
                    // toast.error(errors.request || "Failed to approve request", {
                    //     position: "top-right",
                    // });
                    toast(
                        <div className="flex gap-1 justify-center">
                            <CircleAlert className="p-1 text-red-500" />
                            <Label>{errors.request || "Failed to approve request"}</Label>
                        </div>, { position: 'top-right' }
                    );

                    console.error(errors);

                    if (request.type === "return") {
                        setOpenApprove(false);
                    }
                },
                onFinish: () => {
                    setProcessing(false);
                },
            }
        )

    }

    const handleReject = () => {

        setProcessing(true);

        router.put(
            `/vaccine-request/${request.id}/reject`,
            {
                rejection_reason: rejectionReason,
            },
            {
                onSuccess: () => {

                    // toast.success("Request rejected", {
                    //     position: "top-right",
                    // });
                    toast(
                        <div className="flex gap-1 justify-center">
                            <CircleCheckBig className="p-1 text-green-500" />
                            <Label>Request rejected.</Label>
                        </div>, { position: 'top-right' }
                    );
                    setOpenReject(false);
                    setRejectionReason("");
                },

                onError: (errors) => {

                    toast.error(
                        errors.request || "Failed to reject request",
                        {
                            position: "top-right",
                        }
                    );

                    console.error(errors);
                },

                onFinish: () => {
                    setProcessing(false);
                },
            }
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "submitted":
                return "";

            case "reviewed":
                return "bg-blue-100 text-blue-700 border-blue-200";

            case "approved":
                return "bg-green-100 text-green-700 border-green-200";

            case "rejected":
                return "bg-red-100 text-red-700 border-red-200";

            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <Card className="justify-center gap-2 py-4 rounded-2xl border-border/50 bg-background/80 shadow-xs transition-all hover:shadow-md w-xs md:w-full ">
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <CardTitle className="capitalize text-sm font-medium tracking-tight">
                            {request.type}
                        </CardTitle>

                        <CardDescription className="mt-1 text-xs">
                            Barangay {request.bhc?.barangay_name || 'N/A'}
                        </CardDescription>
                    </div>

                    <Badge variant="outline" className={`${getStatusBadge(request.status)}`} >{request.status}</Badge>
                </div>

                <Separator />
            </CardHeader>

            <CardContent className="py-2">

                <div className="space-y-4 mb-4">
                    <div>
                        <h4 className="text-xs font-medium text-muted-foreground">
                            Requested Details
                        </h4>
                    </div>

                    <div className="px-2 min-h-32 max-h-32 overflow-y-auto">
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                            {request.items.map((item) => (
                                <li key={item.id} className="text-xs">
                                    {item.name}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>


                <div className="flex items-center justify-between rounded-xl border bg-muted/20 px-3 py-2">

                    <span className="text-xs text-muted-foreground">
                        Vaccine Needed
                    </span>

                    <span className="font-medium text-sm">
                        {request.items[0]?.vaccine.name || 'N/A'}
                    </span>
                </div>
                {isRejected && request.rejection_reason && (

                    <div className="flex items-center justify-between mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2">

                        <p className="text-xs font-medium text-red-600">
                            Rejection Reason:
                        </p>

                        <p className="text-sm text-red-500">
                            {request.rejection_reason}
                        </p>

                    </div>

                )}
                {isApproved && request.batch && (

                    <div className="flex items-center justify-between mt-4 rounded-xl border border-green-200 bg-green-50 px-3 py-2">

                        <p className="text-xs font-medium text-green-700">
                            Approved Batch:
                        </p>

                        <p className="text-sm text-green-600">
                            {request.batch.batch_number}
                        </p>

                    </div>

                )}

            </CardContent>

            <CardFooter className="flex justify-end gap-3">

                {!isApproved && !isRejected && (
                    <>
                        {/* Reject Dialog */}
                        <Dialog open={openReject} onOpenChange={setOpenReject}>

                            <DialogTrigger asChild>

                                <Button
                                    variant={"outline"}
                                    className="border border-red-400 hover:text-red-500 hover:bg-red-50 text-red-500"
                                >
                                    Reject
                                </Button>

                            </DialogTrigger>

                            <DialogContent>

                                <DialogHeader>

                                    <DialogTitle>
                                        Reject Request
                                    </DialogTitle>

                                    <DialogDescription>
                                        Provide a reason for rejecting this request.
                                    </DialogDescription>

                                </DialogHeader>

                                <Textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Enter rejection reason..."
                                />

                                <DialogFooter>

                                    <DialogClose className="w-auto py-1 px-4 border border-red-400 rounded-md hover:text-red-500 hover:bg-red-50 text-red-500">
                                        Cancel
                                    </DialogClose>

                                    <Button
                                        onClick={handleReject}
                                        disabled={processing || !rejectionReason.trim()}
                                        className="bg-red-500 hover:bg-red-600 hover:text-white text-white"
                                    >
                                        Confirm Reject
                                    </Button>

                                </DialogFooter>

                            </DialogContent>

                        </Dialog>

                        {/* Approve Dialog */}
                        <Dialog open={openApprove} onOpenChange={setOpenApprove}>
                            <DialogTrigger className="py-2 px-4 text-sm rounded-md bg-blue-500 hover:bg-blue-600 hover:text-white text-white">Approve</DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        {isReturn
                                            ? "Return to Batch Inventory"
                                            : "Approve Vaccine Request"}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {isReturn
                                            ? "Vaccine batch inventory is already linked from its original request."
                                            : "Choose the vaccines batch to approve for this request."}
                                    </DialogDescription>
                                </DialogHeader>
                                {isRequest && (
                                    <>
                                        <Select
                                            value={selectedBatch}
                                            onValueChange={setSelectedBatch}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a vaccine batch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {filteredBatches.length > 0 ? (

                                                        filteredBatches.map((batch) => (
                                                            <SelectItem
                                                                key={batch.id}
                                                                value={String(batch.id)}
                                                            >
                                                                {batch.batch_number} - {batch.vaccine.name} ({batch.current_balance} doses)
                                                            </SelectItem>
                                                        ))

                                                    ) : (

                                                        <div className="p-1 text-sm text-muted-foreground text-center">
                                                            No available vaccine batch
                                                        </div>

                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">
                                            Selected Batch: {selectedBatch}
                                        </p>
                                    </>
                                )}

                                <DialogFooter>
                                    <DialogClose className="w-auto py-1 px-4 border border-red-400 rounded-md hover:text-red-500 hover:bg-red-50 text-red-500">
                                        Cancel
                                    </DialogClose>
                                    <Button onClick={handleApprove} variant={"ghost"} disabled={processing} className="bg-blue-600 hover:bg-blue-700 hover:text-white text-white">Confirm</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                )}

            </CardFooter>
        </Card>
    )
}
