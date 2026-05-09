<?php

namespace App\Http\Controllers;

use App\Models\DailyBatchesInventory;
use App\Models\VaccineBatch;
use App\Models\Vaccine;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VaccineBatchesController extends Controller
{
    public function Index()
    {
        $vaccines_data = Vaccine::all();
        $vaccine_batches = VaccineBatch::with(['vaccine'])->get();
        return Inertia::render('inventory/inventory-vaccine-batches/vaccine_batches_inventory', compact('vaccine_batches', 'vaccines_data'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            // 'rhu_id' => 'required',
            'vaccine_id' => 'required',
            'batch_number' => ['required', Rule::string()],
            'stock_receive' => ['required', 'integer:strict'],
            'current_balance' => ['required', 'integer:strict'],
            'expiration_date' => ['required', Rule::date()]
        ]);

        $newVaccineBatch = VaccineBatch::create($request->all());

        DailyBatchesInventory::create([
            'vaccine_batch_id'=> $newVaccineBatch->id,
            'stock_transferred'=> $newVaccineBatch->current_balance,
            'daily_dispense'=> '0',
            'number_of_receipients'=> '0',
            'current_balance'=>  $newVaccineBatch->current_balance,
            'vaccine_lose'=> '0',
        ]);
    }
}
