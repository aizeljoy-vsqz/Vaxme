<?php

namespace App\Events;

use App\Models\VaccineBatch;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ExpirationDetected implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public VaccineBatch $batch,
        public string $type
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('notifications.' . $this->batch->rhu->user_id),
        ];
    }

    public function broadcastAs(): string
    {
        return $this->type; // 'near_expired' or 'expired'
    }

    public function broadcastWith(): array
    {
        return [
            'type' => $this->type,
            'batch_no' => $this->batch->batch_number,
            'expiration_date' => $this->batch->expiration_date,
            'barangay_name' => optional($this->batch->rhu->bhcs->first())->barangay_name,
        ];
    }
}