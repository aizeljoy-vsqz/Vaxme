<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use App\Models\Rhu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        if (! $user) {
            return;
        }

        Notification::where('user_id', $user->id)
            ->where('meta', 'like', '%"seeded":true%')
            ->delete();

        $rhus = Rhu::all();

        foreach ($rhus as $rhu) {
            $firstBhc = $rhu->bhcs()->first();

            Notification::create([
                'user_id' => $user->id,
                'rhu_id' => $rhu->id,
                'type' => 'request',
                'is_read' => false,
                'meta' => ['current_balance' => rand(5, 50), 'seeded' => true, 'barangay_name' => $firstBhc?->barangay_name ?? 'N/A'],
            ]);

            Notification::create([
                'user_id' => $user->id,
                'rhu_id' => $rhu->id,
                'type' => 'return',
                'is_read' => false,
                'meta' => ['current_balance' => rand(1, 8), 'seeded' => true, 'barangay_name' => $firstBhc?->barangay_name ?? 'N/A'],
            ]);

            Notification::create([
                'user_id' => $user->id,
                'rhu_id' => $rhu->id,
                'type' => 'low_stock',
                'is_read' => false,
                'meta' => ['current_balance' => rand(1, 8), 'seeded' => true, 'barangay_name' => $firstBhc?->barangay_name ?? 'N/A'],
            ]);

            Notification::create([
                'user_id' => $user->id,
                'rhu_id' => $rhu->id,
                'type' => 'near_expired',
                'is_read' => false,
                'meta' => [
                    'batch_no' => 'NE-' . rand(100,999),
                    'expiration_date' => Carbon::now()->addDays(rand(16,30))->toDateString(),
                    'seeded' => true,
                    'barangay_name' => $firstBhc?->barangay_name ?? 'N/A'
                ],
            ]);

            Notification::create([
                'user_id' => $user->id,
                'rhu_id' => $rhu->id,
                'type' => 'expired',
                'is_read' => false,
                'meta' => [
                    'batch_no' => 'EX-' . rand(100,999),
                    'expiration_date' => Carbon::now()->addDays(rand(0,15))->toDateString(),
                    'seeded' => true,
                    'barangay_name' => $firstBhc?->barangay_name ?? 'N/A'
                ],
            ]);

            Notification::create([
                'user_id' => $user->id,
                'rhu_id' => $rhu->id,
                'type' => 'expired',
                'is_read' => false,
                'meta' => [
                    'batch_no' => 'EXP-' . rand(100,999),
                    'expiration_date' => Carbon::now()->subDays(rand(1,30))->toDateString(),
                    'seeded' => true,
                    'barangay_name' => $firstBhc?->barangay_name ?? 'N/A'
                ],
            ]);
        }
    }
}
