<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserTypeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $user_type): Response
    {
        if(! $request->user() || $request->user()->user_type !== $user_type){
            return redirect('/');
        }
        return $next($request);
    }
}
