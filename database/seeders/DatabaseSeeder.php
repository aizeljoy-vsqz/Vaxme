<?php

namespace Database\Seeders;

use App\Models\Bhc;
use App\Models\Rhu;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $rhuUser1 = User::create([
            'name' => 'RHU1',
            'email' => 'rhu1@example.com',
            'password' => bcrypt('password'),
        ]);

        Rhu::create([
            'user_id' => $rhuUser1->id,
            'facility_name' => 'RHU 1',
            'address' => 'Daet Camarines Norte',
            'nurse_assigned' => 'Nurse 1',
        ]);

        $rhuUser2 = User::create([
            'name' => 'RHU2',
            'email' => 'rhu2@example.com',
            'password' => bcrypt('password'),
        ]);

        Rhu::create([
            'user_id' => $rhuUser2->id,
            'facility_name' => 'RHU 2',
            'address' => 'Daet Camarines Norte',
            'nurse_assigned' => 'Nurse 2',
        ]);

        $rhuUser3 = User::create([
            'name' => 'RHU3',
            'email' => 'rhu3@example.com',
            'password' => bcrypt('password'),
        ]);

        Rhu::create([
            'user_id' => $rhuUser3->id,
            'facility_name' => 'RHU 3',
            'address' => 'Daet Camarines Norte',
            'nurse_assigned' => 'Nurse 3',
        ]);
    }
}
