<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
            'password' => $request->password,
            'rol' => $request->rol
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
            'password' => 'required|string',
            'rol' => 'required|string'
        ]);

        $usuario->update($request->all());

        return response()->json($usuario, 200);
    }

    public function deleteUsuario($idUsuario){
        $usuario = User::findOrFail($idUsuario);
        $usuario->delete();
        return response()->json(null, 204);
    }
}
