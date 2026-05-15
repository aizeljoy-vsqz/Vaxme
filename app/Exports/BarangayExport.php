<?php

namespace App\Exports;

use App\Models\BarangayPopulation;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BarangayExport implements FromCollection, WithHeadings
{
    protected $barangayId;
    protected $rhuId;

    public function __construct($barangayId = null, $rhuId = null)
    {
        $this->barangayId = $barangayId;
        $this->rhuId = $rhuId;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $query = BarangayPopulation::query()
            ->with('bhc:id,barangay_name,nurse_assigned,contact_number')
            ->when($this->rhuId, function ($query): void {
                $query->whereHas('bhc.rhu', function ($rhuQuery): void {
                    $rhuQuery->whereKey($this->rhuId);
                });
            }, function ($query): void {
                $query->whereRaw('1 = 0');
            });

        // Filter by BHC id (previously barangay_id) if provided
        if ($this->barangayId) {
            $query->where('bhc_id', $this->barangayId);
        }

        return $query->get()->map(fn ($population) => [
            'barangay_name' => $population->bhc?->barangay_name,
            'nurse_assigned' => $population->bhc?->nurse_assigned,
            'contact_number' => $population->bhc?->contact_number,
            'age_range' => $population->age_range,
            'male' => $population->male,
            'female' => $population->female,
            'total' => $population->total,
        ]);
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
