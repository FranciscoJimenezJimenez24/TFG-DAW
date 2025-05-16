<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UsuarioController extends Controller
{

    public function getUsuarios()
    {
        $usuarios = User::all();
        return response()->json($usuarios, 200);
    }
    public function getUsuarioByEmail($email)
    {
        $usuario = User::where('email', $email)->first();
        return response()->json($usuario, 200);
    }

    public function addUsuario(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'rol' => 'required|string'
        ]);

        $usuario = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'rol' => $request->rol,
            'email_verified_at' => now(),
            'remember_token' => \Str::random(10),
        ]);

        return response()->json($usuario, 201);

    }

    public function updateUsuario(Request $request)
    {
        $id = $request->id;
        $usuario = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'rol' => 'required|string'
        ]);

        if ($request->filled('password')) {
            $usuario->password = bcrypt($request->password);
        }

        $usuario->update($request->except('password'));
        $usuario->save();

        return response()->json($usuario, 200);
    }

    public function deleteUsuario($idUsuario)
    {
        $usuario = User::findOrFail($idUsuario);
        $usuario->delete();
        return response()->json(null, 204);
    }
}
