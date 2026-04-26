<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VaccineManagementController extends Controller
{
    public function Index(){
        return Inertia::render('vaccine-management/vaccine_management',[]);
    }
}
