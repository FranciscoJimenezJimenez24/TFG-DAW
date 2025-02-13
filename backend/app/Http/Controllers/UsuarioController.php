<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function getUsuarioByEmail($email)
    {
        $usuario = User::where('email', $email)->first();
        return response()->json($usuario, 200);
    }

    public function updateUsuario(Request $request)
    {
        $id = $request->id;
        $usuario = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'rol' => 'required|date'
        ]);

        $usuario->update($request->all());

        return response()->json($usuario, 200);

    }
}
