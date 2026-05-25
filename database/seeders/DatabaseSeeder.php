<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([

            RhuSeeder::class,

            VaccineSeeder::class,

            VaccineBatchSeeder::class,

            DailyBatchesInventorySeeder::class,

            BhcSeeder::class,

            RequestSeeder::class,

            RequestItemSeeder::class,
        ]);
    }
}
