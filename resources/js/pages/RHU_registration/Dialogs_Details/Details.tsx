import { useForm } from '@inertiajs/react';
import {Plus} from 'lucide-react';
import { useState } from 'react';
import {Button} from '@/components/ui/button';
import {
    Dialog, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger
} from '@/components/ui/dialog';
import {FieldGroup, Field} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import InputPopulationPage from '@/pages/RHU_registration/Dialogs_Details/Population';

type DetailsFormData = {
    barangay_name: string;
    nurse_assigned: string;
    contact_number: string;
};

export function DetailsPage() {
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [populationDialogOpen, setPopulationDialogOpen] = useState(false);
    const [detailsFormData, setDetailsFormData] = useState<DetailsFormData | null>(null);
    const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);
    
    const {data, setData, errors} = useForm({
        barangay_name: '',
        nurse_assigned: '',
        contact_number: '',
        });

    const isFormValid =
        data.barangay_name.trim() !== '' &&
        data.nurse_assigned.trim() !== '';

    const handleNext = () => {
        if (!isFormValid) {
            return;
        }

        setDetailsFormData(data);
        setDetailsDialogOpen(false);
        setPopulationDialogOpen(true);
    };

    return (
            <>
            <Dialog
                open={detailsDialogOpen}
                onOpenChange={(open) => {
                    setDetailsDialogOpen(open);
                    if (!open) {
                        setPopulationDialogOpen(false);
                    }
                }}
            >
                <DialogTrigger asChild>
                   <Button className="bg-blue-600  hover:bg-blue-700 cursor-pointer">
                        <Plus/>
                        Register New Barangay
                   </Button> 
                </DialogTrigger>
            <DialogContent 
                className="sm:max-w-xl cursor-pointer"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
             <div>
                <DialogHeader>
                    <DialogTitle className="text pb-2">Barangay Details</DialogTitle>
                    <Separator/>
                </DialogHeader>
                <FieldGroup>
                <Field className='gap-4 pt-4'>
                    <div className="flex flex-col gap-2">
                    <Label>Name of Barangay:</Label>
                    <Input 
                        placeholder="e.g Alawihao" 
                        value={data.barangay_name}
                        onChange={(e) => {
                            setData('barangay_name', e.target.value);
                            setServerErrors(null);
                        }}
                    />
                    {serverErrors?.barangay_name ? (
                        <span className="text-red-500 text-sm">{serverErrors.barangay_name[0]}</span>
                    ) : errors.barangay_name && (
                        <span className="text-red-500 text-sm">
                            {errors.barangay_name}
                        </span>
                    )}
                    </div>
                </Field>
                <Field className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                    <Label>Nurse Assign:</Label>
                    <Input 
                        placeholder="e.g Aizel Joy Vasquez" 
                        value={data.nurse_assigned}
                        onChange={(e) => {
                            setData('nurse_assigned', e.target.value);
                            setServerErrors(null);
                        }}
                    />
                    {serverErrors?.nurse_assigned ? (
                        <span className="text-red-500 text-sm">{serverErrors.nurse_assigned[0]}</span>
                    ) : errors.nurse_assigned && (
                        <span className="text-red-500 text-sm">
                            {errors.nurse_assigned}
                        </span>
                    )}
                    </div>

                    <div className="flex flex-col gap-2">
                    <Label>Contact:</Label>
                    {/* Auto-prefixed +63; user enters up to 10 local digits. */}
                    <Input
                        placeholder="e.g 9123456789"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={13}
                        value={(() => {
                            const raw = data.contact_number ?? '';
                            if (!raw) return '+63';
                            if (raw === 'N/A') return '+63';
                            if (raw.startsWith('+63')) return '+63' + raw.slice(3);
                            if (raw.startsWith('0')) return '+63' + raw.slice(1);
                            return raw.startsWith('+') ? raw : '+63' + raw;
                        })()}
                        onChange={(e) => {
                            setServerErrors(null);
                            let v = e.target.value || '';

                            v = v.replace(/[^+0-9]/g, '');

                            if (v.startsWith('+63')) v = v.slice(3);
                            if (v.startsWith('0')) v = v.slice(1);

                            v = v.replace(/\D/g, '').slice(0, 10);

                            const stored = v.length > 0 ? '+63' + v : '';
                            setData('contact_number', stored);
                        }}
                    />
                    {serverErrors?.contact_number ? (
                        <span className="text-red-500 text-sm">{serverErrors.contact_number[0]}</span>
                    ) : errors.contact_number && (
                        <span className="text-red-500 text-sm">
                            {errors.contact_number}
                        </span>
                    )}
                    </div>
                </Field>
                </FieldGroup>
            </div>
            <DialogFooter>
                    <Button
                        type="button"
                        disabled={!isFormValid}
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                        Next
                    </Button>
            </DialogFooter>
                </DialogContent>
            </Dialog>
            <InputPopulationPage
                detailsData={detailsFormData}
                isDetailsValid={isFormValid}
                open={populationDialogOpen}
                onOpenChange={setPopulationDialogOpen}
                onDetailsError={() => {
                    setPopulationDialogOpen(false);
                    setDetailsDialogOpen(true);
                }}
                onServerErrors={(errs: Record<string, string[]>) => setServerErrors(errs)}
            />
            </>
    );
}
export default DetailsPage;
