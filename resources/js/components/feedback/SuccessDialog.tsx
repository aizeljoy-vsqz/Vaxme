import { CircleCheckBig } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Label } from '../ui/label';

type SuccessDetail = {
  label: string;
  value: string;
};

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description: string;
  details?: SuccessDetail[];
  entityName?: string;
  onClose?: () => void;
  onContinue?: () => void;
  onViewDetails?: () => void;
  continueLabel?: string;
};

export default function SuccessDialog({
  open,
  onOpenChange,
  title = 'Successfully Saved',
  description,
  details = [],
  entityName,
  onClose,
  onContinue,
}: SuccessDialogProps) {
  const toastShownRef = useRef(false);
  const continueClickedRef = useRef(false);

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen && !continueClickedRef.current) {
      onClose?.();
      window.location.reload();
    }

    if (!nextOpen) {
      continueClickedRef.current = false;
    }
  };

  useEffect(() => {
    if (open && !toastShownRef.current) {
      const message = (
        <div className="flex items-center gap-2">
          <CircleCheckBig className="h-4 w-4 text-emerald-600" />
          {entityName ? `Barangay ${entityName} is Successfully saved.` : 'Successfully saved.'}
        </div>
      );

      toast(message, { position: 'top-right' });
      toastShownRef.current = true;
    } else if (!open) {
      toastShownRef.current = false;
    }
  }, [open, entityName]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-100">
            <CircleCheckBig className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-md font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {details.length > 0 && (
          <div className="rounded-lg border border-slate-200 p-4">
            <Label className="mb-2">
              Account Details
            </Label>
            <Separator className="mb-3" />
            <div className="space-y-2">
              {details.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => {
              handleOpenChange(false);
            }}
          >
            Close
          </Button>

          <Button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto cursor-pointer text-white"
            onClick={() => {
              continueClickedRef.current = true;
              onContinue?.();
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}