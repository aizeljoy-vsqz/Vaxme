<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Request as ModelsRequest;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReturnVaccineController extends Controller
{
    public function index()
    {
        $requests = ModelsRequest::with(['items'])
            ->where('type', 'request')
            ->whereHas('items', function ($query) {
                $query->where('is_vaccinated', false);
            })
            ->get();

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
            'items.*.vaccine' => 'required|string',
        ]);

        DB::transaction(function () use ($validated, $request) {

            $original = ModelsRequest::findOrFail($validated['request_id']);

            // 1. Create return request
            $returnRequest = ModelsRequest::create([
                'bhc_id' => $original->bhc_id,
                'rhu_id' => $original->rhu_id,
                'type' => 'return',
                'status' => 'submitted',
            ]);

            // 2. Insert unused items
            $returnRequest->items()->createMany(
                collect($validated['items'])->map(fn($item) => [
                    'name' => $item['name'],
                    'vaccine' => $item['vaccine'],
                    'is_vaccinated' => false,
                ])->toArray()
            );
        });

        return back();
    }
}
