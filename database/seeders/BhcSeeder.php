<?php

namespace Database\Seeders;

use App\Models\Bhc;
use App\Models\Rhu;
use App\Models\User;
use Illuminate\Database\Seeder;

class BhcSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $barangays = [

            'Barangay Alawihao',
            'Barangay Awitan',
            'Barangay Bagasbas',
            'Barangay Bibirao',
            'Barangay Borabod',
            'Barangay Calasgasan',
            'Barangay Camambugan',
            'Barangay Cobangbang',
            'Barangay Dogongan',
            'Barangay Gahonon',
            'Barangay Lag-on',
            'Barangay Magang',
            'Barangay Mambalite',
            'Barangay Mancruz',
            'Barangay Pamorangon',
        ];

        $rhus = Rhu::all();

        $counter = 1;

        foreach ($rhus as $rhu) {

            foreach ($barangays as $barangay) {

                $user = User::create([

                    'name' => $barangay . ' Health Center',

                    'email' => 'bhc' . $counter . '@barangay.daet',

                    'password' => bcrypt('password'),

                    'user_type' => 'bhc',
                ]);

                Bhc::create([

                    'user_id' => $user->id,

                    'rhu_id' => $rhu->id,

                    'barangay_name' => $barangay,

                    'nurse_assigned' => 'Barangay Nurse ' . $counter,

                    'contact_number' => '09123456' . str_pad($counter, 2, '0', STR_PAD_LEFT),
                ]);

                $counter++;
            }
        }
    }
}