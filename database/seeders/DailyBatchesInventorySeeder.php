<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\VaccineBatch;
use App\Models\DailyBatchesInventory;

class DailyBatchesInventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $batches = VaccineBatch::all();

        $currentYear = now()->year;

        $currentMonth = now()->month;

        foreach ($batches as $batch) {

            $remainingBalance = $batch->stock_receive;

            /*
            |--------------------------------------------------------------------------
            | Generate records from January until current month
            |--------------------------------------------------------------------------
            */

            for ($month = 1; $month <= $currentMonth; $month++) {

                $dailyDispense = rand(5, 25);

                $vaccineLose = rand(0, 5);

                $stockTransferred = rand(0, 20);

                $recipients = rand(1, 20);

                $remainingBalance =
                    $remainingBalance
                    - $dailyDispense
                    - $vaccineLose;

                /*
                |--------------------------------------------------------------------------
                | Prevent negative balance
                |--------------------------------------------------------------------------
                */

                if ($remainingBalance < 0) {
                    $remainingBalance = rand(10, 50);
                }

                DailyBatchesInventory::create([

                    'vaccine_batch_id' => $batch->id,

                    'stock_transferred' => $stockTransferred,

                    'daily_dispense' => $dailyDispense,

                    'number_of_receipients' => $recipients,

                    'current_balance' => $remainingBalance,

                    'vaccine_lose' => $vaccineLose,

                    'created_at' => Carbon::create(
                        $currentYear,
                        $month,
                        rand(1, 28)
                    ),

                    'updated_at' => Carbon::create(
                        $currentYear,
                        $month,
                        rand(1, 28)
                    ),
                ]);
            }
        }
    }
}