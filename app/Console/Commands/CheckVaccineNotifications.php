<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NotificationService;

class CheckVaccineNotifications extends Command
{
    protected $signature = 'notifications:check';

    protected $description = 'Check vaccine expiration and low stock notifications';

    public function handle(NotificationService $service)
    {
        $service->checkExpirations();

        $service->checkLowStock();

        $this->info('Notifications checked successfully.');
    }
}