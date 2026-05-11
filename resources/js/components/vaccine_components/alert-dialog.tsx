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
import { Separator } from "../ui/separator"
import { Trash2Icon } from "lucide-react"

const handleDelete = (delete_vaccine_id: number) => {
    console.log(delete_vaccine_id);
}

interface handleDeleteType {
    handleDelete: (delete_vaccine_id: number) => void
    delete_vaccine_id:number
}
export default function DeleteConfirmation({handleDelete, delete_vaccine_id}:handleDeleteType ) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span>Delete</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader className="flex flex-col gap-3">
                    <div className="p-2 rounded-md bg-red-100 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon className="" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium">Delete vaccine?</span>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your vaccine info.
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <Separator />
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-100 text-red-600 hover:bg-red-200" onClick={() => { handleDelete(delete_vaccine_id)}}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}