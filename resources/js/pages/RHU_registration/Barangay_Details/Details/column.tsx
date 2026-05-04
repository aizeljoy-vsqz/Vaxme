"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    const {delete: destroy} = useForm();

    const handleDelete = (id: string) => {
      if (confirm('Are you sure you want to delete this population record?')) {
        destroy(`/registration/population/${id}`, {
          preserveScroll: true,
          onSuccess: () => {
            window.location.reload();
          },
          onError: (errs) => {
            console.log('Delete error:', errs);
          }
        });
      }
    };

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
            className='cursor-pointer'
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={() => handleDelete(population.id)}
          >
            <span className="text-red-600 hover:text-red-700 cursor-pointer transition-colors">
              Delete
            </span>
            
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
}
];
