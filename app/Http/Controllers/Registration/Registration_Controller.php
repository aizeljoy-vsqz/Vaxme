<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Registration_Controller extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('RHU_registration/Registration');
    }
}
