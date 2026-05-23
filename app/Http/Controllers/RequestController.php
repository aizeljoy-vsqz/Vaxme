<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use App\Models\RequestItem;
use App\Models\Vaccine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class RequestController extends Controller
{

    public function index(Request $request)
    {
        $bhc = $request->user()->bhc;

        abort_if(!$bhc, 403);

        $vaccines = $bhc->rhu->vaccines;

        return Inertia::render('bhu_module/request_vaccine', [
            'vaccines' => $vaccines,
        ]);
    }

    public function addRequest(Request $request)
    {
        $user = $request->user()->bhc;

        $validated = $request->validate([
            'type' => 'required|string',
            'status' => 'required|string',
            'vaccine' => 'required|exists:vaccines,id',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
        ]);

        $items = collect($validated['items'])->map(function ($item) use ($validated) {
            return [
                'name' => $item['name'],
                'vaccine_id' => $validated['vaccine'],
            ];
        });

        $duplicates = collect($validated['items'])
            ->map(function ($item) use ($validated) {
                return [
                    'name' => strtolower($item['name']),
                    'vaccine_id' => $validated['vaccine'],
                ];
            })
            ->filter(function ($pair) {
                return RequestItem::where('name', $pair['name'])
                    ->where('vaccine_id', $pair['vaccine_id'])
                    ->exists();
            });

        $vaccine = Vaccine::find($validated['vaccine']);
        if ($duplicates->isNotEmpty()) {
            throw ValidationException::withMessages([
                'items' => $duplicates
                    ->map(
                        fn($d) =>
                        ucfirst($d['name']) . ' is already registered for ' . $vaccine->name
                    )
                    ->implode("\n"),
            ]);
        }


        DB::transaction(function () use ($validated, $user, $items) {

            $req = ModelsRequest::create([
                'bhc_id' => $user->id,
                'rhu_id' => $user->rhu_id,
                'type' => $validated['type'],
                'status' => $validated['status'],
            ]);

            $req->items()->createMany($items->toArray());
        });

        return back();
    }
}
