"use client"

import type { ColumnDef } from "@tanstack/react-table"

export type AvailabilityType = {
  vaccine_id: number
  status: string
}

export const columns: ColumnDef<AvailabilityType>[] = [

  {
    accessorKey: "vaccine_id",
    header: "Availability",
  },
  {
    accessorKey: "status",
    header: "Expiry Status",
  },
]