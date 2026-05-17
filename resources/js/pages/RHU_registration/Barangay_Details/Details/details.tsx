"use client";

import { useEffect, useState, useRef } from "react";
import { DataTable } from '@/pages/RHU_registration/data-table';
import EditPopulationDialog from "../Dialog_Edit/Edit_details";
import type { PopulationData } from './column';
import { populationColumns } from './column';

type BarangayPopulationRow = PopulationData & {
  barangayName?: string;
};

type Props = {
  populations?: BarangayPopulationRow[];
};

export function PopulationTable({ populations = [] }: Props) {
  const [data, setData] = useState<BarangayPopulationRow[]>(populations);
  const [selectedRow, setSelectedRow] = useState<BarangayPopulationRow | undefined>(undefined);
  const prevPopulationsRef = useRef<BarangayPopulationRow[]>(populations);

  useEffect(() => {
    // Only update if populations has actually changed
    if (JSON.stringify(prevPopulationsRef.current) !== JSON.stringify(populations)) {
      setData(populations);
      prevPopulationsRef.current = populations;
    }
  }, [populations]);

  const handleSave = (updated: BarangayPopulationRow) => {
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
        <EditPopulationDialog
          data={selectedRow}
          onSave={handleSave}
          onClose={() => setSelectedRow(undefined)}
        />
      )}
    </section>
  );
}

export default PopulationTable;