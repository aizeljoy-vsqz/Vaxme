<?php

namespace App\Http\Controllers;

use App\Models\DailyBatchesInventory;
use App\Models\Request as ModelsRequest;
use App\Models\VaccineBatch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class VaccineRequestController extends Controller
{

    public function Index(Request $request)
    {

        $rhu = $request->user()->rhu;

        abort_if(!$rhu, 403);

        $requests = ModelsRequest::where('rhu_id', $rhu->id)
            ->with([
                'bhc',
                'batch',
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
            'batch_id' => [
                Rule::requiredIf($requestId->type === 'request'),
                'nullable',
                'exists:vaccine_batches,id',
            ],
        ]);

        if ($requestId->status === 'approved') {
            return back()->withErrors([
                'request' => 'Request is already approved.',
            ]);
        }

        if ($requestId->status === 'rejected') {

            return back()->withErrors([
                'request' => 'Approved requests cannot be rejected.',
            ]);
        }

        DB::transaction(function () use ($validated, $requestId) {

            $quantity = $requestId->items()->count();

            if ($requestId->type === 'request') {

                $batch = VaccineBatch::findOrFail($validated['batch_id']);

                $newBalance = $batch->current_balance - $quantity;

                DailyBatchesInventory::create([
                    'vaccine_batch_id' => $batch->id,

                    'stock_transferred' => 0,

                    'daily_dispense' => $quantity,

                    'number_of_receipients' => $quantity,

                    'current_balance' => $newBalance,

                    'vaccine_lose' => 0,
                ]);

                $batch->update([
                    'current_balance' => $newBalance,
                ]);
            }

            if ($requestId->type === 'return') {

                $batch = VaccineBatch::findOrFail($requestId->batch_id);

                $newBalance = $batch->current_balance + $quantity;

                DailyBatchesInventory::create([
                    'vaccine_batch_id' => $batch->id,

                    'stock_transferred' => $quantity,

                    'daily_dispense' => 0,

                    'number_of_receipients' => 0,

                    'current_balance' => $newBalance,

                    'vaccine_lose' => 0,
                ]);

                $batch->update([
                    'current_balance' => $newBalance,
                ]);
            }

            $requestId->update([
                'status' => 'approved',
                'batch_id' => $validated['batch_id'] ?? $requestId->batch_id,
            ]);
        });


        return back();
    }

    public function reject(Request $request, ModelsRequest $requestId)
    {

        $validated = $request->validate([
            'rejection_reason' => [
                'required',
                'string',
                'max:500',
            ],
        ]);

        if ($requestId->status === 'approved') {

            return back()->withErrors([
                'request' => 'Approved requests cannot be rejected.',
            ]);
        }

        if ($requestId->status === 'rejected') {

            return back()->withErrors([
                'request' => 'Request is already rejected.',
            ]);
        }

        $requestId->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason'],
        ]);

        // if ($requestId->status === 'rejected') {
        //     return back()->withErrors([
        //         'request' => 'Request is already rejected.',
        //     ]);
        // }

        // $requestId->update([
        //     'status' => 'rejected',
        // ]);

        // return back();
    }
}
