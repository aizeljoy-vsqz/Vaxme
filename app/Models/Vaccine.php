<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vaccine extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];
    public function vaccineBatch():HasMany
    {
        return $this->hasMany(VaccineBatch::class);
    }
}
