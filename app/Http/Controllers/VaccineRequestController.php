<?php

namespace App\Http\Controllers;

use App\Models\Request as ModelsRequest;
use App\Models\VaccineBatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VaccineRequestController extends Controller
{
    public function Index(Request $request)
    {

        $rhu = $request->user()->rhu;

        abort_if(!$rhu, 403);

        $requests = ModelsRequest::where('rhu_id', $rhu->id)
            ->with([
                'bhc',
                'items.vaccine',
            ])
            ->latest()
            ->get();

        $batches = VaccineBatch::where('rhu_id', $rhu->id)
            ->with('vaccine')
            ->latest()
            ->get();

        return Inertia::render('rhu-vaccine-request/vaccine-request', [
            'requests' => $requests,
            'batches' => $batches,

        ]);
    }

    public function approve(Request $request, ModelsRequest $requestId)
    {
        $validated = $request->validate([
            'batch_id' => ['nullable', 'exists:vaccine_batches,id'],
        ]);

        if ($requestId->type === 'request') {
            $requestId->update([
                'status' => 'approved',
                'batch_id' => $validated['batch_id'],
            ]);
        } else {
            $requestId->update([
                'status' => 'approved',
            ]);
        }


        return back();
    }
}
