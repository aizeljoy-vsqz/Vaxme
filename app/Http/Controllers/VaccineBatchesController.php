<?php

namespace App\Http\Controllers;

use App\Models\VaccineBatch;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VaccineBatchesController extends Controller
{
    public function Index(Request $request)
    {
        $vaccine_batches = VaccineBatch::all();
        return Inertia::render('inventory/inventory-vaccine-batches/vaccine_batches_inventory', compact('vaccine_batches'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            // 'rhu_id' => 'required',
            'vaccine_id'=> 'required',
            'batch_number'=> ['required', Rule::string()],
            'stock_receive'=> ['required', 'integer:strict'],
            'current_balance' => ['required', 'integer:strict'],
            'expiration_date' => ['required', Rule::date()->format('Y-m-d')]
        ]);
        VaccineBatch::create($request->all());
    }
}
