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
        'bhc_id',
        'age_range',
        'male',
        'female',
        'total',
    ];

    protected $casts = [
        'bhc_id' => 'integer',
        'male' => 'integer',
        'female' => 'integer',
        'total' => 'integer',
    ];

    public function bhc(): BelongsTo
    {
        return $this->belongsTo(Bhc::class);
    }
}