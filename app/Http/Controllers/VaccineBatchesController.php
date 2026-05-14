<?php

namespace App\Http\Controllers;

use App\Models\DailyBatchesInventory;
use App\Models\VaccineBatch;
use App\Models\Vaccine;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VaccineBatchesController extends Controller
{
    public function Index()
    {
        $vaccines_data = Vaccine::all();
        $vaccine_batches = VaccineBatch::with(['vaccine'])->lazyByIdDesc();
        $date_today = Carbon::now();

        foreach ($vaccine_batches as $vaccine_status) {
            $expired = Carbon::parse($vaccine_status->expiration_date);

            if ($date_today->greaterThan($expired)) {
                $vaccine_batch = VaccineBatch::find($vaccine_status->id);
                $vaccine_batch->status = false;
                $vaccine_batch->save();
            }
        }

        return Inertia::render('inventory/inventory-vaccine-batches/vaccine_batches_inventory', compact('vaccine_batches', 'vaccines_data'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            // 'rhu_id' => 'required',
            'vaccine_id' => ['required',],
            'batch_number' => ['required', Rule::string(), 'unique:vaccine_batches'],
            'stock_receive' => ['required', 'integer'],
            'current_balance' => ['required', 'integer'],
            'expiration_date' => ['required', Rule::date()]
        ]);

        $newVaccineBatch = VaccineBatch::create($request->all());

        DailyBatchesInventory::create([
            'vaccine_batch_id' => $newVaccineBatch->id,
            'stock_transferred' => $newVaccineBatch->current_balance,
            'daily_dispense' => '0',
            'number_of_receipients' => '0',
            'current_balance' =>  $newVaccineBatch->current_balance,
            'vaccine_lose' => '0',
        ]);
    }

    public function Delete(VaccineBatch $delete_vaccine)
    {
        $delete_vaccine->delete();
    }
    public function Update(Request $request, VaccineBatch $update_batch_id)
    {
        $validatedData = $request->validate([
            // 'rhu_id' => 'required',
            'vaccine_id' => ['required',],
            'batch_number' => ['required', Rule::string(), Rule::unique('vaccine_batches')->ignore($update_batch_id->id)],
            'stock_receive' => ['required', 'integer'],
            'current_balance' => ['required', 'integer'],
            'expiration_date' => ['required', Rule::date()]
        ]);
        // Update vaccine batch
        $update_batch_id->update($validatedData);

        // Update related daily inventory
        DailyBatchesInventory::where('vaccine_batch_id', $update_batch_id->id)->update([
            'stock_transferred' => $validatedData['current_balance'],
            'current_balance' => $validatedData['current_balance'],
        ]);
    }
}
