<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bhc extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rhu_id',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'rhu_id' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function barangays(): HasMany
    {
        return $this->hasMany(Barangay::class);
    }

    public function rhu(): BelongsTo
    {
        return $this->belongsTo(Rhu::class);
    }
}
