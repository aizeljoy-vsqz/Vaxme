<?php

namespace App\Events;

use App\Models\VaccineBatch;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ExpirationDetected
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public VaccineBatch $batch,
        public string $type
    ) {}
}