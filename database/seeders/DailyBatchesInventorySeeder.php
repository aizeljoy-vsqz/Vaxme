<?php

namespace Database\Seeders;

use App\Models\DailyBatchesInventory;
use App\Models\Vaccine;
use App\Models\VaccineBatch;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DailyBatchesInventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vaccines = Vaccine::with('vaccineBatch')->get();

        if ($vaccines->isEmpty()) {
            $this->command->info("No vaccines found. Seeder stopped.");
            return;
        }

        foreach ($vaccines as $vaccine) {

            if ($vaccine->vaccineBatch->isEmpty()) {
                continue;
            }

            foreach ($vaccine->vaccineBatch as $batch) {

                for ($month = 1; $month <= 12; $month++) {

                    DailyBatchesInventory::create([
                        'vaccine_batch_id' => $batch->id,
                        'stock_transferred' => rand(0, 50),
                        'daily_dispense' => rand(20, 100),
                        'number_of_receipients' => rand(20, 100),
                        'current_balance' => rand(200, 1000),
                        'vaccine_lose' => rand(0, 5),

                        // force fake monthly distribution
                        'created_at' => Carbon::create(2026, $month, rand(1, 28)),
                        'updated_at' => Carbon::create(2026, $month, rand(1, 28)),
                    ]);
                }
            }
        }

        $this->command->info("Seeded ALL vaccines with monthly inventory data (2026).");
    }
}
