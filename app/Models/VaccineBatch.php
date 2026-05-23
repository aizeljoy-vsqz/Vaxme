<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VaccineBatch extends Model
{
    protected $fillable = [
        'rhu_id',
        'vaccine_id',
        'batch_number',
        'stock_receive',
        'expiration_date',
        'current_balance',
        'status',
    ];

    protected $casts = [
        'expiration_date' => 'date',
    ];

    public function dailyVaccine(): HasMany
    {
        return $this->hasMany(DailyBatchesInventory::class);
    }

    public function vaccine(): BelongsTo
    {
        return $this->belongsTo(Vaccine::class);
    }

    public function rhu(): BelongsTo
    {
        return $this->belongsTo(Rhu::class);
    }
}
