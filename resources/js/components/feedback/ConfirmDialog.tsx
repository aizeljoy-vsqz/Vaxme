import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isProcessing?: boolean;
  intent?: 'primary' | 'danger';
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isProcessing = false,
  intent = 'primary',
}: ConfirmDialogProps) {
  const confirmClass =
    intent === 'danger'
      ? 'bg-red-100 text-red-600 shadow-none hover:bg-red-200'
      : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-[20rem] gap-0 border border-gray-200 bg-white p-0 shadow-2xl sm:max-w-sm"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center px-6 pt-8 pb-4 text-center">
          <div className="rounded-3xl bg-green-50 p-2 text-green-500 shadow-sm ring-1 ring-green-100">
            <Check className="h-4 w-4" />
          </div>
          <DialogTitle className="text-md font-medium">{title}</DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
      
        <div className="mx-6 border-t border-gray-100" />
        

        <DialogFooter className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:gap-2">
          <Button
            type="button"
            variant="outline"
            className="border-gray-200 bg-white text-gray-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-gray-50 sm:flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            {cancelLabel}
          </Button>
          <Button type="button" className={`${confirmClass} sm:flex-1`} onClick={onConfirm} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
