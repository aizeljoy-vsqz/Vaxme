"use client";

import { useEffect, useState } from "react";
import { DataTable } from '@/pages/RHU_registration/data-table';
import { populationColumns, PopulationData } from './column';
import InputPopulationPage from "../Dialog_Edit/Edit_details";

type BarangayPopulationRow = PopulationData & {
  barangayName?: string;
};

type Props = {
  populations?: BarangayPopulationRow[];
};

export function PopulationTable({ populations = [] }: Props) {
  const [data, setData] = useState<BarangayPopulationRow[]>(populations);

  const [selectedRow, setSelectedRow] = useState<BarangayPopulationRow | undefined>(undefined);

  useEffect(() => {
    setData(populations);
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
        <InputPopulationPage
          data={selectedRow}
          onSave={handleSave}
          onClose={() => setSelectedRow(undefined)}
        />
      )}
    </section>
  );
}

export default PopulationTable;