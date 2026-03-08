import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns, Payment } from './columns';
import { DataTable } from '../data-table';
import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { DatePickerInput } from '@/components/date-picker';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/inventory',
    },
];

const data: Payment[] = [
    // Fetch data from your API here.
    {
        id: "728ed52f",
        health_facility: "RHU-1",
        batch_no: 1,
        drug_name: "Penta",
        expiration: "09/19/27",
        stock_received: 10,
        balance: 20,
        status: 'good',
        actions: "...",
    },
]

export default function Inventory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* container for label & button */}
                <div className='flex justify-between items-center'>
                    <label className='text-sm font-medium'>Vaccine Inventory</label>
                    <Dialog>
                        <DialogTrigger>
                            <Button className='bg-blue-500 hover:bg-blue-700'><Plus />Add inventory</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Vaccine</DialogTitle>
                                <DialogDescription>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </DialogDescription>
                            </DialogHeader>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="username">Name of Health Faculty</FieldLabel>
                                    <Input id="username" type="text" placeholder="e.g. Rhu-1" />
                                </Field>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Field>
                                        <FieldLabel htmlFor="username">Name of Drug</FieldLabel>
                                        <Input id="username" type="text" placeholder="e.g. Penta" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="username">Batch Number</FieldLabel>
                                        <Input id="username" type="text" placeholder="e.g. 00126" />
                                    </Field>
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <Field>
                                        <FieldLabel htmlFor="username">Stock Received</FieldLabel>
                                        <Input id="username" type="text" placeholder="e.g. 20" />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="username">Expiration Date</FieldLabel>
                                        <DatePickerInput />
                                    </Field>
                                </div>
                                <Field orientation="horizontal" className='flex w-full justify-end'>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className='bg-blue-500 hover:bg-blue-700'>Submit</Button>
                                </Field>
                            </FieldGroup>
                        </DialogContent>
                    </Dialog>
                </div>
                <Separator />
                {/* container for table */}
                <div className='px-2'>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
