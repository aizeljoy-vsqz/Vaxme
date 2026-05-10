import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DataTable } from "./data-table"
import { columns, VaccineType } from "./column"
import { CircleAlert, CircleCheckBig, IceCream, Plus, Trash } from "lucide-react"
import { useForm, usePage } from "@inertiajs/react"
import { reset } from "@/routes/password"
import { toast } from "sonner"

export default function VaccineManagement() {

    const { data, setData, post, delete: destroy, errors, reset, clearErrors } = useForm({
        name: "",
        description: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(data)
        post('/vaccine/management/store', {
            onSuccess: () => {
                reset();
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleCheckBig className="p-1 text-green-500" />
                        <Label>Vaccine has been created.</Label>
                    </div>, { position: 'top-right' });
            }
        });
    }

    interface PageProps {
        [key: string]: unknown
        vaccines_data: VaccineType[]
    }

    const { vaccines_data } = usePage<PageProps>().props
    console.log(vaccines_data);

    const handleDelete = (delete_vaccine_id: number) => {
        destroy(`/vaccine/management/delete/${delete_vaccine_id}`, {
            onSuccess: () => {
                toast(
                    <div className="flex gap-1 justify-center">
                        <CircleAlert className="p-1 text-red-500" />
                        <Label>Vaccine has been deleted.</Label>
                    </div>, { position: 'top-right' });
            }
        });
    }
    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="px-2">
                    <div className='flex justify-between'>
                        <Label className='text-md flex items-center'>Vaccine Management</Label>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button onClick={() => clearErrors()} className='bg-blue-600 hover:bg-blue-700'> <Plus /> Add Inventory</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Vaccine Details</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Enter vaccine details.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className='flex flex-col gap-2'>
                                        <div className='w-full gap-2 flex flex-col'>
                                            <Label>Name of Vaccine:</Label>
                                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. Penta"></Input>
                                            <div className='text-red-500 text-sm'>{errors.name}</div>
                                        </div>
                                        <div className='w-full gap-2 flex flex-col'>
                                            <Label>Vaccine Description:</Label>
                                            <Input value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="e.g. Pentavalent vaccine protects against five diseases."></Input>
                                            <div className='text-red-500 text-sm'>{errors.description}</div>
                                        </div>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <Button type="submit" className='!bg-blue-600 hover:!bg-blue-700'>Save</Button>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className='px-4'>
                        <DataTable columns={columns(handleDelete)} data={vaccines_data} />
                    </div>
                </div>
            </div>
        </>
    )
}

VaccineManagement.layout = {
    breadcrumbs: [
        {
            title: 'Vaccine Management',
        },
    ],
}   