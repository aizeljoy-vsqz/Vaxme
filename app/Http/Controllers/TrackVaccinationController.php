<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use App\Models\RequestItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackVaccinationController extends Controller
{
    public function index()
    {
        $requests = ModelsRequest::with('items')->lazyByIdDesc();
        return Inertia::render('bhu_module/track_vaccine', compact(['requests']));
    }

    public function updateVaccinationStatus(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
        ]);

        foreach ($validated['items'] as $item) {

            RequestItem::where('id', $item['id'])->update(['is_vaccinated' => $item['is_vaccinated']]);

        }

        // return redirect()->back();
    }
}
