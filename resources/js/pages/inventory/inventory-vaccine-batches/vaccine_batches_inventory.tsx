import { Head, useForm, usePage } from '@inertiajs/react';
import { columns, VaccineBatch } from "./columns"
import { DataTable } from "../data-table"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CircleAlert, CircleCheckBig, Plus } from 'lucide-react';
import { batchesVaccineInventory } from '@/routes';
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
import { Input } from '@/components/ui/input';

import * as React from "react"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
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
import { VaccineType } from '@/pages/vaccine-management/column';
import { toast } from 'sonner';
import EmptyPage from '@/components/vaccine_components/empty-page';

export default function InventoryByBatch() {

    interface PageProps {
        [key: string]: unknown
        rhu_vaccines_batches: VaccineBatch[]
        vaccines_data: VaccineType[]
        rhu_id:number
    }

    const { vaccines_data, rhu_id, rhu_vaccines_batches } = usePage<PageProps>().props

    const { data, setData, post, delete: destroy, errors, reset } = useForm({
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
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='px-2 h-full'>
                    <div className='flex justify-between'>
                        <Label className='text-md flex items-center'>Vaccine Inventory</Label>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='bg-blue-600 hover:bg-blue-700'> <Plus /> Add Inventory</Button>
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
                                                <Select value={data.vaccine_id} onValueChange={(val) => { setData('vaccine_id', val) }}>
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
                                                <Input value={data.stock_receive} onChange={(e) => { setData('stock_receive', e.target.value); setData('current_balance', Number(e.target.value)); }}></Input>
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
                                                            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
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
                                                                if (!date) return
                                                                setDate(date)
                                                                setData('expiration_date', date.toLocaleDateString())
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <div className='text-red-500 text-sm'>{errors.expiration_date}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <Button type={'submit'} className='!bg-blue-600 hover:!bg-blue-700'>Save</Button>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className='px-2 py-4 h-8/10'>
                        {
                            rhu_vaccines_batches.length > 0 ? (<DataTable columns={columns(handleDelete)} data={rhu_vaccines_batches ?? []} />) : (<EmptyPage title={'Empty vaccine batch inventory'} description={`You haven't created any vaccines batches yet. Start creating your inventory.`}></EmptyPage>)
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
