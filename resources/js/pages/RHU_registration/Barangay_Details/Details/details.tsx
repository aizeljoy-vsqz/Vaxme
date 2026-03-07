"use client";

import { useState } from "react";
import { DataTable } from '@/pages/RHU_registration/data-table';
import { populationColumns, PopulationData } from './column';

export function PopulationTable() {

  const [data] = useState<PopulationData[]>([
    {
      id: "1",
      ageRange: "All Ages",
      male: 100,
      female: 100,
      total: 200,
    },
    {
      id: "2",
      ageRange: "Under 1 (0-11 months)",
      male: 100,
      female: 100,
      total: 200,
    },
    {
      id: "3",
      ageRange: "0-12 months",
      male: 100,
      female: 100,
      total: 200,
    },
    {
      id: "4",
      ageRange: "10 years and above",
      male: 100,
      female: 100,
      total: 200,
    },
  ]);

  return (
    <section>
      <DataTable columns={populationColumns} data={data} />
    </section>
  );
}

export default PopulationTable;