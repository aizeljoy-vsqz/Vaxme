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

type BarangayOption = {
    barangay_name: string;
};

const CONTACT_PREFIX = '+63';

const createBlankDetails = () => ({
    barangay_name: '',
    nurse_assigned: '',
    contact_number: '',
});

const normalizeContactDisplay = (value: string | null | undefined) => {
    const raw = value ?? '';

    if (!raw || raw === 'N/A') {
        return CONTACT_PREFIX;
    }

    if (raw.startsWith(CONTACT_PREFIX)) {
        return `${CONTACT_PREFIX}${raw.slice(CONTACT_PREFIX.length)}`;
    }

    if (raw.startsWith('0')) {
        return `${CONTACT_PREFIX}${raw.slice(1)}`;
    }

    return raw.startsWith('+') ? raw : `${CONTACT_PREFIX}${raw}`;
};

const normalizeContactStorage = (value: string) => {
    let sanitized = value || '';

    sanitized = sanitized.replace(/[^+0-9]/g, '');

    if (sanitized.startsWith(CONTACT_PREFIX)) {
        sanitized = sanitized.slice(CONTACT_PREFIX.length);
    }

    if (sanitized.startsWith('0')) {
        sanitized = sanitized.slice(1);
    }

    sanitized = sanitized.replace(/\D/g, '').slice(0, 10);

    return sanitized.length > 0 ? `${CONTACT_PREFIX}${sanitized}` : '';
};

const normalizeBarangayName = (value: string) => value.trim().toLowerCase();

const toTitleCase = (value: string) =>
    value
        .toLowerCase()
        .replace(/\b\w/g, (character) => character.toUpperCase());

export function DetailsPage({ existingBarangays = [] }: { existingBarangays?: BarangayOption[] }) {
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [populationDialogOpen, setPopulationDialogOpen] = useState(false);
    const [detailsFormData, setDetailsFormData] = useState<DetailsFormData | null>(null);
    const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);
    
    const {data, setData, errors, reset} = useForm({
        ...createBlankDetails(),
    });

    const clearFormState = () => {
        reset();
        setData(createBlankDetails());
        setServerErrors(null);
        setDetailsFormData(null);
    };

    const closeDetailsDialog = () => {
        setDetailsDialogOpen(false);
        setPopulationDialogOpen(false);
        clearFormState();
    };

    const isContactNumberValid = data.contact_number.length === 13 && data.contact_number.startsWith(CONTACT_PREFIX);

    const normalizedBarangayName = normalizeBarangayName(data.barangay_name);
    const isBarangayNameDuplicate =
        normalizedBarangayName.length > 0 &&
        existingBarangays.some((barangay) =>
            normalizeBarangayName(barangay.barangay_name) === normalizedBarangayName
        );

    const isFormValid =
        data.barangay_name.trim() !== '' &&
        data.nurse_assigned.trim() !== '' &&
        isContactNumberValid &&
        !isBarangayNameDuplicate;

    const handleNext = () => {
        if (!isFormValid) {
            return;
        }

        setDetailsFormData(data);
        setDetailsDialogOpen(false);
        setPopulationDialogOpen(true);
    };

    const handleDetailsDialogChange = (open: boolean) => {
        setDetailsDialogOpen(open);

        if (!open) {
            closeDetailsDialog();
        }
    };

    const handleBarangayChange = (value: string) => {
        setData('barangay_name', value);
        setServerErrors(null);
    };

    const handleNurseChange = (value: string) => {
        setData('nurse_assigned', toTitleCase(value));
        setServerErrors(null);
    };

    const handleContactChange = (value: string) => {
        setServerErrors(null);
        setData('contact_number', normalizeContactStorage(value));
    };

    return (
            <>
            <Dialog
                open={detailsDialogOpen}
                onOpenChange={handleDetailsDialogChange}
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
                        onChange={(e) => handleBarangayChange(e.target.value)}
                    />
                    {serverErrors?.barangay_name ? (
                        <span className="text-red-500 text-sm">{serverErrors.barangay_name[0]}</span>
                    ) : isBarangayNameDuplicate ? (
                        <span className="text-red-500 text-sm">
                            Barangay name already exists. Please use a different name.
                        </span>
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
                        autoCapitalize="words"
                        value={data.nurse_assigned}
                        onChange={(e) => handleNurseChange(e.target.value)}
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
                    <Input
                        placeholder="e.g 9123456789"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={13}
                        value={normalizeContactDisplay(data.contact_number)}
                        onChange={(e) => handleContactChange(e.target.value)}
                    />
                    {!isContactNumberValid && data.contact_number.length > 0 && (
                        <span className="text-red-500 text-sm">
                            Contact must be exactly 10 digits
                        </span>
                    )}
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
