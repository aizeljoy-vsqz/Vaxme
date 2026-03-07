<?php

namespace App\Http\Controllers\Registration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BarangayDetails_Controller extends Controller
{
    public function index()
    {
        return Inertia::render('RHU_registration/Barangay_Details/Barangay-Detail');
    }
}
