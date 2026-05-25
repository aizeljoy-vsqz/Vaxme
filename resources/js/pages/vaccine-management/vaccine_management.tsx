import { useForm, usePage } from "@inertiajs/react"
import { usePoll } from '@inertiajs/react'
import { CircleAlert, CircleCheckBig, Plus, } from "lucide-react"
import { toast } from "sonner"
import {
    AlertDialog,
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
import EmptyPage from "@/components/vaccine_components/empty-page"
import type { VaccineType } from "./column";
import { columns } from "./column"
import { DataTable } from "./data-table"

export default function VaccineManagement() {
    interface PageProps {
        [key: string]: unknown
        rhu_associated_vaccines: VaccineType[]
        rhu_id: number
    }
    const { rhu_id, rhu_associated_vaccines } = usePage<PageProps>().props

    const { data, setData, post, delete: destroy, errors, reset, clearErrors, processing } = useForm({
        rhu_id: rhu_id,
        name: "",
        description: "",
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
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

    usePoll(2000)


    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="px-2 h-full">
                    <div className='flex justify-between mb-2'>
                        <Label className='text-md flex items-center'>Vaccine Management</Label>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button onClick={() => clearErrors()} className='bg-blue-600 hover:bg-blue-700' disabled={processing}>
                                    <Plus /> Add Inventory
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                                        <Button type="submit" className='!bg-blue-600 hover:!bg-blue-700' disabled={processing}>
                                            Save
                                        </Button>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <span className="text-sm text-muted-foreground">Manage your vaccines.</span>
                    <div className='px-2 py-4  h-8/10'>
                        {
                            rhu_associated_vaccines.length > 0 ? (<DataTable columns={columns(handleDelete)} data={rhu_associated_vaccines ?? []} />) : (<EmptyPage title={'Vaccines Empty'} description={`You haven't created any vaccines yet. Start creating your vaccines.`}></EmptyPage>)
                        }
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