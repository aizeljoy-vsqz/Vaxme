<?php

namespace App\Listeners;

use App\Events\LowStockDetected;
use App\Models\Notification;

class CreateLowStockNotification
{
    public function handle(LowStockDetected $event): void
    {
        $batch = $event->batch;

        Notification::create([
            'user_id' => $batch->rhu->user_id,
            'rhu_id' => $batch->rhu_id,
            'type' => 'low_stock',
            'is_read' => false,
            'meta' => [
                'batch_no' => $batch->batch_number,
                'current_balance' => $batch->current_balance,
                'url' => route('inventory.index'),
            ],
        ]);
    }
}