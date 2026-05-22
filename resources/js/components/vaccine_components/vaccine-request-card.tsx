
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
import { VaccineBatch } from "@/pages/inventory/inventory-vaccine-batches/columns"
import { useState } from "react"
import { router } from "@inertiajs/react"
import { toast } from "sonner"

interface VaccineRequestCardProps {
    request: {
        id: number;
        type: 'request' | 'return';
        status: 'submitted' | 'reviewed' | 'approved';
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
    }
    batches: VaccineBatch[];
}

export default function VaccineRequestCard({ request, batches }: VaccineRequestCardProps) {

    console.log("request batch id:", request.batch_id);
    const [selectedBatch, setSelectedBatch] = useState("");
    const isReturn = request.type === "return";
    const isRequest = request.type === "request";
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
                        toast.success("Approved successfully");
                    },
                    onError: (errors) => {
                        toast.error("Failed to approve request");
                        console.error(errors);
                    },
                }
            )
            return;
        
    }

    return (
        <Card className="gap-2 rounded-2xl border-border/50 bg-background/80 shadow-xs transition-all hover:shadow-md w-xs md:w-full ">
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

                    <Badge variant="outline">{request.status}</Badge>
                </div>

                <Separator />
            </CardHeader>

            <CardContent className="py-2">

                <div>
                    <div>
                        <h4 className="text-xs font-medium text-muted-foreground">
                            Requested Details
                        </h4>
                    </div>

                    <div className="space-y-2 rounded-xl p-4">
                        {request.items.map((item) => (
                            <p key={item.id} className="text-xs">
                                {item.name}
                            </p>
                        ))}
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

            </CardContent>

            <CardFooter className="flex justify-end gap-3">
                <Button variant={"outline"} className="border border-red-400 hover:text-red-500 hover:bg-red-50 text-red-500">Reject</Button>
                {/* <Button variant={"ghost"} className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white">Approve</Button> */}
                <Dialog>
                    <DialogTrigger className="py-2 px-4 text-sm rounded-md bg-blue-500 hover:bg-blue-600 hover:text-white text-white">Approve</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Return to Batch Inventory</DialogTitle>
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
                            <Button onClick={handleApprove} variant={"ghost"} className="bg-blue-600 hover:bg-blue-700 hover:text-white text-white">Confirm</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}
