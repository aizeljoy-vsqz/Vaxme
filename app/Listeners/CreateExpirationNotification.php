<?php

namespace App\Listeners;

use App\Events\ExpirationDetected;
use App\Models\Notification;

class CreateExpirationNotification
{
    public function handle(ExpirationDetected $event): void
    {
        $batch = $event->batch;

        Notification::create([
            'user_id' => $batch->rhu->user_id,
            'rhu_id' => $batch->rhu_id,
            'type' => $event->type,
            'is_read' => false,
            'meta' => [
                'batch_no' => $batch->batch_number,
                'expiration_date' => $batch->expiration_date,
            ],
        ]);
    }
}