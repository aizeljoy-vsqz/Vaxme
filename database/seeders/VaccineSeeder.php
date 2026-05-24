<?php

namespace Database\Seeders;

use App\Models\Rhu;
use App\Models\Vaccine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VaccineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rhus = Rhu::all();

        if ($rhus->isEmpty()) {
            $this->command->info("No RHU found. Seeder stopped.");
            return;
        }

        // 👇 different vaccine sets per RHU
        $rhuVaccines = [
            1 => [ // RHU 1
                ['name' => 'Penta', 'description' => 'Pentavalent vaccine'],
                ['name' => 'BCG', 'description' => 'Tuberculosis vaccine'],
                ['name' => 'Polio', 'description' => 'Polio vaccine'],
            ],
            2 => [ // RHU 2
                ['name' => 'MMR', 'description' => 'Measles, Mumps, Rubella'],
                ['name' => 'Hepatitis B', 'description' => 'Hepatitis B vaccine'],
                ['name' => 'Tetanus', 'description' => 'Tetanus toxoid vaccine'],
            ],
            3 => [ // RHU 3
                ['name' => 'Influenza', 'description' => 'Flu vaccine'],
                ['name' => 'HPV', 'description' => 'Human Papillomavirus vaccine'],
                ['name' => 'Rabies', 'description' => 'Rabies vaccine'],
            ],
        ];

        foreach ($rhus as $rhu) {

            $vaccines = $rhuVaccines[$rhu->id] ?? [];

            foreach ($vaccines as $vaccine) {
                Vaccine::create([
                    'rhu_id' => $rhu->id,
                    'name' => $vaccine['name'],
                    'description' => $vaccine['description'],
                ]);
            }
        }

        $this->command->info("Vaccines seeded with different sets per RHU.");
    }
}
