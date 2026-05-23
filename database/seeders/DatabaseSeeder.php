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
            'name' => 'Rural Health Unit 1 Daet',
            'email' => 'rhu1@ruralhealth.daet',
            'password' => bcrypt('password'),
            'user_type' => 'rhu'
        ]);

        Rhu::create([
            'user_id' => $rhuUser1->id,
            'facility_name' => 'Rural Health Unit 1',
            'address' => 'Daet Camarines Norte',
            'nurse_assigned' => 'Nurse 1',
        ]);

        $rhuUser2 = User::create([
            'name' => 'Rural Health Unit 2 Daet',
            'email' => 'rhu2@ruralhealth.daet',
            'password' => bcrypt('password'),
            'user_type' => 'rhu'
        ]);

        Rhu::create([
            'user_id' => $rhuUser2->id,
            'facility_name' => 'Rural Health Unit 2',
            'address' => 'Daet Camarines Norte',
            'nurse_assigned' => 'Nurse 2',
        ]);

        $rhuUser3 = User::create([
            'name' => 'Rural Health Unit 3 Daet',
            'email' => 'rhu3@ruralhealth.daet',
            'password' => bcrypt('password'),
            'user_type' => 'rhu'
        ]);

        Rhu::create([
            'user_id' => $rhuUser3->id,
            'facility_name' => 'Rural Health Unit 3',
            'address' => 'Daet Camarines Norte',
            'nurse_assigned' => 'Nurse 3',
        ]);
    }
}
