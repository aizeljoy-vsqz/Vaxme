<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use App\Models\RequestItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    $duplicates = [];

    foreach ($validated['items'] as $item) {

        $exists = RequestItem::where('name', $item['name'])
            ->where('vaccine', $item['vaccine'])
            ->exists();

        if ($exists) {
            $duplicates[] = "{$item['name']} already has {$item['vaccine']}";
        }
    }

    // stop execution if duplicates found
    if (!empty($duplicates)) {
        return back()->withErrors([
            'items' => $duplicates
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
