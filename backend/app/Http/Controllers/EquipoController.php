<?php

namespace App\Http\Controllers;

use App\Models\Equipo;
use Illuminate\Http\Request;

class EquipoController extends Controller
{
    public function getEquiposLiga(Request $request){
        $idLiga = $request->query('liga_id');
        $equipos = Equipo::where('liga_id', $idLiga)->get();
        return response()->json($equipos, 200);
    }
}
