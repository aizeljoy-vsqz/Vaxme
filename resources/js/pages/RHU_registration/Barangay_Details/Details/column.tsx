"use client";

// import { useForm } from "@inertiajs/react";
import type { ColumnDef } from "@tanstack/react-table";
import { PencilIcon } from 'lucide-react';
// import { useState } from 'react';
// import { toast } from 'sonner';
// import DeleteConfirmDialog from '@/components/feedback/DeleteConfirmDialog';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Action cell component for population table
 * Separated into its own component to properly use React hooks
 */
function ActionCell({
  population,
  setSelectedRow,
}: {
  population: PopulationData;
  setSelectedRow: (row: PopulationData) => void;
}) {
  // const { delete: destroy } = useForm();
  // const [deleteOpen, setDeleteOpen] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);

  // const handleDelete = () => {
  //   setDeleteOpen(true);
  // };

  // const confirmDelete = () => {
  //   setIsDeleting(true);

  //   destroy(`/registration/population/${population.id}`, {
  //     preserveScroll: true,
  //     onSuccess: () => {
  //       setDeleteOpen(false);
  //       toast(
  //         <div className="flex items-center gap-2">
  //           <CircleCheckBig className="h-4 w-4 text-emerald-600" />
  //           Successfully deleted.
  //         </div>,
  //         { position: 'top-right' }
  //       );
  //       window.location.reload();
  //     },
  //     onError: () => {
  //       setDeleteOpen(false);
  //     },
  //     onFinish: () => {
  //       setIsDeleting(false);
  //     },
  //   });
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          ...
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setSelectedRow(population)}
          className="cursor-pointer"
        >
          <PencilIcon/>
          Edit
        </DropdownMenuItem>

        {/* <DropdownMenuItem onClick={handleDelete}>
          <span className="text-red-600 hover:text-red-700 cursor-pointer transition-colors">
            Delete
          </span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>

      {/* <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete population record?"
        description={`This will permanently delete the population data for ${population.ageRange}.`}
        onConfirm={confirmDelete}
        isProcessing={isDeleting}
      /> */}
    </DropdownMenu>
  );
}

export type PopulationData = {
  id: string;
  barangayName?: string;
  ageRange: string;
  male: number;
  female: number;
  total: number;
};

export const populationColumns = (setSelectedRow: (row: PopulationData) => void): ColumnDef<PopulationData>[] => [
    {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "barangayName",
    header: "Barangay",
  },

  {
    accessorKey: "ageRange",
    header: "Age Range",
  },

  {
    accessorKey: "male",
    header: "Male",
  },

  {
    accessorKey: "female",
    header: "Female",
  },

  {
    accessorKey: "total",
    header: "Total",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const population = row.original;

      return <ActionCell population={population} setSelectedRow={setSelectedRow} />;
    },
  }
];
