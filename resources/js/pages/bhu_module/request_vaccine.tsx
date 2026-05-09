import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import RequestTable from '@/components/request_vaccine/request_table';
import { Input } from '@/components/ui/input';
import Request_Select from '@/components/request_vaccine/request_select';
import { Separator } from '@/components/ui/separator';
import { ArrowBigRightDashIcon, Plus } from 'lucide-react';
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import { toast } from "sonner"

export default function BhuDashboard() {


    const [name, setName] = useState("");
    const [vaccine, setVaccine] = useState("");

    const { data, setData, post, processing, errors } = useForm({
        type: "request",
        status: "submitted",
        items: [] as { name: string; vaccine: string }[],
    });

    const handleAdd = () => {
        if (!name || !vaccine) return;

        setData("items", [
            ...data.items,
            { name, vaccine }
        ]);

        setName("");
        setVaccine("");
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/request/vaccine',
            {
                onSuccess: () => {
                    toast("Event has been created", {
                                description:
                                    (<pre className="whitespace-pre-line text-sm">
                                        Success
                                    </pre>),
                                action: {
                                    label: "Close",
                                    onClick: () => console.log("Closed"),
                                },
                            })
                },
                onError: (errors) => {
                    const message = errors.items;

                    toast("Duplicate Vaccination", {
                        description:
                            (<pre className="whitespace-pre-line text-sm">
                                {String(errors.items)}
                            </pre>),
                        action: {
                            label: "Close",
                            onClick: () => console.log("Closed"),
                        },
                    });
                }
            }
        );
    }

    console.log(errors.items);

    return (
        <>
            <Head title="Barangay Name" />
            <form onSubmit={handleSubmit} className='h-full'>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-6">
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <Label className='text-md font-bold'>Request New Vaccine</Label>
                            <p className='text-xs text-gray-500 font-thin'>Add names and vaccine below to request vaccines</p>
                        </div>
                        <Button type="submit" className='bg-blue-600 w-auto hover:bg-blue-700 cursor-pointer'>Request <ArrowBigRightDashIcon></ArrowBigRightDashIcon></Button>
                    </div>
                    <div className='h-full'>
                        <RequestTable items={data.items} ></RequestTable>
                    </div>
                    <Separator></Separator>
                    <div className='flex gap-2'>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. José Protasio Rizal Mercado y Alonso Realonda' className='flex-1'></Input>
                        <Request_Select value={vaccine} onChange={(value) => setVaccine(value)} ></Request_Select>
                        <Button type="button" onClick={handleAdd} className='bg-blue-600 w-auto hover:bg-blue-700 cursor-pointer'>Add <Plus></Plus></Button>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() =>
                            toast("Event has been created", {
                                description:
                                    (<pre className="whitespace-pre-line text-sm">
                                        {String(errors.items)}
                                    </pre>),
                                action: {
                                    label: "Close",
                                    onClick: () => console.log("Closed"),
                                },
                            })
                        }
                    >
                        Show Toast
                    </Button>
                </div>
            </form>

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