import {
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import { useState, useRef } from "react";
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
  barangayId?: string;
}

export default function ExportDialog({ barangayId }: ExportDialogProps) {
  const [fileName, setFileName] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `barangay_registration_${year}-${month}-${day}`;
  });
  const [isExporting, setIsExporting] = useState(false);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const handleExport = () => {
    try {
      setIsExporting(true);
      let url = `/registration/export?file_name=${encodeURIComponent(fileName)}`;
      
      // Add barangay_id if available
      if (barangayId) {
        url += `&barangay_id=${encodeURIComponent(barangayId)}`;
      }
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close dialog after a short delay to ensure download is triggered
      setTimeout(() => {
        setIsExporting(false);
        dialogCloseRef.current?.click();
      }, 500);
    } catch (error) {
      console.error('Export error:', error);
      alert(`Error exporting file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsExporting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"
        className="text-blue-600 border-blue-600 hover:bg-blue-700 cursor-pointer hover:text-white">
            <Upload className="to-blue-600"/>
                Export
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Export Barangay Data
          </DialogTitle>

          <DialogDescription>
            Export barangay registration data to an Excel file.
          </DialogDescription>
          <button ref={dialogCloseRef} className="hidden" />
        </DialogHeader>

        <Separator />

        {/* EXPORT TYPE */}
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
          <Button variant="outline" disabled={isExporting}>
            Cancel
          </Button>

          <Button
            onClick={handleExport}
            disabled={isExporting}
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