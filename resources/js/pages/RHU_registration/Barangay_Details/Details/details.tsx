"use client";

import { useState } from "react";
import { DataTable } from '../../data-table';
import { populationColumns, PopulationData } from './column';

export function PopulationTable() {
  const [data, setData] = useState<PopulationData[]>([
    {
      id: "1",
      ageRange: "All Ages",
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
    <div>
      <DataTable
        columns={populationColumns(setSelectedRow)}
        data={data}
      />
    </div>
  );
}
export default PopulationTable;