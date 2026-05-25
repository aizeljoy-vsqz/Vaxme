import { router } from "@inertiajs/react";
import { Check, CheckIcon, LucideThumbsUp, RefreshCcw } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch"
import type { VaccineType } from "@/pages/vaccine-management/column";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";


type RequestItem = {
    id: number;
    name: string;
    vaccine: VaccineType;
    is_vaccinated: boolean;
};

type VaccineRequest = {
    id: number;
    type: "request" | "return";
    status: "submitted" | "reviewed" | "approved" | "rejected";
    created_at: string;
    items: RequestItem[],
    rejection_reason: string
};

type Props = {
    request: VaccineRequest;
};

export default function TrackVaccine({ request }: Props) {

    const isRejected = request.status === "rejected";
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [items, setItems] = useState(request.items);
    const isReturnRequest = request.type === "return";
    const canEdit = request.type === "request" && request.status === "approved";

    const vaccinatedCount = items.filter(
        item => item.is_vaccinated
    ).length;

    const vaccinateAll = () => {
        setItems(prev =>
            prev.map(item => ({
                ...item,
                is_vaccinated: true,
            }))
        );
    };

    const unvaccinateAll = () => {
        setItems(prev =>
            prev.map(item => ({
                ...item,
                is_vaccinated: false,
            }))
        );
    };

    const saveChanges = () => {

        setProcessing(true);

        router.put(
            `/request/${request.id}/vaccination-status`,
            {
                items: items
            },
            {
                onSuccess: () => {
                    setProcessing(false);
                    setOpen(false);
                    toast("Success", {
                        description:
                            (<div className='flex items-end justify-center gap-2'>
                                <pre className="whitespace-pre-line text-sm w-auto">
                                    Vaccination updated successfully
                                </pre>
                                <LucideThumbsUp className='text-blue-500 py-1' />
                            </div>
                            ),
                        action: {
                            label: "x",
                            onClick: () => console.log("Closed"),
                        },
                    })
                },
            }
        );

    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString([], {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <>
            <Card
                className="group cursor-pointer rounded-2xl border bg-background p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20"
                onClick={() => setOpen(true)}
            >

                {/* Header */}
                <div className="flex items-start justify-between">

                    <div className="space-y-1">

                        <div className="flex items-center gap-2">

                            <h3 className="text-md font-semibold capitalize">
                                {request.type} Vaccine
                            </h3>

                            <Badge
                                variant="secondary"
                                className="rounded-md text-xs"
                            >
                                #{request.id}
                            </Badge>

                        </div>

                        <p className="text-sm text-muted-foreground">
                            {request.items.length} recipient(s)
                        </p>

                    </div>

                    <Badge
                        variant="outline"
                        className="capitalize rounded-md"
                    >
                        {formatDate(request.created_at)}
                    </Badge>

                </div>

                {/* Progress */}
                <div className="flex items-center">

                    {/* Submitted */}
                    <div className="flex flex-col items-center gap-2">

                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors
                ${["submitted", "reviewed", "approved"].includes(request.status)
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                        >
                            <Check className="h-4 w-4" />
                        </div>

                        <span className="text-xs text-muted-foreground">
                            Submitted
                        </span>

                    </div>

                    {/* Line */}
                    <div
                        className={`h-[2px] flex-1 mx-2
            ${["reviewed", "approved"].includes(request.status)
                                ? "bg-primary"
                                : "bg-border"
                            }`}
                    />

                    {/* Reviewed */}
                    <div className="flex flex-col items-center gap-2">

                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors
                ${["reviewed", "approved"].includes(request.status)
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {request.status === "reviewed" ||
                                request.status === "approved" ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                "2"
                            )}
                        </div>

                        <span className="text-xs text-muted-foreground">
                            Reviewed
                        </span>

                    </div>

                    {/* Line */}
                    <div
                        className={`h-[2px] flex-1 mx-2
            ${request.status === "approved"
                                ? "bg-primary"
                                : "bg-border"
                            }`}
                    />

                    {/* Approved */}
                    <div className="flex flex-col items-center gap-2">

                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium transition-colors ${request.status === "approved" ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground"}`}>
                            {request.status === "approved" ? (
                                <Check className="h-4 w-4" />
                            ) : ("3")}
                        </div>

                        <span className="text-xs text-muted-foreground">
                            Approved
                        </span>

                    </div>

                </div>

                {/* approval message */}
                {request.status === "approved" && (
                    <div
                        className={`w-full mt-4 rounded-xl border px-4 py-3 text-sm border-green-200 bg-green-50 text-green-600 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-100`}
                    >
                        {request.type === "request" ? (
                            <>
                                <p className="font-medium">
                                    Your vaccine request has been approved.
                                </p>
                                <p className="text-xs opacity-80 mt-1">
                                    You may now proceed to the RHU to claim or pick up the vaccines.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="font-medium">
                                    Return request approved.
                                </p>
                                <p className="text-xs opacity-80 mt-1">
                                    You may now return unused vaccines to the RHU.
                                </p>
                            </>
                        )}
                    </div>
                )}


                {isRejected && (
                    <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-red-600">
                                {request.type === "return"
                                    ? "Return Rejected"
                                    : "Request Rejected"}
                            </span>
                        </div>

                        {request.rejection_reason && (
                            <p className="text-xs text-red-500 mt-1">
                                Reason: {request.rejection_reason}
                            </p>
                        )}

                    </div>
                )}

            </Card>

            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="max-w-3xl">

                    <DialogHeader>

                        <DialogTitle className="flex items-center gap-2">

                            <span className="capitalize">
                                {request.type} Items
                            </span>

                            <Badge
                                variant="secondary"
                                className="rounded-md text-xs"
                            >
                                #{request.id}
                            </Badge>

                            <Badge
                                variant="outline"
                                className="capitalize rounded-md"
                            >
                                {request.status}
                            </Badge>

                        </DialogTitle>

                    </DialogHeader>

                    {/* Summary card */}

                    <div className="rounded-xl border p-4 bg-muted/30">

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="text-sm">
                                    {isReturnRequest ? "Returned Vaccines" : "Vaccination Progress"}
                                </h3>

                                <p className="text-xs text-muted-foreground">
                                    {isReturnRequest ? `${items.length} unused vaccine(s) returned` : `${vaccinatedCount} of ${items.length} vaccinated`}
                                </p>

                            </div>

                            <Badge className="rounded-full">

                                {isReturnRequest
                                    ? "Read Only"
                                    : `${Math.round(
                                        (vaccinatedCount / items.length) * 100
                                    )}%`}

                            </Badge>

                        </div>

                    </div>

                    {canEdit && (
                        <div className="flex items-center justify-end gap-2">

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={unvaccinateAll}
                            >
                                <RefreshCcw />
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={vaccinateAll}
                            >
                                <CheckIcon />
                                {/* Vaccinate All */}
                            </Button>

                        </div>
                    )}
                    <div className="min-h-48 max-h-48 overflow-y-auto">
                        <Table>

                            <TableHeader>

                                <TableRow>

                                    <TableHead>Name</TableHead>

                                    <TableHead>Vaccine</TableHead>

                                    <TableHead>Status</TableHead>

                                </TableRow>

                            </TableHeader>

                            <TableBody>

                                {items.map((item) => (

                                    <TableRow
                                        key={item.id}
                                        className={
                                            item.is_vaccinated
                                                ? "dark:bg-green-950/10"
                                                : ""
                                        }
                                    >

                                        <TableCell>
                                            {item.name}
                                        </TableCell>

                                        <TableCell>
                                            {item.vaccine?.name}
                                        </TableCell>

                                        <TableCell>

                                            <div className="flex items-center space-x-2">

                                                <Switch
                                                    id={`vaccinated-${item.id}`}
                                                    checked={item.is_vaccinated}
                                                    disabled={!canEdit}
                                                    onCheckedChange={(checked) => {
                                                        if (!canEdit) {
                                                            return;
                                                        }

                                                        setItems(prev =>
                                                            prev.map(i =>
                                                                i.id === item.id
                                                                    ? {
                                                                        ...i,
                                                                        is_vaccinated: checked
                                                                    }
                                                                    : i
                                                            )
                                                        );

                                                    }}
                                                />

                                                <Label htmlFor={`vaccinated-${item.id}`}>

                                                    {item.is_vaccinated
                                                        ? "Vaccinated"
                                                        : "Not Vaccinated"}

                                                </Label>

                                            </div>

                                        </TableCell>

                                    </TableRow>


                                ))}

                            </TableBody>

                        </Table>
                    </div>

                    {request.type === "request" && (

                        <div className="flex items-center justify-between pt-2">

                            {!canEdit ? (

                                <p className="text-xs text-muted-foreground">
                                    Vaccination status can only be updated after approval.
                                </p>

                            ) : (

                                <>
                                    <p className="text-xs text-green-600 dark:text-green-400">
                                        This request is ready for vaccination updates.
                                    </p>

                                    <Button onClick={saveChanges} disabled={processing}>
                                        Save Changes
                                    </Button>
                                </>

                            )}

                        </div>

                    )}

                    {request.type === "return" && (

                        <div className="flex items-center justify-between pt-2">

                            {!canEdit && (
                                <p className="text-xs text-muted-foreground">
                                    Return records are read-only.
                                </p>
                            )}

                        </div>

                    )}

                </DialogContent>

            </Dialog>
        </>
    );
}