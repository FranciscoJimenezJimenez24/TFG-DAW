<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        // Recibe las credenciales (email y password)
        $credentials = request(['email', 'password']);

        // Intentar autenticar con las credenciales directamente
        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Failed ! Email or password not matches',
                'credentials' => $credentials
            ], 401);
        }

        // Si la autenticación es exitosa, devuelve el token
        return $this->respondWithToken($token);
    }



    public function signup(Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required",
            "rol" => "nullable|in:user,admin,journalist",
            "password_confirmation" => "required|same:password",
        ]);

        $rol = $request->rol ?: 'user';

        $userData = User::create(array_merge(
            $request->except('password_confirmation'),
            [
                'rol' => $rol,
                'password' => bcrypt($request->password),
                'email_verified_at' => now(),
                'remember_token' => \Str::random(10),
            ]
        ));

        return response()->json(["message" => "User Add", "userData" => $userData], 200);
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
