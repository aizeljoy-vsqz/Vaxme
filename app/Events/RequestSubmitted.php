<?php

namespace App\Events;

use App\Models\RequestsReturn;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RequestSubmitted implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public RequestsReturn $request
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('notifications.' . $this->request->rhu->user_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'request';
    }

    public function broadcastWith(): array
    {
        return [
            'type' => 'request',
            'request_id' => $this->request->id,
            'barangay_name' => $this->request->bhc->barangay_name,
            'url' => route('requests.show', $this->request->id),
        ];
    }
}