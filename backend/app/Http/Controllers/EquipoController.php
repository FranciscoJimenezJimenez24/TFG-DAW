<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\Request;

class EquipoController extends Controller
{

    public function getEquipos()
    {
        $equipos = Equipo::all();
        return response()->json($equipos, 200);
    }
    public function getEquiposLiga($idLiga)
    {
        $equipos = Equipo::where('liga_id', $idLiga)->get();
        return response()->json($equipos, 200);
    }

    public function getEquipo($idEquipo)
    {
        $equipo = Equipo::find($idEquipo);
        return response()->json($equipo, 200);
    }

    public function getNumeroEquipos()
    {
        $numEquipos = Equipo::count();
        return response()->json($numEquipos, 200);
    }

    public function getEquipoByEscudo($escudo)
    {
        $equipo = Equipo::where('escudo', $escudo)->first();
        if ($equipo) {
            return response()->json($equipo, 200);
        } else {
            return response()->json(['message' => 'Equipo no encontrado'], 404);
        }
    }
}
