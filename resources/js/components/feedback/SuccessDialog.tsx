import { CircleCheckBig } from 'lucide-react';
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
  onClose,
  onContinue,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <CircleCheckBig className="h-7 w-7" aria-hidden="true" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-slate-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-slate-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        {details.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Account Details
            </p>
            <Separator className="mb-3" />
            <div className="space-y-2">
              {details.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-medium text-slate-900">{item.value}</span>
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
              onOpenChange(false);
              onClose?.();
            }}
          >
            Close
          </Button>

          <Button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto cursor-pointer text-white"
            onClick={onContinue}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}