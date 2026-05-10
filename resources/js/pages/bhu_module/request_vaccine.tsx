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
import { ArrowBigRightDashIcon, Check, CheckCheck, CheckCircle, CheckCircle2, CheckIcon, CheckSquare2, Cross, LucideThumbsDown, LucideThumbsUp, Plus, ThumbsUp, ThumbsUpIcon, X } from 'lucide-react';
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
                    toast("Success", {
                        description:
                            (<div className='flex items-end justify-center gap-2'>
                                <pre className="whitespace-pre-line text-sm w-auto">
                                    Request sent successfully
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
                onError: (errors) => {
                    const message = errors.items;

                    toast("Duplicate Vaccination", {
                        description:
                            (<div className='flex  items-start justify-start gap-2'>

                                <pre className="whitespace-pre-line text-sm">
                                    {String(errors.items).replace(/name:/g, '\nname:')
                                        .replace(/\|/g, ' | ')
                                        .trim()}
                                </pre>
                                <LucideThumbsDown className='text-blue-500 py-1' />

                            </div>),
                        action: {
                            label: <X className='py-1'></X>,
                            onClick: () => console.log("Closed"),
                        },
                    });
                }
            }
        );
    }

    console.log(errors.items);

    const handleRemove = (ind: number) => {
        setData("items", data.items.filter((_, index) => index !== ind));
    }

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
                        <RequestTable items={data.items} handleRemove={handleRemove} ></RequestTable>
                    </div>
                    <Separator></Separator>
                    <div className='flex gap-2'>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. José Protasio Rizal Mercado y Alonso Realonda' className='flex-1'></Input>
                        <Request_Select value={vaccine} onChange={(value) => setVaccine(value)} ></Request_Select>
                        <Button type="button" onClick={handleAdd} className='bg-blue-600 w-auto hover:bg-blue-700 cursor-pointer'>Add <Plus></Plus></Button>
                    </div>
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