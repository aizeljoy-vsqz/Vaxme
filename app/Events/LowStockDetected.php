<?php

namespace App\Events;

use App\Models\VaccineBatch;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LowStockDetected implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public VaccineBatch $batch
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('notifications.' . $this->batch->rhu->user_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'low.stock';
    }

    public function broadcastWith(): array
    {
        $percentage = $this->batch->total_quantity > 0 
            ? ($this->batch->current_balance / $this->batch->total_quantity) * 100 
            : 0;

        return [
            'type' => 'low_stock',
            'batch_no' => $this->batch->batch_number,
            'current_balance' => $this->batch->current_balance,
            'total_quantity' => $this->batch->total_quantity,
            'percentage' => round($percentage, 2),
            'rhu_id' => $this->batch->rhu_id,
            'barangay_name' => optional($this->batch->rhu->bhcs->first())->barangay_name,
        ];
    }
}