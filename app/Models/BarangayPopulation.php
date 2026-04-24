<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BarangayPopulation extends Model
{
    use HasFactory;

    protected $table = 'barangay_populations';

    protected $fillable = [
        'barangay_id',
        'user_id',
        'rhu_id',
        'age_range',
        'male',
        'female',
        'total',
    ];

    protected $casts = [
        'barangay_id' => 'integer',
        'user_id' => 'integer',
        'rhu_id' => 'integer',
        'male' => 'integer',
        'female' => 'integer',
        'total' => 'integer',
    ];

    public function barangay(): BelongsTo
    {
        return $this->belongsTo(Barangay::class);
    }
}