"use client";

import { useState } from "react";
import { DataTable } from '@/pages/RHU_registration/data-table';
import { populationColumns, PopulationData } from './column';
import InputPopulationPage from "../Dialog_Edit/Edit_details";

export function PopulationTable() {

  const [data , setData] = useState<PopulationData[]>([
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

  const [selectedRow, setSelectedRow] = useState<PopulationData | null>(null);

  const handleSave = (updated: PopulationData) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === updated.id ? updated : item
      )
    );
  };

  return (
    <section>
      <DataTable
        columns={populationColumns(setSelectedRow)}
        data={data}
      />

      {selectedRow && (
        <InputPopulationPage
          data={selectedRow}
          onSave={handleSave}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </section>
  );
}

export default PopulationTable;