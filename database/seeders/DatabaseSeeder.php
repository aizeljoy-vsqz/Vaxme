<?php

namespace Database\Seeders;

use App\Models\Bhc;
use App\Models\Rhu;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // RHU USER
        $rhuUser = User::create([
            'name' => 'RHU User',
            'email' => 'rhu@test.com',
            'password' => bcrypt('password'),
            'user_type' => 'rhu',
        ]);


        $rhu = Rhu::create([
            'user_id' => $rhuUser->id,
            'facility_name' => 'Daet RHU',
            'address' => 'Daet Camarines Norte',
            'nurse_assigned' => 'Nurse 1',
        ]);


        // BHC USER
        $bhcUser = User::create([
            'name' => 'BHC User',
            'email' => 'bhc@test.com',
            'password' => bcrypt('password'),
        ]);

        $bhc = Bhc::create([
            'user_id' => $bhcUser->id,
            'rhu_id' => $rhu->id,
        ]);

        // BHC USER
        $bhcUser2 = User::create([
            'name' => 'BHC User 2',
            'email' => 'bhc2@test.com',
            'password' => bcrypt('password'),
        ]);

        $bhc2 = Bhc::create([
            'user_id' => $bhcUser2->id,
            'rhu_id' => $rhu->id,
        ]);

    }
}
