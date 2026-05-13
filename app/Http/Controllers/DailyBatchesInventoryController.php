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
        $vaccine_name = VaccineBatch::with(['vaccine'])->findOrFail($id)->vaccine->name;

        return Inertia::render('inventory/inventory-vaccine-daily/daily_vaccine_inventory', compact(['batch_id', 'daily_inventory','vaccine_name']));
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
    public function Update(Request $request, DailyBatchesInventory $update_daily_inventory)
    {
        $validateData = $request->validate([
            'stock_transferred' => ['required', 'integer'],
            'daily_dispense' => ['required', 'integer'],
            'number_of_receipients' => ['required', 'integer'],
            'vaccine_lose' => ['required', 'integer'],
        ]);

        $update_daily_inventory->update($validateData);

    }
}
