<?php

namespace App\Listeners;

use App\Events\LowStockDetected;
use App\Models\Notification;

class CreateLowStockNotification
{
    public function handle(LowStockDetected $event): void
    {
        $batch = $event->batch;
        
        // Calculate the remaining stock as a percentage of the total quantity.
        $percentage = $batch->total_quantity > 0 
            ? ($batch->current_balance / $batch->total_quantity) * 100 
            : 0;

        Notification::create([
            'user_id' => $batch->rhu->user_id,
            'rhu_id' => $batch->rhu_id,
            'type' => 'low_stock',
            'is_read' => false,
            'meta' => [
                'batch_no' => $batch->batch_number,
                'current_balance' => $batch->current_balance,
                'total_quantity' => $batch->total_quantity,
                'percentage' => round($percentage, 2),
                'barangay_name' => optional($batch->rhu->bhcs->first())->barangay_name,
                'url' => '#',
            ],
        ]);
    }
}