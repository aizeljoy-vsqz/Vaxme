<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VaccineRequestController extends Controller
{
    public function Index(Request $request)
    {
    return Inertia::render('rhu-vaccine-request/vaccine-request',[]);
    }
}
