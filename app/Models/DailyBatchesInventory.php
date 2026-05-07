<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
    
#[Fillable(['vaccine_batches_id, stock_transferred, daily_dispense, number_of_receipients, current_balance'])]

class DailyBatchesInventory extends Model
{
}
