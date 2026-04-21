<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DailyVaccineController extends Controller
{
    public function Index()
    {
        return Inertia::render('inventory/inventory-vaccine-daily/daily_vaccine_inventory',[]);
    }
}
