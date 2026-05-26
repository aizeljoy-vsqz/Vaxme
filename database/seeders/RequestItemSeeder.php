<?php

namespace Database\Seeders;

use App\Models\Request;
use App\Models\Vaccine;
use App\Models\RequestItem;
use Illuminate\Database\Seeder;

class RequestItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $requests = Request::all();

        $recipientNames = [

            'Juan Dela Cruz',
            'Maria Santos',
            'Pedro Reyes',
            'Ana Lopez',
            'Jose Garcia',
            'Mark Mendoza',
            'Angela Ramos',
            'Carlo Bautista',
            'Sophia Flores',
            'Daniel Cruz',
        ];

        foreach ($requests as $request) {

            /*
            |--------------------------------------------------------------------------
            | Get vaccines related to RHU
            |--------------------------------------------------------------------------
            */

            $vaccines = Vaccine::where(
                'rhu_id',
                $request->rhu_id
            )->get();

            /*
            |--------------------------------------------------------------------------
            | One vaccine type per request
            |--------------------------------------------------------------------------
            */

            $selectedVaccine = $vaccines->random();

            /*
            |--------------------------------------------------------------------------
            | Determine vaccination status
            |--------------------------------------------------------------------------
            */

            $isApproved = $request->status === 'approved';

            /*
            |--------------------------------------------------------------------------
            | Generate request items
            |--------------------------------------------------------------------------
            */

            for ($i = 1; $i <= rand(3, 8); $i++) {

                RequestItem::create([

                    'request_id' => $request->id,

                    'vaccine_id' => $selectedVaccine->id,

                    'name' => $recipientNames[array_rand($recipientNames)],

                    /*
                    |--------------------------------------------------------------------------
                    | Only approved requests can have vaccinated recipients
                    |--------------------------------------------------------------------------
                    */

                    'is_vaccinated' => $isApproved
                        ? rand(0, 1)
                        : false,
                ]);
            }
        }
    }
}