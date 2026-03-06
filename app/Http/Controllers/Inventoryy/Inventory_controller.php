<?php

namespace App\Http\Controllers\Inventoryy;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Inventory_controller extends Controller
{
   public function index()
   {
    return Inertia::render('RHU_inventory/Inventory');
   }
}
