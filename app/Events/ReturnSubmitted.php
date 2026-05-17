<?php

namespace App\Events;

use App\Models\RequestsReturn;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReturnSubmitted
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public RequestsReturn $return
    ) {}
}