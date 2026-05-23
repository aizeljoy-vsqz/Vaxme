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
        // Frontend now sends bhc_id; barangay_id remains accepted for backward compatibility.
        $selectedBhcId = $request->query('bhc_id', $request->query('barangay_id'));
        $user = $request->user();

        $query = BarangayPopulation::query();

        if ($user && $user->rhu) {
            $rhuId = $user->rhu->id;

            $query->whereHas('bhc.rhu', function ($bhcQuery) use ($rhuId): void {
                $bhcQuery->whereKey($rhuId);
            });
        } elseif ($user && $user->bhc && ($user->user_type ?? '') === 'barangay') {
            // Barangay users only see their own BHC's populations
            $query->where('bhc_id', $user->bhc->id);
        } else {
            $query->whereRaw('1 = 0');
        }

        $query->with([
            'bhc:id,rhu_id,barangay_name',
            'bhc.rhu:id',
        ])->latest();

        if ($selectedBhcId) {
            $query->where('bhc_id', $selectedBhcId);
        }

        return Inertia::render('RHU_registration/Barangay_Details/Barangay-Detail', [
            'populations' => $query->get()->map(fn ($population) => [
                'id' => (string) $population->id,
                'barangayName' => $population->bhc?->barangay_name,
                'ageRange' => $population->age_range,
                'male' => $population->male,
                'female' => $population->female,
                'total' => $population->total,
            ]),
            'selectedBarangayId' => $selectedBhcId,
        ]);
    }

    public function updatePopulation(Request $request, BarangayPopulation $population)
    {
        $user = $request->user();

        if (! $user || ! $user->canAccessBhc($population->bhc_id)) {
            abort(403);
        }

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
        $user = request()->user();

        if (! $user || ! $user->canAccessBhc($population->bhc_id)) {
            abort(403);
        }

        if (!$population->id) {
            return back()->with('error', 'Invalid population');
        }

        $population->delete();

        return back()->with('success', 'Population deleted successfully');
    }

}
