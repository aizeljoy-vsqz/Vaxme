"use client";

import { useState } from "react";
import { DataTable } from '@/pages/RHU_registration/data-table';
import { populationColumns, PopulationData } from './Details/column';
import InputPopulationPage from "./Dialog_Edit/Edit_details";

type BarangayPopulationRow = PopulationData & {
  barangayName?: string;
};

type Props = {
  populations?: BarangayPopulationRow[];
};

export function BarangayDetails({ populations = [] }: Props) {

  const [data, setData] = useState<BarangayPopulationRow[]>(populations);

  const [selectedRow, setSelectedRow] = useState<BarangayPopulationRow | null>(null);

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
          onClose={() => setSelectedRow(null)}
        />
      )}
    </section>
  );
}

BarangayDetails.layout = {
    breadcrumbs: [
        {

        title: 'Registration',
        href: '/registration/brgy-details',

        },
    ]
};

export default BarangayDetails;