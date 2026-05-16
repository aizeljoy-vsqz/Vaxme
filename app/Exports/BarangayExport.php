<?php

namespace App\Exports;

use App\Models\BarangayPopulation;

class BarangayExport
{
    protected ?int $barangayId;
    protected ?int $rhuId;

    public function __construct($barangayId = null, $rhuId = null)
    {
        $this->barangayId = $barangayId;
        $this->rhuId = $rhuId;
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
            'Total',
        ];
    }

    public function rows()
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

        if ($this->barangayId) {
            $query->where('bhc_id', $this->barangayId);
        }

        return $query->get()->map(fn ($population) => [
            $population->bhc?->barangay_name,
            $population->bhc?->nurse_assigned,
            $population->bhc?->contact_number,
            $population->age_range,
            $population->male,
            $population->female,
            $population->total,
        ]);
    }
}
