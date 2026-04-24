<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Models\Barangay;
use App\Models\BarangayPopulation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Registration_Controller extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('RHU_registration/Registration', [
            'barangays' => Barangay::query()
                ->latest()
                ->get(['id', 'name', 'contact_name', 'contact_number']),
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:barangays,name',
            'contact_name' => 'required',
            'contact_number' => 'required',
        ]);

        Barangay::create($validated);

        return redirect()->route('registration');
    }

    public function storePopulation(Request $request)
    {
    $validated = $request->validate([
        'barangay_id' => ['required', 'integer', 'exists:barangays,id'],
        'populations' => ['required', 'array'],
        'populations.*.age_range' => ['required', 'string'],
        'populations.*.male' => ['required', 'integer', 'min:0'],
        'populations.*.female' => ['required', 'integer', 'min:0'],
    ]);

    foreach ($validated['populations'] as $pop) {
        BarangayPopulation::create([
            'barangay_id' => $validated['barangay_id'],
            'age_range' => $pop['age_range'],
            'male' => $pop['male'],
            'female' => $pop['female'],
            'total' => $pop['male'] + $pop['female'],
        ]);
    }

    return redirect()->route('registration');
    }
}
