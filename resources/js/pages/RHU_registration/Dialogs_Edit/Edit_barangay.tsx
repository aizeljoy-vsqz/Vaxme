import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {Button} from '@/components/ui/button';
import {
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
} from '@/components/ui/dialog';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {FieldGroup, Field} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';

interface EditBarangay {
    id: number;
    barangay_name: string;
    nurse_assigned: string;
    contact_number: string;
}
interface Props {
    barangay: EditBarangay;
}

export function EditBarangayDialog({ barangay }: Props) {
    const [open, setOpen] = useState(false);
    const {data, setData, put, processing, errors} = useForm({
        barangay_name: barangay.barangay_name,
        nurse_assigned: barangay.nurse_assigned,
        contact_number: barangay.contact_number,
    });

    // Reset form data when dialog opens or barangay changes
    useEffect(() => {
        if (open) {
            setData({
                barangay_name: barangay.barangay_name,
                nurse_assigned: barangay.nurse_assigned,
                contact_number: barangay.contact_number,
            });
        }
    }, [open, barangay, setData]);

    const handleUpdate = (e: React.FormEvent) => { 
        e.preventDefault();

        put(`/registration/${barangay.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
            onError: () => {}
        });
    };

    return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
        <span className="cursor-pointer transition-colors">
          Edit
        </span>
        </DropdownMenuItem>
            <DialogContent className="sm:max-w-xl">
                         <form onSubmit={handleUpdate}>
                <DialogHeader>
                    <DialogTitle className="text pb-2">Barangay Details</DialogTitle>
                    <DialogDescription className="sr-only">
                        Edit barangay information and save changes.
                    </DialogDescription>
                    <Separator/>
                </DialogHeader>
                <FieldGroup>
                <Field className='gap-4 pt-4'>
                    <div className="space-y-2">
                    <Label>Name of Barangay:</Label>
                    <Input 
                    placeholder="e.g Alawihao"
                    value={data.barangay_name}
                    onChange={(e) => setData('barangay_name', e.target.value)}
                    />
                    {errors.barangay_name && (
                        <p className="text-sm text-red-600">{errors.barangay_name}</p>
                    )}
                    </div>
                </Field>
                <Field className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label>Nurse Assign:</Label>
                    <Input 
                        placeholder="e.g Aizel Joy Vasquez" 
                        value={data.nurse_assigned}
                        onChange={(e) => setData('nurse_assigned', e.target.value)}
                    />
                    {errors.nurse_assigned && (
                        <p className="text-sm text-red-600">{errors.nurse_assigned}</p>
                    )}
                    </div>

                    <div className="space-y-2 pb-4">
                    <Label>Contact No:</Label>
                    <Input 
                        placeholder="e.g 09111111111" 
                        value={data.contact_number}
                        onChange={(e) => setData('contact_number', e.target.value)}
                    />
                    {errors.contact_number && (
                        <p className="text-sm text-red-600">{errors.contact_number}</p>
                    )}
                    </div>
                </Field>
                </FieldGroup>
            <DialogFooter>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Save"}
                    </Button>
            </DialogFooter>
             </form>
                </DialogContent>
            </Dialog>
    );
}
export default EditBarangayDialog;