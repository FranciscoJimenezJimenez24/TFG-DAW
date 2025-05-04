<?php

namespace App\Http\Controllers;

use App\Models\Puntuacion;
use Illuminate\Http\Request;

class PuntuacionController extends Controller
{
    public function getPuntuaciones()
    {
        $puntuaciones = Puntuacion::all();
        return response()->json($puntuaciones, 200);
    }

    public function getPuntuacion($id)
    {
        $puntuacion = Puntuacion::find($id);
        return response()->json($puntuacion, 200);
    }

    public function getPuntuacionJugador($idJugador)
    {
        $puntuacion = Puntuacion::where('jugador_id', $idJugador)->get();
        return response()->json($puntuacion, 200);
    }
}
