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
      
      // Try to proceed with available token; server will return 419 if CSRF is truly required but missing
      if (!csrfToken) {
        console.warn('CSRF token not found in meta tag');
      }

      // Step 1: Save Barangay Details
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
        // Validation errors from server
        try {
          const err = await detailsResponse.json();
          console.error('Validation errors (Details):', err.errors);

          if (onServerErrors && err?.errors) {
            onServerErrors(err.errors);
          } else {
            const firstField = err?.errors && Object.keys(err.errors)[0];
            const firstMsg = firstField ? err.errors[firstField][0] : err.message || 'Validation error';
            alert(`Error: ${firstMsg}`);
          }
        } catch (parseError) {
          console.error('Failed to parse validation errors:', parseError);
          alert('Validation error saving barangay details');
        }

        setIsSaving(false);
        return;
      }

      if (detailsResponse.status === 419) {
        console.error('CSRF token expired or invalid');
        alert('Security session expired. Please refresh the page and try again.');
        setIsSaving(false);
        window.location.reload();
        return;
      }

      if (!detailsResponse.ok) {
        try {
          const err = await detailsResponse.json();
          console.error('Server error (Details):', err);
          const errorMsg = err.debug_error || err.message || 'Failed to save barangay details';
          alert(`Error: ${errorMsg}`);
        } catch {
          console.error(`HTTP ${detailsResponse.status}: Failed to save barangay details`);
          alert(`Error: Failed to save barangay details (HTTP ${detailsResponse.status})`);
        }
        setIsSaving(false);
        return;
      }

      // Step 2: Extract BHC ID from response
      const detailsResult = await detailsResponse.json();
      console.log('Barangay details saved:', detailsResult);

      const bhcId = detailsResult.bhc_id || detailsResult.barangay_id || detailsResult.id;

      if (!bhcId || bhcId <= 0) {
        console.error('Invalid BHC ID received:', bhcId);
        alert('Error: Invalid barangay ID received from server');
        setIsSaving(false);
        return;
      }

      // Step 3: Save Population Data
      const populationPayload = {
        bhc_id: bhcId,
        populations: data.populations,
      };

      console.log('Saving population data:', populationPayload);

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
        try {
          const err = await populationResponse.json();
          console.error('Validation errors (Population):', err.errors);
          
          const errorMessages = Object.entries(err.errors || {})
            .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(', ')}`)
            .join('\n');
          
          alert(`Validation Error:\n${errorMessages}`);
        } catch {
          alert('Validation error saving population data');
        }
        setIsSaving(false);
        return;
      }

      if (populationResponse.status === 419) {
        console.error('CSRF token expired or invalid');
        alert('Security session expired. Please refresh the page and try again.');
        setIsSaving(false);
        window.location.reload();
        return;
      }

      if (!populationResponse.ok) {
        try {
          const err = await populationResponse.json();
          console.error('Server error (Population):', err);
          alert(`Error: ${err.message || 'Failed to save population data'}`);
        } catch {
          console.error(`HTTP ${populationResponse.status}: Failed to save population data`);
          alert(`Error: Failed to save population data (HTTP ${populationResponse.status})`);
        }
        setIsSaving(false);
        return;
      }

      // Step 4: Confirm successful save
      const populationResult = await populationResponse.json();
      console.log('Population data saved:', populationResult);

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

      // Reload page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Unexpected error during save:', error);
      alert(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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