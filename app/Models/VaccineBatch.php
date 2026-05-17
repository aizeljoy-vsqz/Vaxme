<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VaccineBatch extends Model
{
    protected $fillable = [
        'rhu_id',
        'batch_number',
        'vaccine_type',
        'total_quantity',
        'current_balance',
        'expiration_date',
    ];

    protected $casts = [
        'expiration_date' => 'date',
    ];

    public function rhu(): BelongsTo
    {
        return $this->belongsTo(Rhu::class);
    }
}
