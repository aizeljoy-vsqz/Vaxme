<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Models\Barangay;
use Illuminate\Support\Facades\Schema;
use App\Models\BarangayPopulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Registration_Controller extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('RHU_registration/Registration', [
            'barangays' => Barangay::query()
                ->latest()
                ->get(['id', 'barangay_name', 'nurse_id', 'nurse_assigned', 'contact_number']),
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'barangay_name' => ['required', 'string', 'max:255', 'unique:barangays,barangay_name'],
            'nurse_id' => ['nullable', 'integer'],
            'contact_number' => ['nullable', 'string'],
            'nurse_assigned' => ['required', 'string', 'max:255'],
        ], [
            'barangay_name.required' => 'Barangay name is required.',
            'barangay_name.unique' => 'This barangay already exists.',
            'nurse_assigned.required' => 'Nurse assigned is required.',
        ]);

        // double-check required value present to avoid DB NOT NULL errors
        $barangayName = $validated['barangay_name'] ?? $request->input('barangay_name');

        if (! $barangayName) {
            return back()->withErrors(['barangay_name' => 'Barangay name is required.'])->withInput();
        }

        // create explicitly to avoid any unexpected mass-assignment/filtering
        $barangay = new Barangay();
        $barangay->nurse_id = $validated['nurse_id'] ?? 0;
        $barangay->barangay_name = (string) $barangayName;
        if (Schema::hasColumn('barangays', 'contact_number')) {
            $barangay->contact_number = $validated['contact_number'] ?? 'N/A';
        }
        $barangay->nurse_assigned = $validated['nurse_assigned'];
        $barangay->save();

        // Redirect with flash so Inertia receives the flashed id consistently
        return redirect()->route('registration')->with('barangay_id', $barangay->id)->with('success', 'Barangay created successfully');
    }

    public function storePopulation(Request $request)
    {
        $validated = $request->validate([
            'barangay_id' => ['required', 'integer', 'exists:barangays,id'],
            'populations' => ['required', 'array', 'min:1'],
            'populations.*.age_range' => ['required', 'string', 'distinct'],
            'populations.*.male' => ['required', 'integer', 'min:0'],
            'populations.*.female' => ['required', 'integer', 'min:0'],
        ]);

        DB::transaction(function () use ($validated): void {
            $barangay = Barangay::query()->findOrFail($validated['barangay_id']);

            BarangayPopulation::query()
                ->where('barangay_id', $validated['barangay_id'])
                ->delete();

            foreach ($validated['populations'] as $pop) {
                BarangayPopulation::create([
                    'barangay_id' => $validated['barangay_id'],

                    'age_range' => $pop['age_range'],
                    'male' => $pop['male'],
                    'female' => $pop['female'],
                    'total' => $pop['male'] + $pop['female'],
                ]);
            }
        });

        return redirect()->route('registration.brgy-details', [
            'barangay_id' => $validated['barangay_id'],
        ])->with('success', 'Barangay population saved successfully');
    }
}
