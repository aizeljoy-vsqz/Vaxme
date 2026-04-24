import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Plus} from 'lucide-react';
import {FieldGroup, Field} from '@/components/ui/field';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import InputPopulationPage from '@/pages/RHU_registration/Dialogs_Details/Population';
import {
    Dialog, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';

type BarangayOption = {
    id: number;
    name: string;
};

export function DetailsPage({ barangays }: { barangays: BarangayOption[] }) {

     const {data, setData, post} = useForm({
        name: '',
    nurse_assigned: '',
    rhu_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/registration', {
            onSuccess: () => {
                console.log('Saved!');
            }
        });
    };

    return (
            <Dialog>
             <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                   <Button className="bg-blue-600  hover:bg-blue-700 cursor-pointer">
                        <Plus/>
                        Register New Barangay
                   </Button> 
                </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text pb-2">Barangay Details</DialogTitle>
                    <Separator/>
                </DialogHeader>
                <FieldGroup>
                <Field className='gap-4 pt-4'>
                    <div className="space-y-2">
                    <Label>Name of Barangay:</Label>
                    <Input 
                        placeholder="e.g Alawihao" 
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
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
                    </div>

                    <div className="space-y-2 pb-4">
                    <Label>Contact:</Label>
                    <Input 
                        placeholder="e.g 1" 
                        value={data.rhu_id}
                        onChange={(e) => setData('rhu_id', e.target.value)}
                    />
                    </div>
                </Field>
                </FieldGroup>
            <DialogFooter>
                    <InputPopulationPage barangays={barangays}/>
            </DialogFooter>
                </DialogContent>
             </form>
            </Dialog>
    );
}
export default DetailsPage;
