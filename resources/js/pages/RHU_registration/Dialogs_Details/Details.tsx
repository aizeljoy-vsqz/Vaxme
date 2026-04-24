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
import { useForm, usePage  } from '@inertiajs/react';

type BarangayOption = {
    id: number;
    name: string;
};

export function DetailsPage({ barangays }: { barangays: BarangayOption[] }) {

     const {data, setData, post, errors} = useForm({
        name: '',
        nurse_assigned: '',
        rhu_id: '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.name || !data.nurse_assigned || !data.rhu_id) {
        return;
    }

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
            <DialogContent className="sm:max-w-xl curs">
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
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                    <span className="text-red-500 text-sm">
                        {errors.name}
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
                        value={data.rhu_id}
                        onChange={(e) => setData('rhu_id', e.target.value)}
                    />
                    {errors.rhu_id && (
                        <span className="text-red-500 text-sm">
                            {errors.rhu_id}
                        </span>
                    )}
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
