<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Models\Barangay;
use App\Models\BarangayPopulation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class Registration_Controller extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('RHU_registration/Registration', [
            'barangays' => Barangay::query()
                ->latest()
                ->get(['id', 'user_id', 'rhu_id', 'name', 'nurse_assigned']),
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:barangays,name'],
            'nurse_assigned' => ['required', 'string', 'max:255'],
            'rhu_id' => ['nullable', 'integer'],
        ], [
            'name.required' => 'Barangay name is required.',
            'name.unique' => 'This barangay already exists.',
            'nurse_assigned.required' => 'Nurse assigned is required.',
        ]);

        Barangay::create([
            'user_id' => $request->user()?->id,
            'rhu_id' => $validated['rhu_id'] ?? null,
            'name' => $validated['name'],
            'nurse_assigned' => $validated['nurse_assigned'],
        ]);

        return back()->withErrors($validated)->withInput();
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

    $barangay = Barangay::query()->find($validated['barangay_id']);

    foreach ($validated['populations'] as $pop) {
        BarangayPopulation::create([
            'barangay_id' => $validated['barangay_id'],
            'user_id' => $barangay?->user_id,
            'rhu_id' => $barangay?->rhu_id,
            'age_range' => $pop['age_range'],
            'male' => $pop['male'],
            'female' => $pop['female'],
            'total' => $pop['male'] + $pop['female'],
        ]);
    }

    return redirect()->route('registration');
    }
}
