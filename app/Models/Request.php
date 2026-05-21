<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['bhc_id', 'rhu_id', 'type', 'status', 'original_request_id'])]
class Request extends Model
{
    public function items()
    {
        return $this->hasMany(RequestItem::class);
    }

    public function rhu(): BelongsTo
    {
        return $this->belongsTo(Rhu::class);
    }

    public function bhc(): BelongsTo
    {
        return $this->belongsTo(Bhc::class);
    }

}
