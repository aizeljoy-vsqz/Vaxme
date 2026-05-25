import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import SuccessDialog from '@/components/feedback/SuccessDialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldGroup, Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  createInitialPopulations,
  createJsonRequestInit,
  formatValidationErrors,
  getCsrfToken,
} from '@/pages/RHU_registration/Dialogs_Details/population-utils';
import type {
  DetailsFormData,
  PopulationItem,
} from '@/pages/RHU_registration/Dialogs_Details/population-utils';

type SuccessState = {
  title: string;
  description: string;
  details?: Array<{ label: string; value: string }>;
};

export function InputPopulationPage({
  detailsData,
  isDetailsValid,
  open,
  onOpenChange,
  onDetailsError,
  onServerErrors,
}: {
  detailsData: DetailsFormData | null;
  isDetailsValid: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDetailsError?: () => void;
  onServerErrors?: (errors: Record<string, string[]>) => void;
}) {
  const { data, setData, processing } = useForm<{ populations: PopulationItem[] }>({
    populations: createInitialPopulations(),
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successState, setSuccessState] = useState<SuccessState>({
    title: 'Successfully Saved',
    description: 'Barangay and population data were saved successfully.',
    details: [],
  });

  const resetSaving = () => {
    setIsSaving(false);
  };

  const resetAndCloseDetails = () => {
    onOpenChange(false);
    onDetailsError?.();
    resetSaving();
  };

  const resetPopulations = () => {
    setData('populations', createInitialPopulations());
  };

  const handleSuccessDismiss = () => {
    setSuccessOpen(false);
    onOpenChange(false);
    resetSaving();
    resetPopulations();
    router.reload();
  };

  const handleChange = (index: number, field: 'male' | 'female', value: string) => {
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
      const csrfToken = getCsrfToken();

      if (!csrfToken) {
        console.warn('CSRF token not found in meta tag');
      }

      const detailsResponse = await fetch('/registration', createJsonRequestInit(csrfToken, detailsData));

      if (detailsResponse.status === 422) {
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

        resetAndCloseDetails();

        return;
      }

      if (detailsResponse.status === 419) {
        console.error('CSRF token expired or invalid');
        alert('Security session expired. Please refresh the page and try again.');
        resetAndCloseDetails();
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

        resetAndCloseDetails();

        return;
      }

      const detailsResult = await detailsResponse.json();
      const bhcId = detailsResult.bhc_id || detailsResult.barangay_id || detailsResult.id;

      if (!bhcId || bhcId <= 0) {
        console.error('Invalid BHC ID received:', bhcId);
        alert('Error: Invalid barangay ID received from server');
        resetAndCloseDetails();

        return;
      }

      const populationPayload = {
        bhc_id: bhcId,
        populations: data.populations,
      };

      const populationResponse = await fetch('/registration/population', createJsonRequestInit(csrfToken, populationPayload));

      if (populationResponse.status === 422) {
        try {
          const err = await populationResponse.json();
          console.error('Validation errors (Population):', err.errors);

          const errorMessages = formatValidationErrors(err.errors || {});

          alert(`Validation Error:\n${errorMessages}`);
        } catch {
          alert('Validation error saving population data');
        }

        resetSaving();

        return;
      }

      if (populationResponse.status === 419) {
        console.error('CSRF token expired or invalid');
        alert('Security session expired. Please refresh the page and try again.');
        resetSaving();
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

        resetSaving();

        return;
      }

      await populationResponse.json();

      resetPopulations();

      const generated = detailsResult?.generated_user;
      const details: Array<{ label: string; value: string }> = [];

      if (generated?.email) {
        details.push({ label: 'Generated Email', value: generated.email });
      }

      if (generated?.temporary_password) {
        details.push({ label: 'Temporary Password', value: generated.temporary_password });
      }

      setSuccessState({
        title: 'Registration Complete',
        description: 'Barangay and population data were saved successfully.',
        details,
      });

      onOpenChange(false);
      resetSaving();
      setSuccessOpen(true);
    } catch (error) {
      console.error('Unexpected error during save:', error);
      alert(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      resetSaving();
    }
  };

  return (
    <>
      {/* <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-xl"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <form onSubmit={handleSaveUnified}>
            <DialogHeader>
              <DialogTitle className="pb-2">Barangay Details</DialogTitle>
              <Separator />
              <DialogDescription className="pb-4">Barangay Populations</DialogDescription>
            </DialogHeader>

            <FieldGroup>
              {data.populations.map((pop, index) => (
                <div key={index}>
                  <Label className="pb-4 font-semibold">{pop.age_range}</Label>

                  <Field className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Total of Male:</Label>
                      <Input
                        min="0"
                        placeholder="e.g 100"
                        value={pop.male}
                        onChange={(e) => handleChange(index, 'male', e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Total of Female:</Label>
                      <Input
                        min="0"
                        placeholder="e.g 100"
                        value={pop.female}
                        onChange={(e) => handleChange(index, 'female', e.target.value)}
                      />
                    </div>
                  </Field>
                </div>
              ))}
            </FieldGroup>

            <DialogFooter className="pt-6">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                disabled={isSaving || processing}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-md"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <form onSubmit={handleSaveUnified}>
            <DialogHeader>
              <Label className="text-md font-semibold">Barangay Details</Label>
              <Separator />
              <DialogDescription className="mb-2">Barangay Populations</DialogDescription>
            </DialogHeader>

            <div>
              {data.populations.map((pop, index) => (
                <div key={index}>
                  <Label className=" font-semibold mb-2">{pop.age_range}</Label>

                  <Field className="grid grid-cols-2">
                    <div className="flex flex-col gap-2 mb-4">
                      <Label>Total of Male:</Label>
                      <Input
                        min="0"
                        placeholder="e.g 100"
                        value={pop.male}
                        onChange={(e) => handleChange(index, 'male', e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label>Total of Female:</Label>
                      <Input
                        min="0"
                        placeholder="e.g 100"
                        value={pop.female}
                        onChange={(e) => handleChange(index, 'female', e.target.value)}
                      />
                    </div>
                  </Field>
                </div>
              ))}
            </div>

            <DialogFooter className="">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                disabled={isSaving || processing}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <SuccessDialog
        open={successOpen}
        onOpenChange={setSuccessOpen}
        title={successState.title}
        description={successState.description}
        details={successState.details}
        entityName={detailsData?.barangay_name}
        onClose={handleSuccessDismiss}
        onViewDetails={handleSuccessDismiss}
        onContinue={handleSuccessDismiss}
        continueLabel="Exit"
      />
    </>
  );
}

export default InputPopulationPage;