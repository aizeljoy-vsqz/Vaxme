<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'rhu_id',
        'is_read',
        'current_balance',
        'expiration_date',
        'meta',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'current_balance' => 'integer',
        'expiration_date' => 'date',
        'meta' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function rhu(): BelongsTo
    {
        return $this->belongsTo(Rhu::class);
    }
}

