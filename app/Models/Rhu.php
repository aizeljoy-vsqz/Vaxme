<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rhu extends Model
{
    protected $fillable = [
        'user_id',
        'facility_name',
        'address',
        'nurse_assigned',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function requests(): HasMany 
    {
        return $this->hasMany(Request::class);
    }

    public function bhcs(): HasMany
    {
        return $this->hasMany(Bhc::class);
    }

    public function vaccineBatches(): HasMany
    {
        return $this->hasMany(VaccineBatch::class);
    }

    public function vaccines(): HasMany
    {
        return $this->hasMany(Vaccine::class);
    }
}
