<?php

namespace App\Http\Controllers;

use App\Models\DailyBatchesInventory;
use App\Models\VaccineBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DailyBatchesInventoryController extends Controller
{
    public function Index(int $id)
    {
        $batch_id = $id;
        $daily_inventory = VaccineBatch::with(['dailyVaccine'])->findOrFail($id);
        $daily_inventory = $daily_inventory->dailyVaccine()->lazyByIdDesc();
        $selected_vaccine_batch = VaccineBatch::with(['dailyVaccine'])->findOrFail($id);
        $vaccine_name = VaccineBatch::with(['vaccine'])->findOrFail($id)->vaccine->name;

        return Inertia::render('inventory/inventory-vaccine-daily/daily_vaccine_inventory', compact(['batch_id', 'daily_inventory', 'vaccine_name', 'selected_vaccine_batch']));
    }

    public function Store(Request $request)
    {
        $request->validate([
            'stock_transferred' => ['required', 'integer'],
            'daily_dispense' => ['required', 'integer'],
            'number_of_receipients' => ['required', 'integer'],
            'current_balance' => ['required', 'integer'],
            'vaccine_lose' => ['required', 'integer'],
        ]);

        DB::transaction(function () use ($request) {

            $batch = VaccineBatch::findOrFail($request->vaccine_batch_id);

            $lastBalance = $batch->dailyVaccine()
                ->latest('id')
                ->value('current_balance') ?? 0;

            $stock_transferred = $request->stock_transferred;
            $daily_dispense = $request->daily_dispense;
            $vaccine_lose = $request->vaccine_lose;

            $newBalance = $lastBalance + $stock_transferred - $daily_dispense - $vaccine_lose;

            DailyBatchesInventory::create([
                'vaccine_batch_id' => $batch->id,
                'stock_transferred' => $stock_transferred,
                'daily_dispense' => $daily_dispense,
                'number_of_receipients' => $request->number_of_receipients,
                'vaccine_lose' => $vaccine_lose,
                'current_balance' => $newBalance,
            ]);

            $batch->update([
                'current_balance' => $newBalance,
            ]);
        });

        return back();
    }

    public function Delete(DailyBatchesInventory $daily_inventory_id)
    {
        $daily_inventory_id->delete();
    }
    public function Update(Request $request, DailyBatchesInventory $update_daily_inventory)
{
    $validatedData = $request->validate([
        'stock_transferred' => ['required', 'integer'],
        'daily_dispense' => ['required', 'integer'],
        'number_of_receipients' => ['required', 'integer'],
        'vaccine_lose' => ['required', 'integer'],
    ]);

    DB::transaction(function () use ($validatedData, $update_daily_inventory) {

        // update edited row first
        $update_daily_inventory->update([
            'stock_transferred' => $validatedData['stock_transferred'],
            'daily_dispense' => $validatedData['daily_dispense'],
            'number_of_receipients' => $validatedData['number_of_receipients'],
            'vaccine_lose' => $validatedData['vaccine_lose'],
        ]);

        $batch = VaccineBatch::findOrFail(
            $update_daily_inventory->vaccine_batch_id
        );

        // get all rows ordered oldest -> newest
        $inventories = $batch->dailyVaccine()
            ->orderBy('id')
            ->get();

        $runningBalance = 0;

        foreach ($inventories as $inventory) {

            $runningBalance =
                $runningBalance
                + $inventory->stock_transferred
                - $inventory->daily_dispense
                - $inventory->vaccine_lose;

            $inventory->update([
                'current_balance' => $runningBalance,
            ]);
        }

        // update batch current balance
        $batch->update([
            'current_balance' => $runningBalance,
        ]);
    });

    return back();
}
}
