import { Head, useForm, usePage } from '@inertiajs/react';

import { format } from "date-fns"
import { CircleAlert, CircleCheckBig, Plus } from 'lucide-react';
import { ChevronDownIcon } from "lucide-react"
import * as React from "react"
import { usePoll } from '@inertiajs/react'

import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import EmptyPage from '@/components/vaccine_components/empty-page';
import type { VaccineType } from '@/pages/vaccine-management/column';
import { batchesVaccineInventory } from '@/routes';
import { DataTable } from "../data-table"
import { columns } from "./columns"
import type { VaccineBatch } from "./columns";

export default function InventoryByBatch() {

    interface PageProps {
        [key: string]: unknown
        rhu_vaccines_batches: VaccineBatch[]
        vaccines_data: VaccineType[]
        rhu_id: number
    }

    const { vaccines_data, rhu_id, rhu_vaccines_batches } = usePage<PageProps>().props
    console.log('dss', rhu_vaccines_batches);

    const { data, setData, post, delete: destroy, errors, clearErrors, reset, processing } = useForm({
        rhu_id: rhu_id,
        batch_number: '',
        vaccine_id: '',
        expiration_date: '',
        stock_receive: '',
        current_balance: 0,
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        post('/vaccine/inventory/store', {
            onSuccess: () => {
                reset()
                setDate(undefined)
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleCheckBig className="p-1 text-green-500" />
                        <Label>Vaccine inventory has been created.</Label>
                    </div>, { position: 'top-right' });
            }
        });

    }

    const [date, setDate] = React.useState<Date>()
    const [statusFilter, setStatusFilter] = React.useState("all");

    const handleDelete = (delete_vaccine: number) => {
        destroy(`/vaccine/inventory/delete/${delete_vaccine}`, {
            onSuccess: () => {
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleAlert className="p-1 text-red-500" />
                        <Label>Vaccine inventory has been deleted.</Label>
                    </div>, { position: 'top-right' });
            }
        });
    }

    const today = new Date();

    const activeBatches = rhu_vaccines_batches.filter((batch) => {
        return new Date(batch.expiration_date) >= today;
    }).length;

    const inactiveBatches = rhu_vaccines_batches.filter((batch) => {
        return new Date(batch.expiration_date) < today;
    }).length;

    const filteredBatches = rhu_vaccines_batches.filter((batch) => {

        if (statusFilter === "all") {
            return true;
        }

        const today = new Date();
        const expirationDate = new Date(batch.expiration_date);

        const isActive = expirationDate >= today;

        if (statusFilter === "active") {
            return isActive;
        }

        if (statusFilter === "inactive") {
            return !isActive;
        }

        return true;
    });

    usePoll(2000)

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='px-2 h-full'>
                    <div className='flex justify-between mb-2'>

                        <div>
                            <Label className='text-md flex items-center'>Vaccine Inventory</Label>
                            <span className="text-sm text-muted-foreground">Track your vaccine inventory.</span>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='bg-blue-600 hover:bg-blue-700' onClick={() => clearErrors()} disabled={processing}>
                                    <Plus /> Add Inventory
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form onSubmit={handleSubmit}>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Vaccinne</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Enter vaccine details.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className='flex flex-col gap-2 mt-2'>
                                        <div className='flex gap-4'>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Name of Drug:</Label>
                                                <Select value={data.vaccine_id} onValueChange={(val) => {
                                                    setData('vaccine_id', val)
                                                }}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Drug" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {vaccines_data.map((vaccineName) => {
                                                                return <SelectItem value={String(vaccineName.id)}>{vaccineName.name}</SelectItem>
                                                            })}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <div className='text-red-500 text-sm'>{errors.vaccine_id}</div>
                                            </div>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Batch Number:</Label>
                                                <Input value={data.batch_number} onChange={(e) => setData('batch_number', e.target.value)}></Input>
                                                <div className='text-red-500 text-sm'>{errors.batch_number}</div>
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Stock Received:</Label>
                                                <Input value={data.stock_receive} onChange={(e) => {
                                                    setData('stock_receive', e.target.value); setData('current_balance', Number(e.target.value));
                                                }}></Input>
                                                <div className='text-red-500 text-sm'>{errors.stock_receive}</div>
                                            </div>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Expiration Date:</Label>
                                                {/* <Input value={data.expiration_date} onChange={(e) => setData('expiration_date', e.target.value)}></Input> */}
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            data-empty={!date}
                                                            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground w-full"
                                                        >
                                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                            <ChevronDownIcon />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={(date) => {
                                                                if (!date) {
                                                                    return
                                                                }

                                                                setDate(date)
                                                                setData('expiration_date', date.toLocaleDateString())
                                                            }}
                                                            captionLayout="dropdown"
                                                            fromYear={2026}
                                                            toYear={2040}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <div className='text-red-500 text-sm'>{errors.expiration_date}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <Button type={'submit'} className='!bg-blue-600 hover:!bg-blue-700' disabled={processing}>
                                            Save
                                        </Button>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                    {/* filter with badge of active and inactive panis */}
                    <div className='flex flex-row justify-between gap-3 mt-8'>
                        <div className="mt-3 flex gap-2">

                            <div className='flex gap-2'>
                                <span className='text-sm text-muted-foreground'>Total Batches:</span>
                                <Badge variant="secondary">{rhu_vaccines_batches.length}</Badge>
                            </div>
                            <div className='flex gap-2'>
                                <span className='text-sm text-muted-foreground '>Active Batches:</span>
                                <Badge className='text-blue-500' variant="secondary">{activeBatches}</Badge>
                            </div>
                            <div className='flex gap-2'>
                                <span className='text-sm text-muted-foreground'>Inactive Batches:</span>
                                <Badge className='text-red-500' variant="secondary">{inactiveBatches}</Badge>
                            </div>
                        </div>

                        <div className="flex gap-2">

                            <Button variant={statusFilter === "all" ? "default" : "outline"} onClick={() => setStatusFilter("all")}>
                                All
                            </Button>

                            <Button variant={statusFilter === "active" ? "default" : "outline"} onClick={() => setStatusFilter("active")}>
                                Active
                            </Button>

                            <Button variant={statusFilter === "inactive" ? "default" : "outline"} onClick={() => setStatusFilter("inactive")} >
                                Inactive
                            </Button>

                        </div>
                    </div>

                    <div className='px-2 py-4 h-8/10'>
                        {
                            rhu_vaccines_batches.length > 0
                                ? (<DataTable columns={columns(handleDelete)} data={filteredBatches} />)
                                : (<EmptyPage title={'Empty vaccine batch inventory'} description={`You haven't created any vaccines batches yet. Start creating your inventory.`}></EmptyPage>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

InventoryByBatch.layout = {
    breadcrumbs: [
        {
            title: 'Vaccine Inventory',
            href: batchesVaccineInventory(),
        },
    ],
};
