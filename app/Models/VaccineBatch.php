<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaccineBatch extends Model
{
    protected $fillable = [
        // 'rhu_id',
        'vaccine_id',
        'batch_number',
        'stock_receive',
        'expiration_date',
        'current_balance',
        'status',
    ];
}
