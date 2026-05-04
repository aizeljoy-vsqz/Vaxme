<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Models\BarangayPopulation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangayDetails_Controller extends Controller
{
    public function index(Request $request)
    {
        $selectedBarangayId = $request->query('barangay_id');

        $query = BarangayPopulation::query()
            ->with('barangay:id,barangay_name')
            ->latest();

        if ($selectedBarangayId) {
            $query->where('barangay_id', $selectedBarangayId);
        }

        return Inertia::render('RHU_registration/Barangay_Details/Barangay-Detail', [
            'populations' => $query->get()->map(fn ($population) => [
                'id' => (string) $population->id,
                'barangayName' => $population->barangay?->barangay_name,
                'ageRange' => $population->age_range,
                'male' => $population->male,
                'female' => $population->female,
                'total' => $population->total,
            ]),
            'selectedBarangayId' => $selectedBarangayId,
        ]);
    }

    public function updatePopulation(Request $request, BarangayPopulation $population)
    {
        $validated = $request->validate([
            'male' => ['required', 'integer', 'min:0'],
            'female' => ['required', 'integer', 'min:0'],
        ]);

        $population->update([
            'male' => $validated['male'],
            'female' => $validated['female'],
            'total' => $validated['male'] + $validated['female'],
        ]);

        return back();
    }

    public function destroyPopulation(BarangayPopulation $population)
        {
            if (!$population->id) {
                return back()->with('error', 'Invalid population');
            }

            $population->delete();

            return back()->with('success', 'Population deleted successfully');
        }

}
