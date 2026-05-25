<?php

namespace Database\Seeders;

use App\Models\Rhu;
use App\Models\User;
use Illuminate\Database\Seeder;

class RhuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $rhuUsers = [

            [
                'name' => 'Rural Health Unit 1 Daet',
                'email' => 'rhu1@ruralhealth.daet',
                'facility_name' => 'Rural Health Unit 1',
                'nurse_assigned' => 'Nurse 1',
            ],

            [
                'name' => 'Rural Health Unit 2 Daet',
                'email' => 'rhu2@ruralhealth.daet',
                'facility_name' => 'Rural Health Unit 2',
                'nurse_assigned' => 'Nurse 2',
            ],

            [
                'name' => 'Rural Health Unit 3 Daet',
                'email' => 'rhu3@ruralhealth.daet',
                'facility_name' => 'Rural Health Unit 3',
                'nurse_assigned' => 'Nurse 3',
            ],

        ];

        foreach ($rhuUsers as $data) {

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt('password'),
                'user_type' => 'rhu'
            ]);

            Rhu::create([
                'user_id' => $user->id,
                'facility_name' => $data['facility_name'],
                'address' => 'Daet Camarines Norte',
                'nurse_assigned' => $data['nurse_assigned'],
            ]);
        }
    }
}