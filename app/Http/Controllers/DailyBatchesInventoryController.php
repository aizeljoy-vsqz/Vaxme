<?php

namespace App\Http\Controllers;

use App\Models\DailyBatchesInventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DailyBatchesInventoryController extends Controller
{
    public function Index()
    {
        $daily_vaccine = DailyBatchesInventory::all();
        return Inertia::render('inventory/inventory-vaccine-daily/daily_vaccine_inventory', compact('daily_vaccine'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            'stock_transferred' => ['required', 'integer:strict'],
            'daily_dispense' => ['required', 'integer:strict'],
            'number_of_receipients' => ['required', 'integer:strict'],
            'current_balance' => ['required', 'integer:strict'],
            'vaccine_lose' => ['required', 'integer:strict'],
        ]);
        DailyBatchesInventory::create($request->all());
    }
}
