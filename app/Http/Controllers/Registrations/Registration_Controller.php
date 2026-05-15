<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use App\Exports\BarangayExport;
use App\Models\Bhc;
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
        $user = $request->user();

        if ($user && $user->bhc && ($user->user_type ?? '') === 'barangay') {
            $items = Bhc::query()
                ->where('id', $user->bhc->id)
                ->with(['rhu:id'])
                ->latest()
                ->get(['id', 'rhu_id', 'barangay_name', 'nurse_assigned', 'contact_number']);
        } else {
            $rhuId = $user?->rhu?->id;

            $query = Bhc::query();

            if ($rhuId) {
                $query->where('rhu_id', $rhuId);
            } else {
                $query->whereRaw('1 = 0');
            }

            $items = $query
                ->with([
                    'rhu:id',
                ])
                ->latest()
                ->get(['id', 'rhu_id', 'barangay_name', 'nurse_assigned', 'contact_number']);
        }

        return Inertia::render('RHU_registration/Registration', [
            'barangays' => $items,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'barangay_name' => ['required', 'string', 'max:255', 'unique:bhcs,barangay_name'],
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

                $rhu = $user->rhu;
                if (! $rhu) {
                    $rhu = $user->rhu()->create([
                        'facility_name' => $user->name . ' RHU',
                        'address' => 'To be updated',
                        'nurse_assigned' => $user->name,
                    ]);
                }

                $temporaryPassword = 'password';

                $emailPrefix = Str::lower(
                    Str::slug($validated['nurse_assigned'], '')
                );

                $generatedEmail = $emailPrefix . '@barangay.bhc.ph';

                $user = User::create([
                    'name' => $validated['nurse_assigned'],
                    'email' => $generatedEmail,
                    'password' => Hash::make($temporaryPassword),
                    'user_type' => 'barangay',
                    'is_first_login' => true,
                ]);

                $bhc = Bhc::create([
                    'rhu_id' => $rhu->id,
                    'user_id' => $user->id,
                    'barangay_name' => $validated['barangay_name'],
                    'nurse_assigned' => $validated['nurse_assigned'],
                    'contact_number' => filled($validated['contact_number'] ?? null)
                        ? $validated['contact_number']
                        : 'N/A',
                ]);

                return [
                    'user' => $user,
                    'bhc' => $bhc,
                    'temporary_password' => $temporaryPassword,
                ];
            });
        } catch (Throwable $throwable) {
            if ($throwable instanceof ValidationException) {
                throw $throwable;
            }

            // Log the actual error for debugging
            report($throwable);
            \Log::error('Barangay registration failed:', [
                'error' => $throwable->getMessage(),
                'exception' => get_class($throwable),
                'file' => $throwable->getFile(),
                'line' => $throwable->getLine(),
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unable to register barangay at this time.',
                    'debug_error' => config('app.debug') ? $throwable->getMessage() : null,
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
                'barangay_id' => $created['bhc']->id,
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
                'barangay_id' => $created['bhc']->id,
                'bhc_id' => $created['bhc']->id,
                'user_id' => $created['user']->id,
            ]);
    }

    public function storePopulation(Request $request)
    {
        $validated = $request->validate([
            'bhc_id' => ['nullable', 'integer', 'exists:bhcs,id'],
            'barangay_id' => ['nullable', 'integer', 'exists:bhcs,id'],
            'populations' => ['required', 'array', 'min:1'],
            'populations.*.age_range' => ['required', 'string'],
            'populations.*.male' => ['required', 'numeric', 'min:0'],
            'populations.*.female' => ['required', 'numeric', 'min:0'],
        ]);

        $user = $request->user();
        $bhcId = (int) ($validated['bhc_id'] ?? $validated['barangay_id'] ?? 0);

        if (! $user || ! $user->canAccessBhc($bhcId)) {
            abort(403);
        }

        DB::transaction(function () use ($bhcId, $validated): void {

            BarangayPopulation::query()
                ->where('bhc_id', $bhcId)
                ->delete();

            foreach ($validated['populations'] as $pop) {
                $male = (int) ($pop['male'] ?? 0);
                $female = (int) ($pop['female'] ?? 0);

                BarangayPopulation::create([
                    'bhc_id' => $bhcId,
                    'age_range' => (string) ($pop['age_range'] ?? ''),
                    'male' => $male,
                    'female' => $female,
                    'total' => $male + $female,
                ]);
            }
        });

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Population saved successfully',
                'barangay_id' => $bhcId,
            ], 201);
        }

        return redirect()
            ->route('registration.brgy-details', ['barangay_id' => $bhcId])
            ->with('success', 'Saved')
            ->with('barangay_id', $bhcId);
        }

    public function update(Request $request, Bhc $bhc)
    {
        $user = $request->user();

        if (! $user || ! $user->canAccessBhc($bhc->id)) {
            abort(403);
        }

        
        $validated = $request->validate([
            'barangay_name' => ['required', 'string', 'max:255', 'unique:bhcs,barangay_name,' . $bhc->id],
            'contact_number' => ['nullable', 'string'],
            'nurse_assigned' => ['required', 'string', 'max:255'],
            
        ]);

        $bhc->barangay_name = $validated['barangay_name'];
        $bhc->nurse_assigned = $validated['nurse_assigned'];
        $bhc->contact_number = $validated['contact_number'] ?? 'N/A';

        $bhc->save();

        // Keep linked user (nurse) in sync with the BHC record.
        $bhc->loadMissing('user');

        if ($bhc->user) {
            $user = $bhc->user;

            if (isset($validated['nurse_assigned']) && $user->name !== $validated['nurse_assigned']) {
                // Update name
                $user->name = $validated['nurse_assigned'];

                // Regenerate email based on nurse name and ensure uniqueness
                $emailPrefix = Str::lower(Str::slug($validated['nurse_assigned'], ''));
                $base = $emailPrefix ?: 'user';
                $candidate = $base . '@barangay.bhc.ph';
                $i = 1;

                while (User::where('email', $candidate)->where('id', '!=', $user->id)->exists()) {
                    $candidate = $base . '-' . $i . '@barangay.bhc.ph';
                    $i++;
                }

                $user->email = $candidate;
                $user->save();
            }
        }

        return redirect()->route('registration')->with('success', 'Barangay updated successfully');
    }

    public function destroy(Bhc $bhc)
    {
        $user = request()->user();

        if (! $user || ! $user->canAccessBhc($bhc->id)) {
            abort(403);
        }

        if (! $bhc->id) {
            return back()->with('error', 'Invalid barangay');
        }

        DB::transaction(function () use ($bhc) {

            BarangayPopulation::where('bhc_id', $bhc->id)->delete();

            $bhc->loadMissing('user');

            if ($bhc->user) {
                $bhc->user->delete();
            }

            $bhc->delete();
        });

        return back()->with('success', 'Barangay, related account, and population deleted successfully');
    }

    public function destroyPopulation(BarangayPopulation $population)
    {
        $user = request()->user();

        if (! $user || ! $user->canAccessBhc((int) $population->bhc_id)) {
            abort(403);
        }

        if (! $population->id) {
            return back()->with('error', 'Invalid population record');
        }

        $population->delete();

        return back()->with('success', 'Population record deleted successfully');
    }

    public function export(Request $request)
    {
        $rhuId = $request->user()?->rhu?->id;

        $fileName = trim((string) $request->query('file_name', 'barangay_registration_' . now()->format('Y-m-d')));
        $fileName = preg_replace('/[^A-Za-z0-9_\-]+/', '_', $fileName) ?: 'barangay_registration_' . now()->format('Y-m-d');
        $fileName = trim($fileName, '_');
        $fileName = $fileName !== '' ? $fileName : 'barangay_registration_' . now()->format('Y-m-d');

        if (! str_ends_with(strtolower($fileName), '.xlsx')) {
            $fileName .= '.xlsx';
        }

        $barangayId = $request->query('bhc_id', $request->query('barangay_id'));
        $user = $request->user();

        if ($barangayId) {
            if (! $user || ! $user->canAccessBhc((int) $barangayId)) {
                abort(403);
            }
        } else {
            if ($user && $user->bhc && ($user->user_type ?? '') === 'barangay') {
                $barangayId = $user->bhc->id;
            }
        }

        $rhuId = $user?->rhu?->id;

        return Excel::download(new BarangayExport($barangayId, $rhuId), $fileName);
    }
}