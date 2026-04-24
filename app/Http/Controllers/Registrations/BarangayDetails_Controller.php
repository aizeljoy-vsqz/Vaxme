<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Models\BarangayPopulation;
use Inertia\Inertia;

class BarangayDetails_Controller extends Controller
{
    public function index()
    {
        return Inertia::render('RHU_registration/Barangay_Details/Barangay-Detail', [
            'populations' => BarangayPopulation::query()
                ->with('barangay:id,name')
                ->latest()
                ->get()
                ->map(fn (BarangayPopulation $population) => [
                    'id' => (string) $population->id,
                    'barangayName' => $population->barangay?->name,
                    'ageRange' => $population->age_range,
                    'male' => $population->male,
                    'female' => $population->female,
                    'total' => $population->total,
                ]),
        ]);
    }

}
