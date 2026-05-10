<?php

namespace App\Http\Controllers;

use App\Models\DailyBatchesInventory;
use App\Models\VaccineBatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DailyBatchesInventoryController extends Controller
{
    public function Index($id)
    {
        $batch_id = $id;
        $daily_inventory = VaccineBatch::with(['dailyVaccine'])->findOrFail($id);
        return Inertia::render('inventory/inventory-vaccine-daily/daily_vaccine_inventory', compact(['batch_id', 'daily_inventory']));
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
        DailyBatchesInventory::create($request->all());
    }

    public function Delete(DailyBatchesInventory $daily_inventory_id)
    {
        $daily_inventory_id->delete();
    }
}
