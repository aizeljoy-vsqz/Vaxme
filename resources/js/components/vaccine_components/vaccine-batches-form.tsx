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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format, setDate } from "date-fns";
import { useForm, usePage } from "@inertiajs/react";
import { VaccineBatch } from "@/pages/inventory/inventory-vaccine-batches/columns";
import React from "react";
import { VaccineType } from "@/pages/vaccine-management/column";

interface VaccineBatchesFormProps {
    update_batch_id: VaccineBatch
}

export default function VaccineBatchesForm({ update_batch_id }: VaccineBatchesFormProps) {
    const { data, setData, put, errors, processing } = useForm({
        // rhu_id: 'ss',
        batch_number: update_batch_id.batch_number,
        vaccine_id: update_batch_id.vaccine_id,
        expiration_date: new Date(update_batch_id.expiration_date),
        stock_receive: String(update_batch_id.stock_receive),
        current_balance: update_batch_id.current_balance,
    })
    console.log(update_batch_id);

    const [date, setDate] = React.useState<Date>()

    interface PageProps {
        [key: string]: unknown
        vaccines_data: VaccineType[]
    }

    const { vaccines_data } = usePage<PageProps>().props

    const handleEdit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        put(`/vaccine/inventory/update/${update_batch_id.id}`)
        console.log(update_batch_id);

    }
    return (
        <Dialog>
            <DialogTrigger>Edit</DialogTrigger>
            <DialogContent>
                <form onSubmit={handleEdit}>
                    <DialogHeader>
                        <DialogTitle>Edit Vaccine Batch</DialogTitle>
                        <DialogDescription>
                            Make changes to the vaccine batch information below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className='flex gap-4'>
                        <div className='w-full flex flex-col gap-2'>
                            <Label>Name of Drug:</Label>
                            <Select value={data.vaccine_id.toString()} onValueChange={(val) => { setData('vaccine_id', Number(val)) }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={update_batch_id.vaccine.name} />
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
                            <Input value={data.stock_receive} onChange={(e) => {setData('stock_receive', e.target.value); setData('current_balance', Number(e.target.value))}}></Input>
                            <div className='text-red-500 text-sm'>{errors.stock_receive}</div>
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <Label>Expiration Date:</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!date}
                                        className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-black-foreground"
                                    >
                                        {data.expiration_date ? format(data.expiration_date, "PPP") : <span>Pick a date</span>}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={data.expiration_date}
                                        onSelect={(date) => {
                                            if (!date) return
                                            setDate(date)
                                            setData('expiration_date', date)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <div className='text-red-500 text-sm'>{errors.expiration_date}</div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing}>
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}