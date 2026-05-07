import { Head, useForm, usePage } from '@inertiajs/react';
import { columns, VaccineBatch } from "./columns"
import { DataTable } from "../data-table"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { batchesVaccineInventory } from '@/routes';
import {
    AlertDialog,
    AlertDialogAction,
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { VaccineType } from '@/pages/vaccine-management/column';
import { Value } from '@radix-ui/react-select';

export default function InventoryByBatch() {

    const { data, setData, post } = useForm({
        // rhu_id: 'ss',
        batch_number: '',
        vaccine_id: Number(),
        expiration_date: '',
        stock_receive: 0,
        current_balance: 0,
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(data);
        post('/vaccine/inventory/store');
    }

    interface PageProps {
        [key: string]: unknown
        vaccine_batches: VaccineBatch[]
        vaccines_data: VaccineType[]
    }

    const { vaccine_batches, vaccines_data } = usePage<PageProps>().props
    vaccines_data.map((test) => {
        console.log(test.name);

    })

    const [date, setDate] = React.useState<Date>()

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='px-2'>
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
                                    <div className='flex flex-col gap-2'>
                                        <div className='w-full gap-2 flex flex-col'>
                                            <Label>Name of Health Faculty:</Label>
                                            <Input></Input>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Name of Drug:</Label>
                                                <Select onValueChange={(val) => { setData('vaccine_id', parseInt(val)) }}>
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
                                            </div>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Batch Number:</Label>
                                                <Input value={data.batch_number} onChange={(e) => setData('batch_number', e.target.value)}></Input>
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='w-full flex flex-col gap-2'>
                                                <Label>Stock Received:</Label>
                                                <Input value={data.stock_receive} onChange={(e) => setData('stock_receive', Number(e.target.value))}></Input>
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
                                            </div>
                                        </div>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction type={'submit'} className='!bg-blue-600 hover:!bg-blue-700'>Save</AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className='px-4'>
                        <DataTable columns={columns} data={vaccine_batches.reverse()} />
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
