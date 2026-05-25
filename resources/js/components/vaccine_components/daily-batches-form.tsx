import { useForm } from "@inertiajs/react"
import { CircleCheckBigIcon } from "lucide-react"
import type { SyntheticEvent } from "react"
import { toast } from "sonner"
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
import type { DailyVaccine } from "@/pages/inventory/inventory-vaccine-daily/columns"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface DailyInventoryType {
    update_daily_inventory: DailyVaccine
    onOpenDropdown: () => void
}
export default function DailyBatchesForm({ update_daily_inventory, onOpenDropdown }: DailyInventoryType) {
    const { data, setData, put, errors, processing, clearErrors } = useForm({
        daily_dispense: String(update_daily_inventory.daily_dispense),
        number_of_receipients: String(update_daily_inventory.number_of_receipients),
        stock_transferred: String(update_daily_inventory.stock_transferred),
        vaccine_lose: String(update_daily_inventory.vaccine_lose)
    })

    const handleEdit = (e: SyntheticEvent) => {
        e.preventDefault()

        put(`/daily/vaccine/inventory/update/${update_daily_inventory.id}`, {
            onSuccess: () => {
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleCheckBigIcon className="p-1 text-green-500" />
                        <Label>Daily batch updated successfully!</Label>
                    </div>, { position: 'top-right' })
                onOpenDropdown()
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger>Edit</DialogTrigger>
            <DialogContent>
                <form onSubmit={handleEdit}>
                    <DialogHeader>
                        <DialogTitle>Edit Daily Batch</DialogTitle>
                        <DialogDescription>
                            Modify the details of the daily batch inventory.
                        </DialogDescription>
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-4'>
                                <div className='flex flex-col w-full gap-2'>
                                    <Label>Daily Dispensed:</Label>
                                    <Input value={data.daily_dispense} onChange={(e) => setData('daily_dispense', e.target.value)} placeholder='e.g. 5'></Input>
                                    <div className='text-red-500 text-sm'>{errors.daily_dispense}</div>
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <Label>No. of Receipients:</Label>
                                    <Input value={data.number_of_receipients} onChange={(e) => setData('number_of_receipients', e.target.value)} placeholder='e.g. 5'></Input>
                                    <div className='text-red-500 text-sm'>{errors.number_of_receipients}</div>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex flex-col w-full gap-2'>
                                    <Label>Stock Transferred:</Label>
                                    <Input value={data.stock_transferred} onChange={(e) => setData('stock_transferred', e.target.value)} placeholder='e.g. 5'></Input>
                                    <div className='text-red-500 text-sm'>{errors.stock_transferred}</div>
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <Label>Expiration/Lose/Damage:</Label>
                                    <Input value={data.vaccine_lose} onChange={(e) => setData('vaccine_lose', e.target.value)} placeholder='e.g. 2'></Input>
                                    <div className='text-red-500 text-sm'>{errors.vaccine_lose}</div>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" onClick={() => {
                                    clearErrors(); onOpenDropdown()
                                }}>
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button type="submit" disabled={processing}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </form>
            </DialogContent>
        </Dialog>
    )
}