<?php

namespace App\Http\Controllers;

use App\Models\Partido;
use Illuminate\Http\Request;

class PartidoController extends Controller
{
    public function getPartidos()
    {
        $partidos = Partido::all();
        return response()->json($partidos, 200);
    }
    public function getPartido($id)
    {
        $partido = Partido::find($id);
        return response()->json($partido, 200);
    }

    public function getPartidosLigasTemporadas(Request $request)
    {
        $idLiga = $request->query('liga_id');
        $idTemporada = $request->query('temporada_id');

        $partidos = Partido::where('liga_id', $idLiga)
            ->where("temporada_id", $idTemporada)
            ->get();
        return response()->json($partidos, 200);
    }

    public function getPartidosEquipo($idEquipo)
    {
        $partidos = Partido::where('equipo_local_id', $idEquipo)
            ->orWhere('equipo_visitante_id', $idEquipo)
            ->get();
        return response()->json($partidos, 200);
    }

    public function getUltimosPartidosPorLiga()
    {
        $partidos = Partido::select('liga_id', \DB::raw('MAX(fecha) as ultima_fecha'))
            ->groupBy('liga_id')
            ->whereNotNull('fecha_jugado')
            ->with(['liga', 'temporada'])
            ->get();

        $resultados = [];
        foreach ($partidos as $partido) {
            $resultados[] = Partido::where('liga_id', $partido->liga_id)
                ->where('fecha', $partido->ultima_fecha)
                ->first();
        }

        return response()->json($resultados, 200);
    }

    public function getNumeroPartidos()
    {
        $numPartidos = Partido::count();
        return response()->json($numPartidos, 200);
    }
}
