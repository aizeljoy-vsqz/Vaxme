<?php

namespace App\Listeners;

use App\Events\ReturnSubmitted;
use App\Models\Notification;

class CreateReturnNotification
{
    public function handle(ReturnSubmitted $event): void
    {
        $return = $event->return;

        Notification::create([
            'user_id' => $return->rhu->user_id,
            'rhu_id' => $return->rhu_id,
            'type' => 'return',
            'is_read' => false,
            'meta' => [
                'barangay_name' => $return->bhc->barangay_name,
                'return_id' => $return->id,
                'url' => route('returns.show', $return->id),
            ],
        ]);
    }
}