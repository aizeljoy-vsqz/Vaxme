import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  FileSpreadsheet,
  Download,
  Upload,
} from "lucide-react";

export default function ExportDialog() {
  const [fileName, setFileName] = useState(
    "barangay_registration_2024-05-20"
  );

  const handleExport = () => {
    const safeFileName = fileName.trim() || "barangay_registration_2024-05-20";
    window.location.assign(`/registration/export?file_name=${encodeURIComponent(safeFileName)}`);
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

      <DialogContent className="sm:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Export Barangay Data
          </DialogTitle>

          <DialogDescription>
            Export barangay registration data to an Excel file.
            You can choose specific fields and apply filters.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        {/* EXPORT TYPE */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-700">
            Export Type
          </h2>

          <div className="border rounded-xl p-4 flex items-center justify-between border-green-500 bg-green-50">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <FileSpreadsheet className="h-8 w-8 text-green-600" />
              </div>

              <div>
                <p className="font-semibold">Excel (.xlsx)</p>
                <p className="text-sm text-gray-500">
                  Recommended for Excel compatibility
                </p>
              </div>
            </div>

            <div className="h-4 w-4 rounded-full border-4 border-green-500" />
          </div>
        </div>

        {/* FILE NAME */}
        <div className="space-y-2">
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
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}