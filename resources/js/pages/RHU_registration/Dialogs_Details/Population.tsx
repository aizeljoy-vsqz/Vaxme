import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldGroup, Field } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

type BarangayOption = {
  id: number;
  name: string;
};

type PopulationItem = {
  age_range: string;
  male: number;
  female: number;
};

type DetailsFormData = {
  barangay_name: string;
  nurse_assigned: string;
  contact_number: string;
};

export function InputPopulationPage({
  detailsData,
  isDetailsValid,
  open,
  onOpenChange,
  onNext,
  disabled,
}: {
  detailsData: DetailsFormData | null;
  isDetailsValid: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
  disabled?: boolean;
}) {

  const { data, setData, processing } = useForm<{
      populations: PopulationItem[];
    }>({
      populations: [
        { age_range: 'All Ages', male: 0, female: 0 },
        { age_range: 'Under 1 (0-11 months)', male: 0, female: 0 },
        { age_range: 'Under 0-12 months', male: 0, female: 0 },
        { age_range: 'Under 0-53 months', male: 0, female: 0 },
        { age_range: '10 years and above', male: 0, female: 0 },
      ],
    });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
      index: number,
      field: 'male' | 'female',
      value: string
    ) => {
      const updated = [...data.populations];

      updated[index] = {
        ...updated[index],
          [field]: Number.isNaN(Number(value)) ? 0 : Number(value),
      };

      setData('populations', updated);
    };

  const handleSaveUnified = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!detailsData || !isDetailsValid) {
      // eslint-disable-next-line no-console
      console.log('Save: Details data invalid');
      return;
    }

    setIsSaving(true);

    try {
      // eslint-disable-next-line no-console
      console.log('Unified Save: Submitting Details first', detailsData);

      // Get CSRF token from meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

      // Step 1: Submit Details to create Barangay
      const detailsResponse = await fetch('/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(detailsData),
      });

      if (!detailsResponse.ok) {
        const errorData = await detailsResponse.json();
        // eslint-disable-next-line no-console
        console.log('Details submit error:', errorData);
        setIsSaving(false);
        return;
      }

      const detailsResult = await detailsResponse.json();
      // eslint-disable-next-line no-console
      console.log('Details submit success:', detailsResult);

      const barangayId = detailsResult.barangay_id || detailsResult.id;

      if (!barangayId || barangayId <= 0) {
        // eslint-disable-next-line no-console
        console.log('Save: Failed to get barangay_id from response');
        setIsSaving(false);
        return;
      }

      // Step 2: Submit Population with the new barangay_id
      // eslint-disable-next-line no-console
      console.log('Unified Save: Submitting Population with barangay_id:', barangayId);

      const populationPayload = {
        barangay_id: barangayId,
        populations: data.populations,
      };

      const populationResponse = await fetch('/registration/population', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(populationPayload),
      });

      if (!populationResponse.ok) {
        const errorData = await populationResponse.json();
        // eslint-disable-next-line no-console
        console.log('Population submit error:', errorData);
        setIsSaving(false);
        return;
      }

      const populationResult = await populationResponse.json();
      // eslint-disable-next-line no-console
      console.log('Population submit success:', populationResult);

      // Both submitted successfully
      setData('populations', [
        { age_range: 'All Ages', male: 0, female: 0 },
        { age_range: 'Under 1 (0-11 months)', male: 0, female: 0 },
        { age_range: 'Under 0-12 months', male: 0, female: 0 },
        { age_range: 'Under 0-53 months', male: 0, female: 0 },
        { age_range: '10 years and above', male: 0, female: 0 },
      ]);

      // Close dialog
      onOpenChange(false);
      setIsSaving(false);

      // Auto refresh page to show the new barangay in the list
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Unified Save error:', error);
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        disabled={disabled || !isDetailsValid || processing}
        onClick={onNext}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
      >
        Next
      </Button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl">
          <form onSubmit={handleSaveUnified}>
            <DialogHeader>
              <DialogTitle className="pb-2">Barangay Details</DialogTitle>
              <Separator />
              <DialogDescription className="pb-2">Barangay Populations</DialogDescription>
            </DialogHeader>

            <FieldGroup>

              {data.populations.map((pop, index) => (
                <div key={index}>
                  <Label className="pb-10 font-semibold">{pop.age_range}</Label>

                  <Field className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Total of Male:</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="e.g 100"
                        value={pop.male}
                        onChange={(e) =>
                          handleChange(index, 'male', e.target.value)
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Total of Female:</Label>
                      <Input
                        type="number"
                        min="0"
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

            <DialogFooter className='pt-6'>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                disabled={isSaving || processing}
              >
                {isSaving ? 'Saving...' : 'Save Barangay & Population'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InputPopulationPage;