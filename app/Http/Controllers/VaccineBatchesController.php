<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class VaccineBatchesController extends Controller
{
    public function Index(Request $request){
        return Inertia::render('inventory/inventory-vaccine-batches/vaccine_batches_inventory',[]);
    }
}
