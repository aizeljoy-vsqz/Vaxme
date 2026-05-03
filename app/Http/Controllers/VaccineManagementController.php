<?php

namespace App\Http\Controllers;

use App\Models\Vaccines;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VaccineManagementController extends Controller
{
    public function Index()
    {
        $vaccines_data = Vaccines::all();
        return Inertia::render('vaccine-management/vaccine_management', compact('vaccines_data'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);
        Vaccines::create($request->all());
    }
}
