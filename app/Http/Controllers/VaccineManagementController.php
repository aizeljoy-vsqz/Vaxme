<?php

namespace App\Http\Controllers;

use App\Models\Vaccine;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

use function Pest\Laravel\put;

class VaccineManagementController extends Controller
{
    public function Index()
    {
        $vaccines_data = Vaccine::lazyByIdDesc();
        return Inertia::render('vaccine-management/vaccine_management', compact('vaccines_data'));
    }

    public function Store(Request $request)
    {
        $request->validate([
            'name' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $exists = Vaccine::whereRaw(
                        'LOWER(name) = ?',
                        [strtolower($value)]
                    )->exists();

                    if ($exists) {
                        $fail("The {$attribute} already exists.");
                    }
                },
            ],

            'description' => [
                'required',
                'string',
            ],
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
            'name' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $exists = Vaccine::whereRaw(
                        'LOWER(name) = ?',
                        [strtolower($value)]
                    )->exists();

                    if ($exists) {
                        $fail("The {$attribute} already exists.");
                    }
                },

            ],
            'description' => 'required|string',
        ]);

        $update_vaccine_id->update($validateData);
    }
}
