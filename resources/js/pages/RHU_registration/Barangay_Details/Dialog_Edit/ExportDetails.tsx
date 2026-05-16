import {
  FileSpreadsheet,
  Upload,
  CircleCheckBig
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";


interface ExportDialogProps {
  bhcId?: string;
  barangayName?: string;
}

export default function ExportDialog({ bhcId, barangayName }: ExportDialogProps) {
  const [fileName, setFileName] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const baseFileName = barangayName 
      ? `Barangay_${barangayName}_registration_${year}-${month}-${day}`
      : `barangay_registration_${year}-${month}-${day}`;
    
    return baseFileName;
  });
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    const trimmedFileName = fileName.trim();

    if (!trimmedFileName) {
      toast.error("Please enter a valid file name.");

      return;
    }

    try {
      setIsExporting(true);

      const sanitizedFileName = trimmedFileName.replace(/\.(xlsx|csv)$/i, '');

      let url = `/registration/export?file_name=${encodeURIComponent(sanitizedFileName)}`;

      if (bhcId) {
        url += `&bhc_id=${encodeURIComponent(bhcId)}`;
      }

      const link = document.createElement('a');

      link.href = url;
      link.download = `${sanitizedFileName}.xlsx`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      toast(
        <div className="flex items-center gap-2">
          <CircleCheckBig className="h-4 w-4 text-emerald-600" />
          Barangay data exported successfully.
        </div>,
        { position: 'top-right' }
      );

      setTimeout(() => {
        setIsExporting(false);
        setOpen(false);
      }, 500);

    } catch (error) {
      console.error('Export error:', error);

      toast.error("Failed to export file. Please try again.");

      setIsExporting(false);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"
        className="text-blue-600 border-blue-600 hover:bg-blue-700 cursor-pointer hover:text-white">
            <Upload className="to-blue-600"/>
                Export
        </Button>
      </DialogTrigger>

      <DialogContent 
        className="sm:max-w-xl"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Export Barangay Data
          </DialogTitle>

          <DialogDescription>
            Export barangay registration data to an Excel file.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-700">
            Export Type
          </h2>

          <div className="border rounded-xl p-4 flex items-center justify-between border-green-500 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileSpreadsheet className="h-6 w-6 text-green-600" />
              </div>

              <div>
                <p className="font-semibold">Excel (.xlsx)</p>
                <p className="text-sm text-gray-500">
                  Recommended for Excel compatibility
                </p>
              </div>
            </div>

            <div className="h-3 w-3 rounded-full border-3 border-green-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-700">
            File Name
          </h2>

          <div className="flex items-center">
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="rounded-r-none"
            />

            <div className="border border-l-0 px-4 py-2 rounded-r-md bg-gray-100 text-sm text-gray-600">
              .xlsx
            </div>
          </div>

          <p className="text-sm text-gray-500">
            The file will be downloaded to your device.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            disabled={isExporting}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleExport}
            disabled={isExporting || !fileName.trim()}
            className="bg-black hover:bg-gray-900"
          >
            <Upload className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}