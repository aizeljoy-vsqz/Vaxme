<?php

namespace App\Http\Controllers;

use App\Models\Vaccine;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\put;

class VaccineManagementController extends Controller
{
    public function Index()
    {
        $vaccines_data = Vaccine::all();
        return Inertia::render('vaccine-management/vaccine_management', compact('vaccines_data'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);
        Vaccine::create($request->all());
    }

    public function Delete(Vaccine $delete_vaccine_id)
    {
        $delete_vaccine_id->delete();
    }

    public function Update(Request $request,  Vaccine $update_vaccine_id)
    {
        $validateData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        $update_vaccine_id->update($validateData);
    }
}
