<?php

use App\Services\NotificationService;
use Illuminate\Support\Carbon;

it('classifies notifications by the configured expiration windows', function () {
    Carbon::setTestNow(Carbon::create(2026, 5, 17, 12, 0, 0));

    try {
        $service = new NotificationService();

        expect($service->resolveExpirationNotificationType('2026-06-17'))->toBeNull();
        expect($service->resolveExpirationNotificationType('2026-06-16'))->toBe('near_expired');
        expect($service->resolveExpirationNotificationType('2026-06-01'))->toBe('expired');
        expect($service->resolveExpirationNotificationType('2026-05-17'))->toBe('expired');
    } finally {
        Carbon::setTestNow();
    }
});