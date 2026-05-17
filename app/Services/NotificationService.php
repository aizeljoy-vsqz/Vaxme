<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\VaccineBatch;
use Illuminate\Support\Carbon;

class NotificationService
{
    private const EXPIRATION_WARNING_DAYS = 30;

    private const EXPIRATION_CRITICAL_DAYS = 15;

    private const LOW_STOCK_THRESHOLD = 20;

    public function resolveExpirationNotificationType(string|Carbon|null $expirationDate): ?string
    {
        if (! $expirationDate) {
            return null;
        }

        $expiration = Carbon::parse($expirationDate)->startOfDay();
        $today = Carbon::today();

        if ($expiration->lessThanOrEqualTo($today->copy()->addDays(self::EXPIRATION_CRITICAL_DAYS))) {
            return 'expired';
        }

        if ($expiration->betweenIncluded(
            $today->copy()->addDays(self::EXPIRATION_CRITICAL_DAYS + 1),
            $today->copy()->addDays(self::EXPIRATION_WARNING_DAYS),
        )) {
            return 'near_expired';
        }

        return null;
    }

    public function checkExpirations(): void
    {
        $batches = VaccineBatch::with('rhu.bhcs')->get();

        foreach ($batches as $batch) {

            $type = $this->resolveExpirationNotificationType($batch->expiration_date);

            if (! $type) {
                continue;
            }

            $alreadyExists = Notification::where('rhu_id', $batch->rhu_id)
                ->where('type', $type)
                ->where('meta->batch_no', $batch->batch_number)
                ->exists();

            if ($alreadyExists) {
                continue;
            }

            Notification::create([
                'user_id' => $batch->rhu->user_id,
                'rhu_id' => $batch->rhu_id,
                'type' => $type,
                'is_read' => false,
                'meta' => [
                    'batch_no' => $batch->batch_number,
                    'expiration_date' => $batch->expiration_date,
                    'barangay_name' => optional($batch->rhu->bhcs->first())->barangay_name,
                ],
            ]);
        }
    }

    public function checkLowStock(): void
    {
        $batches = VaccineBatch::with('rhu.bhcs')
            ->where('current_balance', '<=', self::LOW_STOCK_THRESHOLD)
            ->get();

        foreach ($batches as $batch) {

            $exists = Notification::where('rhu_id', $batch->rhu_id)
                ->where('type', 'low_stock')
                ->where('meta->batch_no', $batch->batch_number)
                ->exists();

            if ($exists) {
                continue;
            }

            Notification::create([
                'user_id' => $batch->rhu->user_id,
                'rhu_id' => $batch->rhu_id,
                'type' => 'low_stock',
                'is_read' => false,
                'meta' => [
                    'batch_no' => $batch->batch_number,
                    'current_balance' => $batch->current_balance,
                    'barangay_name' => optional($batch->rhu->bhcs->first())->barangay_name,
                ],
            ]);
        }
    }
}