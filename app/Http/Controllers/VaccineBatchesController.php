<?php

namespace App\Http\Controllers;

use App\Models\VaccineBatch;
use App\Models\Vaccines;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VaccineBatchesController extends Controller
{
    public function Index(Request $request)
    {
        $vaccine_batches = VaccineBatch::all();
        $vaccines_data = Vaccines::all();
        return Inertia::render('inventory/inventory-vaccine-batches/vaccine_batches_inventory', compact('vaccine_batches', 'vaccines_data'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            // 'rhu_id' => 'required',
            'vaccine_id'=> 'required',
            'batch_number'=> ['required', Rule::string()],
            'stock_receive'=> ['required', 'integer:strict'],
            'current_balance' => ['required', 'integer:strict'],
            'expiration_date' => ['required', Rule::date()]
        ]);
        VaccineBatch::create($request->all());
    }
}
