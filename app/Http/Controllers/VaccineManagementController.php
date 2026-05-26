<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vaccine;
use Illuminate\Http\Request;
use Inertia\Inertia;


class VaccineManagementController extends Controller
{
    public function Index(Request $request)
    {
        $current_user_id = $request->user()->id;
        $rhu_id = User::with('rhu')->findOrFail($current_user_id)->id;
        $rhu_associated_vaccines = User::with('rhu.vaccines')->findOrFail($current_user_id);
        $rhu_associated_vaccines = $rhu_associated_vaccines->rhu->vaccines()->latest()->get();
        return Inertia::render('vaccine-management/vaccine_management', compact(['rhu_associated_vaccines', 'rhu_id']));
    }

    public function Store(Request $request)
    {
        $current_user_id = $request->user()->id;
        $user = User::with('rhu.vaccines')
            ->findOrFail($current_user_id);
        $vaccines = $user->rhu->vaccines;

        $request->validate([
            'name' => [
                'required',
                'string',
                function ($attribute, $value, $fail) use ($vaccines) {

                    $exists = $vaccines->contains(function ($vaccine) use ($value) {
                        return strtolower($vaccine->name) === strtolower($value);
                    });

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
        return back();
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
