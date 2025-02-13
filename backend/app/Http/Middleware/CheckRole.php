<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return \Illuminate\Http\Response
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Verifica si el usuario está autenticado y si su rol coincide con el requerido
        if (auth()->check() && auth()->user()->rol === $role) {
            return $next($request);
        }

        // Si no tiene el rol adecuado, regresa una respuesta de error
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
