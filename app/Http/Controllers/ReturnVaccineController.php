<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as ModelsRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ReturnVaccineController extends Controller
{
    public function index()
    {

        $user = Auth::user();
        $bhc = $user->bhc;

        $requests = $bhc->requests()
            ->with(['items.vaccine'])
            ->where('type', 'request')
            ->where('status', 'approved')
            ->whereHas('items', function ($query) {
                $query->where('is_vaccinated', false);
            })
            ->get()
            ->map(function ($request) {

                $request->is_returned = ModelsRequest::where('type', 'return')
                    ->where('original_request_id', $request->id)
                    ->exists();

                return $request;
            });

        return Inertia::render('bhu_module/return_vaccine', [
            'requests' => $requests,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'request_id' => 'required|exists:requests,id',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
            'items.*.vaccine_id' => 'required|exists:vaccines,id',
        ]);

        DB::transaction(function () use ($validated, $request) {

            $original = ModelsRequest::findOrFail($validated['request_id']);

            $exists = ModelsRequest::where('type', 'return')
                ->where('original_request_id', $original->id)
                ->exists();

            if ($exists) {
                throw ValidationException::withMessages([
                    'request_id' => 'You have already submitted a return for this vaccine request.',
                ]);
            }

            $returnRequest = ModelsRequest::create([
                'bhc_id' => $original->bhc_id,
                'rhu_id' => $original->rhu_id,
                'batch_id' => $original->batch_id,
                'type' => 'return',
                'status' => 'submitted',
                'original_request_id' => $original->id,
            ]);

            $returnRequest->items()->createMany(
                collect($validated['items'])->map(fn($item) => [
                    'name' => $item['name'],
                    'vaccine_id' => $item['vaccine_id'],
                    'is_vaccinated' => false,
                ])->toArray()
            );
        });

        return back();
    }
}
