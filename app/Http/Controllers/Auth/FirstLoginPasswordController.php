<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Hash;

class FirstLoginPasswordController extends Controller
{
    private function ensureBarangayPasswordChangeAllowed(): void
    {
        $user = Auth::user();

        if (! $user || $user->user_type !== 'bhc' || ! $user->bhc) {
            abort(403, 'Only barangay accounts can change password.');
        }

        if ($user->rhu) {
            abort(403, 'Only barangay accounts can change password.');
        }
    }

    /**
     * Show the change password page for first-login barangay users.
     */
    public function show(): Response
    {
        $user = Auth::user();

        if (
            ! $user ||
            $user->user_type !== 'bhc' ||
            ! $user->is_first_login
        ) {
            return Inertia::render('dashboard');
        }

        return Inertia::render('auth/change-password');
    }

    /**
     * Update the password on first login.
     */
    public function update(Request $request): RedirectResponse
    {
        $this->ensureBarangayPasswordChangeAllowed();

        $request->validate([
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        $user = $request->user();

        $user->password = Hash::make($request->password);
        $user->is_first_login = false;
        $user->save();

        session()->flash('toast', ['type' => 'success', 'message' => __('Password updated.')]);

        return redirect()->route('dashboard');
    }
}
