<?php

namespace App\Http\Controllers;

use App\Models\VaccineBatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VaccineBatchesController extends Controller
{
    public function Index(Request $request)
    {
        return Inertia::render('inventory/inventory-vaccine-batches/vaccine_batches_inventory', []);
    }

    public function Store(Request $request)
    {
        $request->validate([
            // 'rhu_id' => 'required',
            'vaccine_id'=> 'required',
            'batch_number'=> 'required',
            'stock_receive'=> 'required',
            'current_balance' => 'required',
            'expiration_date' => 'required'
        ]);
        VaccineBatch::create($request->all());
    }
}
