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
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "@inertiajs/react"
import { VaccineType } from "@/pages/vaccine-management/column"
import { toast } from "sonner"
import { CircleCheckBigIcon } from "lucide-react"
interface VaccineFormType {
    update_vaccine_id: VaccineType
}
export default function VaccineForm({ update_vaccine_id }: VaccineFormType) {
    const {
        data,
        setData,
        put,
        processing,
        errors
    } = useForm({
        name: update_vaccine_id.name,
        description: update_vaccine_id.description
    })

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault()

        put(`/vaccine/management/update/${update_vaccine_id.id}`, {
            onSuccess: () => {
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleCheckBigIcon className="p-1 text-green-500" />
                        <Label>Vaccine updated successfully!</Label>
                    </div>, { position: 'top-right' })
            }
        });
        console.log(update_vaccine_id);

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Edit
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Vaccine Management</DialogTitle>
                        <DialogDescription>
                            Edit vaccine details.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <div className="text-red-500 text-sm">
                            {errors.name}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Description</Label>
                        <Input
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                        />

                        <div className="text-red-500 text-sm">
                            {errors.description}
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
        </Dialog>
    )
}