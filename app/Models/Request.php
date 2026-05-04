<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['type','status'])]
class Request extends Model
{
    public function items(){
        return $this->hasMany(RequestItem::class);
    }
}
