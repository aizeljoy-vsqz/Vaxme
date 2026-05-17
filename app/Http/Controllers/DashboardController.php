<?php

namespace App\Http\Controllers;

use App\Models\Rhu;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function Index(Request $request)
    {
        $current_user_id = $request->user()->id;
        $total_vaccines = User::with(['rhu.vaccines'])->findOrFail($current_user_id);
        $total_vaccines = $total_vaccines->rhu->vaccines;

        return Inertia::render('dashboard', compact(['total_vaccines']));
    }
}
