<?php

namespace App\Listeners;

use App\Events\RequestSubmitted;
use App\Models\Notification;

class CreateRequestNotification
{
    public function handle(RequestSubmitted $event): void
    {
        $request = $event->request;

        Notification::create([
            'user_id' => $request->rhu->user_id,
            'rhu_id' => $request->rhu_id,
            'type' => 'request',
            'is_read' => false,
            'meta' => [
                'barangay_name' => $request->bhc->barangay_name,
                'request_id' => $request->id,
                'url' => route('requests.show', $request->id),
            ],
        ]);
    }
}