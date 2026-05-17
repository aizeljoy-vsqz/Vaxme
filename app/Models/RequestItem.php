<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name','vaccine'])]
class RequestItem extends Model
{
    public function request(){
        return $this->belongsTo(Request::class);
    }
}
