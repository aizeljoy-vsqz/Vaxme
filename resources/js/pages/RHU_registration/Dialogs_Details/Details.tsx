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



export function DetailsPage() {
    return (
            <Dialog>
             <form>
                <DialogTrigger asChild>
                   <Button className="bg-blue-500  hover:bg-blue-700">
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
                    <Input placeholder="e.g Alawihao" />
                    </div>
                </Field>
                <Field className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <Label>Nurse Assign:</Label>
                    <Input placeholder="e.g Aizel Joy Vasquez" />
                    </div>

                    <div className="space-y-2 pb-4">
                    <Label>Contact No:</Label>
                    <Input placeholder="e.g 09111111111" />
                    </div>
                </Field>
                </FieldGroup>
            <DialogFooter>
                    <InputPopulationPage/>
            </DialogFooter>
                </DialogContent>
             </form>
            </Dialog>
    );
}
export default DetailsPage;
