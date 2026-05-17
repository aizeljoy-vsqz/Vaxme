<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use App\Models\RequestItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RequestController extends Controller
{
    public function addRequest(Request $request)
    {
        $user = $request->user()->bhc->id;

        $validated = $request->validate([
            'type' => 'required|string',
            'status' => 'required|string',
            'vaccine' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
        ]);

        $items = collect($validated['items'])->map(function ($item) use ($validated) {
            return [
                'name' => $item['name'],
                'vaccine' => $validated['vaccine'], // 🔥 APPLY GLOBAL VALUE
            ];
        });

        $duplicates = collect($validated['items'])
            ->map(function ($item) use ($validated) {
                return [
                    'name' => strtolower($item['name']),
                    'vaccine' => strtolower($validated['vaccine']),
                ];
            })
            ->filter(function ($pair) {
                return RequestItem::where('name', $pair['name'])
                    ->where('vaccine', $pair['vaccine'])
                    ->exists();
            });

        if ($duplicates->isNotEmpty()) {
            throw ValidationException::withMessages([
                'items' => $duplicates
                    ->map(
                        fn($d) =>
                        ucfirst($d['name']) . ' is already registered or vaccinated for ' . ucfirst($d['vaccine'])
                    )
                    ->implode("\n"),
            ]);
        }


        DB::transaction(function () use ($validated, $user, $items) {

            $req = ModelsRequest::create([
                'bhc_id' => $user,
                'rhu_id' => 1,
                'type' => $validated['type'],
                'status' => $validated['status'],
            ]);

            $req->items()->createMany($items->toArray());
        });

        return back();
    }
}
