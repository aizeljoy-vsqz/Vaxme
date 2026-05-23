<?php

namespace App\Events;

use App\Models\RequestsReturn;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReturnSubmitted implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public RequestsReturn $return
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('notifications.' . $this->return->rhu->user_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'return';
    }

    public function broadcastWith(): array
    {
        return [
            'type' => 'return',
            'return_id' => $this->return->id,
            'barangay_name' => $this->return->bhc->barangay_name,
            'url' => route('returns.show', $this->return->id),
        ];
    }
}