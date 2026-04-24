import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldGroup, Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogDescription,
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

export function InputPopulationPage({ barangays }: { barangays: BarangayOption[] }) {

  const { data, setData, post, processing } = useForm({
    barangay_id: '',
    populations: [
      { age_range: 'All Ages', male: '', female: '' },
      { age_range: 'Under 1 (0-11 months)', male: '', female: '' },
      { age_range: 'Under 0-12 months', male: '', female: '' },
      { age_range: 'Under 0-53 months', male: '', female: '' },
      { age_range: '10 years and above', male: '', female: '' },
    ],
  });

  const handleChange = (index: number, field: 'male' | 'female', value: string) => {
    const updated = [...data.populations];
    updated[index][field] = value;
    setData('populations', updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/registration/population', {
      onSuccess: () => {
        console.log('Population saved!');
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-blue-600 hover:bg-blue-700 cursor-pointer'>Next</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="pb-2">Barangay Details</DialogTitle>
            <Separator />
            <DialogDescription>Barangay Populations</DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field className="pt-2">
              <div className="space-y-2 w-full">
                <Label>Barangay</Label>
                <Select
                  value={data.barangay_id}
                  onValueChange={(value) => setData('barangay_id', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select barangay" />
                  </SelectTrigger>
                  <SelectContent>
                    {barangays.map((barangay) => (
                      <SelectItem key={barangay.id} value={String(barangay.id)}>
                        {barangay.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Field>

            {data.populations.map((pop, index) => (
              <div key={index}>
                <Label className="pt-2 font-semibold">{pop.age_range}</Label>

                <Field className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Total of Male:</Label>
                    <Input
                      placeholder="e.g 100"
                      value={pop.male}
                      onChange={(e) =>
                        handleChange(index, 'male', e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Total of Female:</Label>
                    <Input
                      placeholder="e.g 100"
                      value={pop.female}
                      onChange={(e) =>
                        handleChange(index, 'female', e.target.value)
                      }
                    />
                  </div>
                </Field>
              </div>
            ))}
          </FieldGroup>

          <DialogFooter>
            <Button type="submit" className="bg-blue-600  hover:bg-blue-700 cursor-pointer" disabled={processing}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InputPopulationPage;