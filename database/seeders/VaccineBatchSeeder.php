<?php

namespace Database\Seeders;

use App\Models\Vaccine;
use App\Models\VaccineBatch;
use Illuminate\Database\Seeder;

class VaccineBatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $vaccines = Vaccine::all();

        foreach ($vaccines as $vaccine) {

            for ($i = 1; $i <= 3; $i++) {

                $stockReceived = rand(100, 300);

                $dailyDispense = rand(5, 20);

                $vaccineLose = rand(0, 5);

                $currentBalance =
                    $stockReceived
                    - $dailyDispense
                    - $vaccineLose;

                VaccineBatch::create([

                    'rhu_id' => $vaccine->rhu_id,

                    'vaccine_id' => $vaccine->id,

                    'batch_number' =>
                        'BATCH-' .
                        $vaccine->rhu_id .
                        '-' .
                        $vaccine->id .
                        '-' .
                        $i,

                    'expiration_date' => now()->addMonths(rand(6, 18)),

                    'current_balance' => $currentBalance,

                    'stock_receive' => $stockReceived,

                    'status' => true,
                ]);
            }
        }
    }
}