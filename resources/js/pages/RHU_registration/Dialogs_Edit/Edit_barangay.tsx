import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import {Button} from '@/components/ui/button';
import ConfirmDialog from '@/components/feedback/ConfirmDialog';
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
import { CircleCheckBig } from 'lucide-react';

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

        if (
            data.barangay_name.trim() === '' ||
            data.nurse_assigned.trim() === '' ||
            data.contact_number.trim() === ''
        ) {
            toast.error('Please fill in all required fields.');
            return;
        }

        // open confirmation dialog before performing update
        setConfirmOpen(true);
    };

    const [confirmOpen, setConfirmOpen] = useState(false);

    const performUpdate = () => {
        setConfirmOpen(false);

        put(`/registration/${barangay.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast(
                    <div className="flex items-center gap-2">
                        <CircleCheckBig className="h-4 w-4 text-emerald-600" />
                        Successfully saved.
                    </div>,
                    { position: 'top-right' }
                );
                setOpen(false);
            },
            onError: (errs) => {
                toast.error('Failed to save. Please check your input and try again.');
            }
        });
    };

    return (
        <>
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
            <DialogContent 
                className="sm:max-w-xl"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                >
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
            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Save changes?"
                description="This will save the changes to this barangay."
                onConfirm={performUpdate}
                confirmLabel="Save"
                isProcessing={processing}
                intent="primary"
            />
        </>
    );
}
export default EditBarangayDialog;