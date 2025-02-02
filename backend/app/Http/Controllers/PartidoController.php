<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    public function getPartidosLigasTemporadas(Request $request)
    {
        $idLiga = $request->query('liga_id');
        $idTemporada = $request->query('temporada_id');

        $partidos = Partido::where('liga_id', $idLiga)
            ->where("temporada_id",$idTemporada)
            ->get();
        return response()->json($partidos, 200);
    }
}
