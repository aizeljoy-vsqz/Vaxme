"use client"
import { useForm, usePage } from "@inertiajs/react"
import { format } from "date-fns"
import { ChevronDownIcon, CircleCheckBigIcon } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import type { VaccineBatch } from "@/pages/inventory/inventory-vaccine-batches/columns"
import type { VaccineType } from "@/pages/vaccine-management/column"

interface batchFormType {
    open: boolean
    onOpenChange: (open: boolean) => void
    update_batch_id: VaccineBatch;
}
export function VaccineBatchesForm({ update_batch_id, open, onOpenChange }: batchFormType) {
    console.log('check', update_batch_id);
    const { data, setData, put, errors } = useForm({
        batch_number: update_batch_id.batch_number,
        vaccine_id: update_batch_id.vaccine.id,
        expiration_date: update_batch_id.expiration_date,
        stock_receive: update_batch_id.stock_receive,
        current_balance: 0,
    })
    const [date, setDate] = React.useState<Date>()

    interface PageProps {
        [key: string]: unknown
        vaccines_data: VaccineType[]

    }

    const { vaccines_data } = usePage<PageProps>().props
    console.log('vaccines_data: ', vaccines_data);

    const handleUpdate = (e: React.SyntheticEvent) => {
        e.preventDefault();
        put(`/vaccine/inventory/update/${update_batch_id.id}`, {
            onSuccess: () => {
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleCheckBigIcon className="p-1 text-green-500" />
                        <Label>Vaccine batch updated successfully!</Label>
                    </div>, { position: 'top-right' })
            },
            onError: (errors) => {
                console.log(errors);
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleUpdate}>
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <Label>Vaccine Name</Label>
                            <Select value={data.vaccine_id.toString()} onValueChange={(e) => {
                                setData('vaccine_id', Number(e))
                            }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={'asl'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {/* {vaccines_data.map((vaccine) => {
                                            return <SelectItem value={String(vaccine.id)}>{vaccine.name}</SelectItem>
                                        })} */}
                                        {vaccines_data.map((vaccine) => (
                                            <SelectItem
                                                key={vaccine.id}
                                                value={String(vaccine.id)}
                                            >
                                                {vaccine.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div>{errors.vaccine_id}</div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Label>Batch Number</Label>
                            <Input value={data.batch_number} onChange={(e) => setData('batch_number', e.target.value)} />
                            <div>{errors.batch_number}</div>

                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full flex flex-col gap-2">
                            <Label>Stock Receive</Label>
                            <Input value={data.stock_receive} onChange={(e) => setData('stock_receive', Number(e.target.value))} />
                            <div>{errors.stock_receive}</div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <Label>Expiration Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        data-empty={!date}
                                        className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
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
                                            if (!date) {
                                                return
                                            }

                                            setDate(date)
                                            setData('expiration_date', date)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <div>{errors.expiration_date}</div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
