import { Head, useForm } from "@inertiajs/react";
import { Plus, ArrowBigRightDashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import Request_Select from "@/components/request_vaccine/request_select";
import RequestTable from "@/components/request_vaccine/request_table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VaccineType } from "../vaccine-management/column";

interface BhuDashboardProps {
    vaccines: VaccineType[]
}

export default function BhuDashboard({vaccines}: BhuDashboardProps) {
    
    console.log(vaccines);
    const [name, setName] = useState("");
    const { data, setData, post } = useForm({
        type: "request",
        status: "submitted",
        vaccine: "",
        items: [] as { name: string }[],
    });

    // ADD ITEM
    const handleAdd = () => {
        if (!name.trim()) {
            toast.error("Name empty", {
                description: (
                    <div className="whitespace-pre-line text-sm">
                        Please enter a name
                    </div>
                ),
            });

            return;
        }

        if (!data.vaccine) {
            toast.error("No vaccine selected", {
                description: (
                    <div className="whitespace-pre-line text-sm">
                        Please select a vaccine first
                    </div>
                ),
            });

            return;
        }

        // duplicate check (frontend UX protection)
        const exists = data.items.some(
            (item) =>
                item.name.trim().toLowerCase() === name.trim().toLowerCase()
        );

        if (exists) {
            toast.error("Duplicate name", {
                description: (
                    <div className="whitespace-pre-line text-sm">
                        This name is already in the list
                    </div>
                ),
            });

            return;
        }

        setData("items", [...data.items, { name: name.trim() }]);
        setName("");

        toast.success("Added", {
            description:
                (<div className='flex items-end justify-center gap-2'>
                    <pre className="whitespace-pre-line text-sm w-auto">
                        Name added to request list
                    </pre>
                </div>
                ),
        })
    };

    const handleRemove = (index: number) => {
        setData("items", data.items.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.items.length === 0) {
            toast.error("Add at least one entry before submitting");

            return;
        }

        post("/request/vaccine",
            {
                onSuccess: () => {
                    toast.success("Success", {
                        description:
                            (<div className='flex items-end justify-center gap-2'>
                                <pre className="whitespace-pre-line text-sm w-auto">
                                    Request sent to the RHU successfully
                                </pre>
                            </div>
                            ),
                        action: {
                            label: "x",
                            onClick: () => console.log("Closed"),
                        },
                    })
                },
                onError: (errors) => {
                    toast.error("Duplicate entries found", {
                        description: (
                            <div className="whitespace-pre-line text-sm">
                                {errors.items}
                            </div>
                        ),
                    });
                }
            });
    };

    const canSubmit = data.items.length > 0 && data.vaccine;

    return (
        <>
            <Head title="Vaccine Request" />

            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">

                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-lg font-semibold">
                            Vaccine Request
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Select vaccine once, then add names to the list
                        </p>
                    </div>

                    <Button disabled={!canSubmit}>
                        Submit <ArrowBigRightDashIcon />
                    </Button>
                </div>

                <div className="border rounded-xl p-4 space-y-4">

                    <div className="flex flex-col gap-2">

                        <p className="text-sm font-medium">Request list</p>

                        <p className="text-xs text-muted-foreground mb-2">
                            Tip: You can add multiple names before submitting
                        </p>

                        <Request_Select
                            vaccines={vaccines}
                            value={data.vaccine}
                            onChange={(value) => setData("vaccine", value)}
                        />

                    </div>

                    <div className="flex gap-2">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full name"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAdd();
                                }
                            }}
                        />

                        <Button
                            variant={'secondary'}
                            type="button"
                            onClick={handleAdd}
                            disabled={!data.vaccine}
                            className="cursor-pointer"
                        >
                            Add <Plus />
                        </Button>
                    </div>

                    {data.items.length === 0 ? (
                        <div className="text-sm text-muted-foreground text-center py-6">
                            No entries yet. Start by adding a name above.
                        </div>
                    ) : (
                        <RequestTable
                            items={data.items}
                            handleRemove={handleRemove}
                        />
                    )}

                    <div className="text-xs text-muted-foreground border-t pt-4">
                        Total entries : <Badge variant="secondary"
                            className="rounded-md text-xs">{data.items.length}</Badge>
                    </div>

                </div>
            </form>
        </>
    );
}


// BhuDashboard.layout = {
//     breadcrumbs: [
//         {
//             title: 'Dashboard',
//             // href: dashboard(),
//         },
//     ],
// };