<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Failed ! Email or password not matches'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function signup(Request $request)
    {
        $validated = $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required",
            "rol" => "nullable|in:user,admin,journalist", // Validación para rol
            "password_confirmation" => "required|same:password", // Validación de confirmación de contraseña
        ]);

        // Asignar 'user' como rol por defecto si no se proporciona
        $rol = $request->rol ?: 'user';

        // Crear el usuario con el rol asignado
        $userData = User::create(array_merge($request->except('password_confirmation'), ['rol' => $rol, 'password' => bcrypt($request->password)]));

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
