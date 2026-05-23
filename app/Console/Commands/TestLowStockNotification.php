<?php

namespace App\Console\Commands;

use App\Events\LowStockDetected;
use App\Models\VaccineBatch;
use App\Models\User;
use App\Models\Rhu;
use Illuminate\Console\Command;

class TestLowStockNotification extends Command
{
    protected $signature = 'test:low-stock';

    protected $description = 'Test low stock real-time notification';

    public function handle(): void
    {
        // Get first user or create one
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
            ]);
            $this->info("Created test user: {$user->email}");
        }

        // Get or create an RHU for the user
        $rhu = $user->rhu ?? Rhu::first();
        if (!$rhu) {
            $this->error('No RHU found in database');
            return;
        }

        // Assign RHU to user if not already assigned
        if (!$user->rhu_id) {
            $user->update(['rhu_id' => $rhu->id]);
            $this->info("Assigned RHU: {$rhu->name}");
        }

        // Create a vaccine batch with low stock (3 out of 10 = 30%)
        $batch = VaccineBatch::create([
            'rhu_id' => $rhu->id,
            'batch_number' => 'TEST-' . time(),
            'vaccine_type' => 'COVID-19',
            'total_quantity' => 10,
            'current_balance' => 3, // 30% = low stock threshold
            'expiration_date' => now()->addMonths(6),
        ]);

        $this->info("✅ Created vaccine batch: {$batch->batch_number}");
        $this->info("   RHU: {$rhu->name} (User: {$user->email})");

        // Dispatch the event to trigger broadcast
        event(new LowStockDetected($batch));

        $this->info('✅ Low stock event dispatched! Check browser for real-time notification.');
        $this->info('   Notification will appear in the dropdown for user ID: ' . $user->id);
    }
}
