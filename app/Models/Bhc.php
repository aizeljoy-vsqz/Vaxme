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
        'barangay_name',
        'nurse_assigned',
        'contact_number',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'rhu_id' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function requests(): HasMany 
    {
        return $this->hasMany(Request::class);
    }
  
    public function rhu(): BelongsTo
    {
        return $this->belongsTo(Rhu::class);
    }

    public function populations(): HasMany
    {
        return $this->hasMany(BarangayPopulation::class);
    }
}
