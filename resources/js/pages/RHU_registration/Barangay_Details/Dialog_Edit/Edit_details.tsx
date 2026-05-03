"use client";

import { useState } from "react";
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
    DialogTitle,
} from '@/components/ui/dialog';
  import { router } from '@inertiajs/react';

import { PopulationData } from "../Details/column";

type Props = {
  data: PopulationData;
  onSave: (data: PopulationData) => void;
  onClose: () => void;
};

export function EditPopulationDialog({ data, onSave, onClose }: Props) {

  const [male, setMale] = useState<number | "">(data.male ?? "");
  const [female, setFemale] = useState<number | "">(data.female ?? "");
  const [processing, setProcessing] = useState(false);
  
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
        <form>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text pb-2">Barangay Details</DialogTitle>
          <Separator />
          <DialogDescription>Edit Barangay Populations</DialogDescription>
        </DialogHeader>

        <FieldGroup>

          <Label className='pt-2 font-semibold'>All Ages</Label>
          <Field className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total of Male:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "All Ages" ? male : ""}
                onChange={(e) => setMale(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Total of Female:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "All Ages" ? female : ""}
                onChange={(e) => setFemale(Number(e.target.value))}
              />
            </div>
          </Field>


          <Label className="font-semibold">Under 1 (0-11 months)</Label>
          <Field className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total of Male:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "Under 1 (0-11 months)" ? male : ""}
                onChange={(e) => setMale(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Total of Female:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "Under 1 (0-11 months)" ? female : ""}
                onChange={(e) => setFemale(Number(e.target.value))}
              />
            </div>
          </Field>


          <Label className="font-semibold">Under 0-12 months</Label>
          <Field className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total of Male:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "Under 0-12 months" ? male : ""}
                onChange={(e) => setMale(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Total of Female:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "Under 0-12 months" ? female : ""}
                onChange={(e) => setFemale(Number(e.target.value))}
              />
            </div>
          </Field>


          <Label className="font-semibold">Under 0-53 months</Label>
          <Field className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total of Male:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "Under 0-53 months" ? male : ""}
                onChange={(e) => setMale(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label>Total of Female:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "Under 0-53 months" ? female : ""}
                onChange={(e) => setFemale(Number(e.target.value))}
              />
            </div>
          </Field>


          <Label className="font-semibold">10 years and above</Label>
          <Field className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total of Male:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "10 years and above" ? male : ""}
                onChange={(e) => setMale(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2 pb-4">
              <Label>Total of Female:</Label>
              <Input
                placeholder='e.g 100'
                value={data.ageRange === "10 years and above" ? female : ""}
                onChange={(e) => setFemale(Number(e.target.value))}
              />
            </div>
          </Field>

        </FieldGroup>

        <DialogFooter>
          <Button
            type="button"
            className='bg-blue-500 hover:bg-blue-700'
            onClick={() => {
                const nextMale = Number(male) || 0;
                const nextFemale = Number(female) || 0;
                setProcessing(true);

                router.put(`/registration/population/${data.id}`,
                  {
                    male: nextMale,
                    female: nextFemale,
                  },
                  {
                  preserveScroll: true,
                  onSuccess: () => {
                    onSave({
                      ...data,
                      male: nextMale,
                      female: nextFemale,
                      total: nextMale + nextFemale,
                    });
                    onClose();
                  },
                  onFinish: () => setProcessing(false),
                });
            }}
            disabled={processing}
            >
            Save
            </Button>
        </DialogFooter>

      </DialogContent>
      </form>
    </Dialog>
  );
}

export default EditPopulationDialog;
