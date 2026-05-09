<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use App\Models\RequestItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RequestController extends Controller
{
    public function addRequest(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'status' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
            'items.*.vaccine' => 'required|string',
        ]);

        // Build pairs from request
        $inputPairs = collect($validated['items'])
            ->map(fn($item) => 'name: ' . strtolower($item['name']) . ' | ' . 'vaccine: ' . strtolower($item['vaccine']))
            ->unique()
            ->values();

        // Get existing DB pairs in ONE query
        $existing = RequestItem::all()
            ->map(fn($item) => 'name: ' . strtolower($item->name) . ' | ' . 'vaccine: ' . strtolower($item->vaccine))
            ->toArray();

        // Find duplicates
        $duplicates = $inputPairs->filter(fn($pair) => in_array($pair, $existing));

        if ($duplicates->isNotEmpty()) {
            throw ValidationException::withMessages([
                'items' => '' . $duplicates->implode('')
            ]);
        }

        DB::transaction(function () use ($validated) {

            $req = ModelsRequest::create([
                'type' => $validated['type'],
                'status' => $validated['status'],
            ]);

            $req->items()->createMany($validated['items']);
        });

        return back();
    }
}
