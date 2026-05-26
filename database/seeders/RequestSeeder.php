<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Bhc;
use App\Models\Request;
use App\Models\VaccineBatch;
use Illuminate\Database\Seeder;

class RequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $bhcs = Bhc::all();

        $statuses = [
            'submitted',
            'reviewed',
            'approved',
            'rejected',
        ];

        $returnReasons = [

            'Damaged vaccine vial',

            'Expired vaccine batch',

            'Excess unused vaccines',

            'Cold chain temperature issue',

            'Incorrect vaccine delivery',

            'Opened but unused vial',

            'Overstock from barangay inventory',
        ];

        $rejectionReasons = [

            'Requested vaccine is unavailable',

            'Request submitted beyond cutoff date',

            'Request exceeds allocated stock',
            
        ];

        foreach ($bhcs as $bhc) {

            /*
            |--------------------------------------------------------------------------
            | Get vaccine batches related to RHU
            |--------------------------------------------------------------------------
            */

            $batches = VaccineBatch::where(
                'rhu_id',
                $bhc->rhu_id
            )->get();

            /*
            |--------------------------------------------------------------------------
            | Generate requests for current year
            |--------------------------------------------------------------------------
            */

            for ($month = 1; $month <= now()->month; $month++) {

                $batch = $batches->random();

                /*
                |--------------------------------------------------------------------------
                | Determine request type
                |--------------------------------------------------------------------------
                */

                $type = rand(0, 1)
                    ? 'request'
                    : 'return';

                /*
                |--------------------------------------------------------------------------
                | Determine request status
                |--------------------------------------------------------------------------
                */

                $status = $statuses[array_rand($statuses)];

                /*
                |--------------------------------------------------------------------------
                | Determine rejection reason
                |--------------------------------------------------------------------------
                */

                $reason = null;

                /*
                |--------------------------------------------------------------------------
                | All rejected requests must have reason
                |--------------------------------------------------------------------------
                */

                if ($status === 'rejected') {

                    $reason = $rejectionReasons[array_rand($rejectionReasons)];
                }

                /*
                |--------------------------------------------------------------------------
                | All return requests must have reason
                |--------------------------------------------------------------------------
                */ elseif ($type === 'return') {

                    $reason = $returnReasons[array_rand($returnReasons)];
                }

                Request::create([

                    'bhc_id' => $bhc->id,

                    'rhu_id' => $bhc->rhu_id,

                    'batch_id' => $batch->id,

                    'type' => $type,

                    'status' => $status,

                    'rejection_reason' => $reason,

                    'created_at' => Carbon::create(
                        now()->year,
                        $month,
                        rand(1, 28)
                    ),

                    'updated_at' => Carbon::create(
                        now()->year,
                        $month,
                        rand(1, 28)
                    ),
                ]);
            }
        }
    }
}
