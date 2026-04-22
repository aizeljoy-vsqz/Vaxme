<?php

namespace App\Http\Controllers\Registrations;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class BarangayDetails_Controller extends Controller
{
    public function index()
    {
        return Inertia::render('RHU_registration/Barangay_Details/Barangay-Detail');
    }

}
