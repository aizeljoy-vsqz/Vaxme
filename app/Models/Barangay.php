<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\BarangayPopulation;


class Barangay extends Model
{
    use HasFactory;

    protected $table = 'barangays';

    protected $fillable = [
        'barangay_name',
        'nurse_id',
        'nurse_assigned',
        'contact_number',
    ];

    public function populations(): HasMany
    {
        return $this->hasMany(BarangayPopulation::class);
    }

}

