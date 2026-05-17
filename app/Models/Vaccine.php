<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vaccine extends Model
{
    protected $fillable = [
        'rhu_id',
        'name',
        'description',
    ];
    public function vaccineBatch():HasMany
    {
        return $this->hasMany(VaccineBatch::class);
    }
    public function rhus():BelongsTo
    {
        return $this->belongsTo(Rhu::class);
    }
}
