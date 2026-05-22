<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'vaccine_id', 'request_id', 'is_vaccinated'])]
class RequestItem extends Model
{
    public function request(){
        return $this->belongsTo(Request::class);
    }
    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class);
    }
}
