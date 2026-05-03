<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaccines extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];
}
