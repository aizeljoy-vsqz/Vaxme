<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Exports\BarangayExport;
use App\Models\Barangay;
use Illuminate\Support\Facades\Schema;
use App\Models\BarangayPopulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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

        $barangayName = $validated['barangay_name'] ?? $request->input('barangay_name');

        if (! $barangayName) {
            return back()->withErrors(['barangay_name' => 'Barangay name is required.'])->withInput();
        }

        $barangay = new Barangay();
        $barangay->nurse_id = $validated['nurse_id'] ?? 0;
        $barangay->barangay_name = (string) $barangayName;
        if (Schema::hasColumn('barangays', 'contact_number')) {
            $barangay->contact_number = $validated['contact_number'] ?? 'N/A';
        }
        $barangay->nurse_assigned = $validated['nurse_assigned'];
        $barangay->save();

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Barangay created successfully',
                'barangay_id' => $barangay->id,
            ], 201);
        }

        return redirect()
        ->route('registration')
        ->with([
            'success' => 'Barangay created successfully',
            'barangay_id' => $barangay->id,
        ]);
    }

    public function storePopulation(Request $request)
    {
        \Log::info('storePopulation request:', [
            'all' => $request->all(),
            'barangay_id' => $request->input('barangay_id'),
            'populations' => $request->input('populations'),
        ]);

        \Log::info('storePopulation db-info', [
            'default_connection' => config('database.default'),
            'current_connection' => DB::getDefaultConnection(),
            'sqlite_database' => config('database.connections.sqlite.database'),
        ]);

        $validated = $request->validate([
            'barangay_id' => ['required', 'integer', 'exists:barangays,id'],
            'populations' => ['required', 'array', 'min:1'],
            'populations.*.age_range' => ['required', 'string'],
            'populations.*.male' => ['required', 'numeric', 'min:0'],
            'populations.*.female' => ['required', 'numeric', 'min:0'],
        ]);

        \Log::info('storePopulation validated:', $validated);

        DB::transaction(function () use ($validated): void {

            BarangayPopulation::query()
                ->where('barangay_id', $validated['barangay_id'])
                ->delete();

            foreach ($validated['populations'] as $pop) {
                $male = (int) ($pop['male'] ?? 0);
                $female = (int) ($pop['female'] ?? 0);

                BarangayPopulation::create([
                    'barangay_id' => $validated['barangay_id'],
                    'age_range' => (string) ($pop['age_range'] ?? ''),
                    'male' => $male,
                    'female' => $female,
                    'total' => $male + $female,
                ]);
            }
        });

        \Log::info('storePopulation success');

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Population saved successfully',
                'barangay_id' => $validated['barangay_id'],
            ], 201);
        }

        return redirect()
            ->route('registration.brgy-details', ['barangay_id' => $validated['barangay_id']])
            ->with('success', 'Saved')
            ->with('barangay_id', $validated['barangay_id']);
        }

    public function update(Request $request, Barangay $barangay)
    {
        
        $validated = $request->validate([
            'barangay_name' => ['required', 'string', 'max:255', 'unique:barangays,barangay_name,' . $barangay->id],
            'nurse_id' => ['nullable', 'integer'],
            'contact_number' => ['nullable', 'string'],
            'nurse_assigned' => ['required', 'string', 'max:255'],
            
        ]);

        $barangay->barangay_name = $validated['barangay_name'];
        $barangay->nurse_assigned = $validated['nurse_assigned'];
        $barangay->contact_number = $validated['contact_number'] ?? 'N/A';

        $barangay->save();

        return redirect()->route('registration')->with('success', 'Barangay updated successfully');
    }

    public function destroy(Barangay $barangay)
    {
        if (!$barangay->id) {
            return back()->with('error', 'Invalid barangay');
        }

        BarangayPopulation::where('barangay_id', $barangay->id)->delete();

        $barangay->delete();

        return back()->with('success', 'Barangay deleted successfully');    
    }

    public function destroyPopulation(BarangayPopulation $population)
    {
        if (! $population->id) {
            return back()->with('error', 'Invalid population record');
        }

        $population->delete();

        return back()->with('success', 'Population record deleted successfully');
    }

    public function export(Request $request)
    {
        $fileName = trim((string) $request->query('file_name', 'barangay_registration_' . now()->format('Y-m-d')));
        $fileName = preg_replace('/[^A-Za-z0-9_\-]+/', '_', $fileName) ?: 'barangay_registration_' . now()->format('Y-m-d');
        $fileName = trim($fileName, '_');
        $fileName = $fileName !== '' ? $fileName : 'barangay_registration_' . now()->format('Y-m-d');

        if (! str_ends_with(strtolower($fileName), '.xlsx')) {
            $fileName .= '.xlsx';
        }

        $barangayId = $request->query('barangay_id');

        return Excel::download(new BarangayExport($barangayId), $fileName);
    }
}