<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ForcePasswordChange
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        // Only force barangay users on first login to change password
        if (
            $user &&
            $user->user_type === 'barangay' &&
            $user->is_first_login &&
            ! $request->is('first-login/change-password') &&
            ! $request->is('logout')
        ) {
            return redirect('/first-login/change-password');
        }

        return $next($request);
    }
}
