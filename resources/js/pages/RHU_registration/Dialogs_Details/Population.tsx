import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { store as registrationStore } from '@/routes/registration';
import { store as populationStore } from '@/routes/registration/population';

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
  onServerErrors,
  disabled,
}: {
  detailsData: DetailsFormData | null;
  isDetailsValid: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
  onServerErrors?: (errors: Record<string, string[]>) => void;
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
      return;
    }

    setIsSaving(true);

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      const detailsResponse = await fetch(registrationStore.url(), {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken,
      },
        credentials: 'same-origin',
        body: JSON.stringify(detailsData),
      });

      if (detailsResponse.status === 422) {
        // validation errors from server
        try {
          const err = await detailsResponse.json();

          if (onServerErrors && err?.errors) {
            onServerErrors(err.errors);
          } else {
            const firstField = err?.errors && Object.keys(err.errors)[0];
            const firstMsg = firstField ? err.errors[firstField][0] : err.message || 'Validation error';
            alert(firstMsg);
          }
        } catch {
          // fallback
          alert('Validation error saving barangay details');
        }

        setIsSaving(false);

        return;
      }

      if (!detailsResponse.ok) {
        setIsSaving(false);

        return;
      }

      const detailsResult = await detailsResponse.json();

      const barangayId = detailsResult.barangay_id || detailsResult.id;

      if (!barangayId || barangayId <= 0) {
        setIsSaving(false);

        return;
      }

      const populationPayload = {
        barangay_id: barangayId,
        populations: data.populations,
      };

      const populationResponse = await fetch(populationStore.url(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': csrfToken,
        },
        credentials: 'same-origin',
        body: JSON.stringify(populationPayload),
      });
      
      if (populationResponse.status === 422) {
        const err = await populationResponse.json();

        alert(JSON.stringify(err.errors));

        setIsSaving(false);

        return;
      }

      if (!populationResponse.ok) {
        setIsSaving(false);

        return;
      }

      await populationResponse.json();

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

      window.location.reload();
    } catch {
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