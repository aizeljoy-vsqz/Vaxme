<?php

namespace Database\Seeders;

use App\Models\Rhu;
use App\Models\Vaccine;
use Illuminate\Database\Seeder;

class VaccineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $vaccines = [

            [
                'name' => 'BCG Vaccine',
                'description' => 'Tuberculosis vaccine',
            ],

            [
                'name' => 'Hepatitis B Vaccine',
                'description' => 'Protection against Hepatitis B',
            ],

            [
                'name' => 'Pentavalent Vaccine',
                'description' => '5-in-1 childhood vaccine',
            ],

            [
                'name' => 'Polio Vaccine',
                'description' => 'Protection against poliovirus',
            ],

            [
                'name' => 'Measles Vaccine',
                'description' => 'Protection against measles',
            ],

        ];

        $rhus = Rhu::all();

        foreach ($rhus as $rhu) {

            foreach ($vaccines as $vaccineData) {

                Vaccine::create([
                    'rhu_id' => $rhu->id,
                    'name' => $vaccineData['name'],
                    'description' => $vaccineData['description'],
                ]);
            }
        }
    }
}