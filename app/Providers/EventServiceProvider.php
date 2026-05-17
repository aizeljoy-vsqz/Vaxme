<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        \App\Events\RequestSubmitted::class => [
            \App\Listeners\CreateRequestNotification::class,
        ],

        \App\Events\ReturnSubmitted::class => [
            \App\Listeners\CreateReturnNotification::class,
        ],

        \App\Events\LowStockDetected::class => [
            \App\Listeners\CreateLowStockNotification::class,
        ],

        \App\Events\ExpirationDetected::class => [
            \App\Listeners\CreateExpirationNotification::class,
        ],
    ];

    public function boot(): void
    {
        parent::boot();
    }
}