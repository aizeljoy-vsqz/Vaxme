import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {FieldGroup, Field} from '@/components/ui/field';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {
    Dialog, 
    DialogDescription,
    DialogClose, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger
} from '@/components/ui/dialog';


export function InputPopulationPage() {
    return (
       <Dialog>
             <form>
                <DialogTrigger asChild>
                    <Button className='bg-blue-500 hover:bg-blue-700'>Next</Button>
                </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text pb-2">Barangay Details</DialogTitle>
                    <Separator/>
                    <DialogDescription >Barangay Populations</DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    <Label className='pt-2 font-semibold'>All Ages</Label>
                      <Field className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Total of Male:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>

                        <div className="space-y-2">
                            <Label>Total of Female:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>
                    </Field>
                    <Label className="font-semibold">Under 1 (0-11 months)</Label>
                     <Field className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Total of Male:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>

                        <div className="space-y-2">
                            <Label>Total of Female:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>
                    </Field>
                    <Label className="font-semibold">Under 0-12 months</Label>
                     <Field className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Total of Male:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>

                        <div className="space-y-2">
                            <Label>Total of Female:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>
                    </Field>
                    <Label className="font-semibold">Under 0-53 months</Label>
                     <Field className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Total of Male:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>

                        <div className="space-y-2">
                            <Label>Total of Female:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>
                    </Field>
                    <Label className="font-semibold">10 years and above</Label>
                     <Field className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Total of Male:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>

                        <div className="space-y-2 pb-4">
                            <Label>Total of Female:</Label>
                            <Input placeholder='e.g 100'/>
                        </div>
                    </Field>
                </FieldGroup>
                <DialogFooter>
                        <Button className='bg-blue-500 hover:bg-blue-700'>Save</Button>
                </DialogFooter>
                </DialogContent>
             </form>
            </Dialog>
    );
}
export default InputPopulationPage;