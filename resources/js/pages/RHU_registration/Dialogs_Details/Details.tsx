import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Plus} from 'lucide-react';
import {FieldGroup, Field} from '@/components/ui/field';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import { useState } from 'react';
import InputPopulationPage from '@/pages/RHU_registration/Dialogs_Details/Population';
import {
    Dialog, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger
} from '@/components/ui/dialog';
import { useForm, usePage } from '@inertiajs/react';

type BarangayOption = {
    id: number;
    name: string;
};

export function DetailsPage({ barangays }: { barangays: BarangayOption[] }) {

    const { props } = usePage();

    const [barangayId, setBarangayId] = useState<number | null>(null);
    const [populationDialogOpen, setPopulationDialogOpen] = useState(false);
    
    const {data, setData, post, errors} = useForm({
        barangay_name: '',
        nurse_assigned: '',
        contact_number: '',
        });

    const isFormValid =
        data.barangay_name.trim() !== '' &&
        data.nurse_assigned.trim() !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.barangay_name || !data.nurse_assigned) {
            return;
        }

        // debug
        // eslint-disable-next-line no-console
        console.log('Details submit', data);

        post('/registration', {
            preserveScroll: true,
            onSuccess: (page: any) => {
                // eslint-disable-next-line no-console
                console.log('Details post success, page.props:', page.props);

                setData({
                    barangay_name: '',
                    nurse_assigned: '',
                    contact_number: '',
                });

                // Get barangay_id from props (not flash)
                const id = Number(page.props.flash?.barangay_id ?? page.props.barangay_id ?? 0);

                // eslint-disable-next-line no-console
                console.log('Got barangay_id from props:', id);

                if (id && id > 0) {
                    setBarangayId(id);
                    setPopulationDialogOpen(true);
                }
            },
            onError: (errs: any) => {
                // eslint-disable-next-line no-console
                console.log('Details post errors', errs);
            },
        });
    };

    return (
            <Dialog>
                <DialogTrigger asChild>
                   <Button className="bg-blue-600  hover:bg-blue-700 cursor-pointer">
                        <Plus/>
                        Register New Barangay
                   </Button> 
                </DialogTrigger>
            <DialogContent className="sm:max-w-xl cursor-pointer">
             <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setData('barangay_name', e.target.value)}
                    />
                    {errors.barangay_name && (
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
                        onChange={(e) => setData('nurse_assigned', e.target.value)}
                    />
                    {errors.nurse_assigned && (
                        <span className="text-red-500 text-sm">
                            {errors.nurse_assigned}
                        </span>
                    )}
                    </div>

                    <div className="flex flex-col gap-2">
                    <Label>Contact:</Label>
                    <Input 
                        placeholder="e.g 0912345678" 
                        value={data.contact_number}
                        onChange={(e) => setData('contact_number', e.target.value)}
                    />
                    {errors.contact_number && (
                        <span className="text-red-500 text-sm">
                            {errors.contact_number}
                        </span>
                    )}
                    </div>
                </Field>
                </FieldGroup>
            <DialogFooter>
                    <InputPopulationPage
                        barangays={barangays}
                        barangayId={barangayId ?? 0}
                        disabled={!isFormValid}
                        isValid={isFormValid}
                        open={populationDialogOpen}
                        onOpenChange={setPopulationDialogOpen}/>
            </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
    );
}
export default DetailsPage;
