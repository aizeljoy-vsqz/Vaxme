<?php

namespace App\Exports;

use App\Models\BarangayPopulation;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BarangayExport implements FromCollection, WithHeadings
{
    protected $barangayId;

    public function __construct($barangayId = null)
    {
        $this->barangayId = $barangayId;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $query = BarangayPopulation::query()
            ->join('barangays', 'barangay_populations.barangay_id', '=', 'barangays.id')
            ->select(
                'barangays.barangay_name',
                'barangays.nurse_assigned',
                'barangays.contact_number',
                'barangay_populations.age_range',
                'barangay_populations.male',
                'barangay_populations.female',
                'barangay_populations.total'
            );

        // Filter by barangay_id if provided
        if ($this->barangayId) {
            $query->where('barangay_populations.barangay_id', $this->barangayId);
        }

        return $query->get();    
    }
    public function headings(): array
    {
        return [
            'Barangay Name',
            'Nurse Assigned',
            'Contact Number',
            'Age Range',
            'Male',
            'Female',
            'Total'
        ];
    }
}    
