<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\BarangayPopulation;


class Barangay extends Model
{
    use HasFactory;

    protected $table = 'barangays';

    protected $fillable = [
        'bhc_id',
        'barangay_name',
        'nurse_id',
        'nurse_assigned',
        'contact_number',
    ];

    protected $casts = [
        'bhc_id' => 'integer',
        'nurse_id' => 'integer',
    ];

    public function bhc(): BelongsTo
    {
        return $this->belongsTo(Bhc::class);
    }

    public function populations(): HasMany
    {
        return $this->hasMany(BarangayPopulation::class);
    }

}

