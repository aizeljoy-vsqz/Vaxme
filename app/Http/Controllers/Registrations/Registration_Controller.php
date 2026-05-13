<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Exports\BarangayExport;
use App\Models\Barangay;
use App\Models\BarangayPopulation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

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
            'contact_number' => ['nullable', 'string', 'max:50'],
            'nurse_assigned' => ['required', 'string', 'max:255'],
        ], [
            'barangay_name.required' => 'Barangay name is required.',
            'barangay_name.unique' => 'This barangay already exists.',
            'nurse_assigned.required' => 'Nurse assigned is required.',
        ]);

        try {
            $created = DB::transaction(function () use ($request, $validated): array {
                $user = $request->user();
                
                if (! $user) {
                    throw ValidationException::withMessages([
                        'auth' => 'You must be authenticated to register a barangay.',
                    ]);
                }

                // Auto-create RHU if user doesn't have one
                $rhu = $user->rhu;
                if (! $rhu) {
                    $rhu = $user->rhu()->create([
                        'facility_name' => $user->name . ' RHU',
                        'address' => 'To be updated',
                        'nurse_assigned' => $user->name,
                    ]);
                }

                $temporaryPassword = Str::random(16);
                $emailPrefix = Str::slug($validated['barangay_name']) ?: 'barangay';
                $generatedEmail = sprintf(
                    'bhc-%s-%s@generated.local',
                    $emailPrefix,
                    Str::lower((string) Str::ulid())
                );

                $user = User::create([
                    'name' => $validated['nurse_assigned'],
                    'email' => $generatedEmail,
                    'password' => Hash::make($temporaryPassword),
                ]);

                $bhc = $rhu->bhcs()->create([
                    'user_id' => $user->id,
                ]);

                $barangay = $bhc->barangays()->create([
                    'barangay_name' => $validated['barangay_name'],
                    'nurse_id' => $validated['nurse_id'] ?? 0,
                    'nurse_assigned' => $validated['nurse_assigned'],
                    'contact_number' => filled($validated['contact_number'] ?? null)
                        ? $validated['contact_number']
                        : 'N/A',
                ]);

                return [
                    'user' => $user,
                    'bhc' => $bhc,
                    'barangay' => $barangay,
                    'temporary_password' => $temporaryPassword,
                ];
            });
        } catch (Throwable $throwable) {
            if ($throwable instanceof ValidationException) {
                throw $throwable;
            }

            report($throwable);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to register barangay at this time.',
                ], 500);
            }

            return back()
                ->withErrors(['registration' => 'Unable to register barangay at this time.'])
                ->withInput();
        }

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Barangay created successfully.',
                'barangay_id' => $created['barangay']->id,
                'bhc_id' => $created['bhc']->id,
                'user_id' => $created['user']->id,
                'generated_user' => [
                    'email' => $created['user']->email,
                    'temporary_password' => $created['temporary_password'],
                ],
            ], 201);
        }

        return redirect()
            ->route('registration')
            ->with([
                'success' => 'Barangay created successfully.',
                'barangay_id' => $created['barangay']->id,
                'bhc_id' => $created['bhc']->id,
                'user_id' => $created['user']->id,
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