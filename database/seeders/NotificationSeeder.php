<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
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

        // Create a few sample notifications for the first user
        Notification::create([
            'user_id' => $user->id,
            'rhu_id' => null,
            'type' => 'request',
            'is_read' => false,
            'meta' => json_encode(['current_balance' => 12]),
        ]);

        Notification::create([
            'user_id' => $user->id,
            'rhu_id' => null,
            'type' => 'return',
            'is_read' => false,
            'meta' => json_encode(['batch_no' => 'B-123', 'expiration_date' => Carbon::now()->addDays(10)->toDateString()]),
        ]);

        Notification::create([
            'user_id' => $user->id,
            'rhu_id' => null,
            'type' => 'near_expired',
            'is_read' => false,
            'meta' => json_encode(['batch_no' => 'B-999', 'expiration_date' => Carbon::now()->addDays(3)->toDateString()]),
        ]);
    }
}
