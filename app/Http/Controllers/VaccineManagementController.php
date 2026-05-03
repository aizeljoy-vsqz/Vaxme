<?php

namespace App\Http\Controllers;

use App\Models\Vaccines;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VaccineManagementController extends Controller
{
    public function Index(){
        return Inertia::render('vaccine-management/vaccine_management',[]);
    }

    public function Store(Request $request){
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);
        Vaccines::create($request->all());
    }
}
