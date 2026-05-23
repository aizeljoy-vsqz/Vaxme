<?php

namespace App\Http\Controllers;

use App\Models\DailyBatchesInventory;
use App\Models\User;
use App\Models\VaccineBatch;
use App\Models\Vaccine;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VaccineBatchesController extends Controller
{
    public function Index(Request $request)
    {
        $user = $request->user();
        $rhu = $user->rhu;

        $rhu_id = $rhu->id;

        $rhu_vaccines_batches = $rhu->vaccineBatches()
            ->with(['vaccine', 'dailyVaccine'])
            ->get();

        $vaccines_data = $rhu->vaccines;

        foreach ($rhu_vaccines_batches as $batch) {

            if (now()->greaterThan($batch->expiration_date)) {
                $batch->update(['status' => false]);
            } else {
                $batch->update(['status' => true]);
            }
        }

        return Inertia::render(
            'inventory/inventory-vaccine-batches/vaccine_batches_inventory',
            compact('rhu_id', 'rhu_vaccines_batches', 'vaccines_data')
        );
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
            'vaccine_id' => ['required'],
            'batch_number' => ['required', 'string'],
            'stock_receive' => ['required', 'integer'],
            'expiration_date' => ['required', 'date']
        ]);

        $update_batch_id->update([
            'vaccine_id' => $validatedData['vaccine_id'],
            'batch_number' => $validatedData['batch_number'],
            'expiration_date' => $validatedData['expiration_date'],
        ]);

        // first inventory row = original stock receive
        $firstDaily = $update_batch_id->dailyVaccine()
            ->orderBy('id')
            ->first();

        if ($firstDaily) {

            // update original receive
            $firstDaily->update([
                'stock_transferred' => $validatedData['stock_receive'],
            ]);

            // recalculate ALL balances
            $inventories = $update_batch_id->dailyVaccine()
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

            // sync latest balance to batch
            $update_batch_id->update([
                'stock_receive' => $validatedData['stock_receive'],
                'current_balance' => $runningBalance,
            ]);
        }

        return back();
    }
}
