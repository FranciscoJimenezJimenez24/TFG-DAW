<?php

namespace App\Http\Controllers;

use App\Models\EstadisticasJugador;
use App\Models\Jugador;
use Illuminate\Http\Request;

class JugadorController extends Controller
{
    public function getMaximosGoleadoresTemporadaLiga(Request $request)
    {
        $idLiga = $request->query('liga_id');
        $idTemporada = $request->query('temporada_id');

        $goleadores = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.goles')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('ligas.id', $idLiga)
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.goles')
            ->limit(10)
            ->get();

        return response()->json($goleadores, 200);
    }

    public function getMaximosAsistidoresTemporadaLiga(Request $request)
    {
        $idLiga = $request->query('liga_id');
        $idTemporada = $request->query('temporada_id');
        $asistidores = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.asistencias')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('ligas.id', $idLiga)
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.asistencias')
            ->limit(10)
            ->get();
        return response()->json($asistidores, 200);
    }

    public function getMaximosTarjetasAmarillasTemporadaLiga(Request $request)
    {
        $idLiga = $request->query('liga_id');
        $idTemporada = $request->query('temporada_id');
        $tarjetasAmarillas = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.tarjetas_amarillas')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('ligas.id', $idLiga)
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.tarjetas_amarillas')
            ->limit(10)
            ->get();
        return response()->json($tarjetasAmarillas, 200);
    }

    public function getMaximosTarjetasRojasTemporadaLiga(Request $request)
    {
        $idLiga = $request->query('liga_id');
        $idTemporada = $request->query('temporada_id');
        $tarjetasRojas = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.tarjetas_rojas')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('ligas.id', $idLiga)
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.tarjetas_rojas')
            ->limit(10)
            ->get();
        return response()->json($tarjetasRojas, 200);
    }

    public function getMaximosGoleadoresTemporada($idTemporada){
        $goleadores = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.goles')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.goles')
            ->limit(10)
            ->get();
        return response()->json($goleadores, 200);
    }

    public function getMaximosAsistidoresTemporada($idTemporada){
        $asistidores = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.asistencias')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.asistencias')
            ->limit(10)
            ->get();
        return response()->json($asistidores, 200);
    }

    public function getMaximosTarjetasAmarillasTemporada($idTemporada){
        $tarjetasAmarillas = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.tarjetas_amarillas')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.tarjetas_amarillas')
            ->limit(10)
            ->get();
        return response()->json($tarjetasAmarillas, 200);
    }

    public function getMaximosTarjetasRojasTemporada($idTemporada){
        $tarjetasRojas = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.tarjetas_rojas')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.tarjetas_rojas')
            ->limit(10)
            ->get();
        return response()->json($tarjetasRojas, 200);
    }
    
    public function getMaximasParadasTemporada($idTemporada){
        $paradas = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.paradas')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.paradas')
            ->limit(10)
            ->get();
        return response()->json($paradas, 200);
    }

    public function getMaximasIntercepcionesTemporada($idTemporada){
        $intercepciones = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.intercepciones')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.intercepciones')
            ->limit(10)
            ->get();
        return response()->json($intercepciones, 200);
    }

    public function getMaximosPasesCompletosTemporada($idTemporada){
        $pasesCompletos = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.pases_completos')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.pases_completos')
            ->limit(10)
            ->get();
        return response()->json($pasesCompletos, 200);
    }

    public function getMaximosPasesTotalesTemporada($idTemporada){
        $pasesTotales = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.pases_totales')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.pases_totales')
            ->limit(10)
            ->get();
        return response()->json($pasesTotales, 200);
    }

    public function getMaximosEntradasTemporada($idTemporada){
        $entradas = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.entradas')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.entradas')
            ->limit(10)
            ->get();
        return response()->json($entradas, 200);
    }

    public function getMaximasFaltasTemporada($idTemporada){
        $faltas = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.faltas')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.faltas')
            ->limit(10)
            ->get();
        return response()->json($faltas, 200);
    }

    public function getMaximosDespejesTemporada($idTemporada){
        $despejes = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.despejes')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.despejes')
            ->limit(10)
            ->get();
        return response()->json($despejes, 200);
    }

    public function getMaximosDuelosGanadosTemporada($idTemporada){
        $duelosGanados = Jugador::select('jugadores.nombre AS jugador', 'equipos.id AS equipo', 'ligas.nombre AS liga', 'estadisticas_jugador.duelos_ganados')
            ->join('equipos', 'jugadores.equipo_id', '=', 'equipos.id')
            ->join('ligas', 'equipos.liga_id', '=', 'ligas.id')
            ->join('estadisticas_jugador', 'jugadores.id', '=', 'estadisticas_jugador.jugador_id')
            ->where('estadisticas_jugador.temporada_id', $idTemporada)
            ->orderByDesc('estadisticas_jugador.duelos_ganados')
            ->limit(10)
            ->get();
        return response()->json($duelosGanados, 200);
    }

    public function getJugadoresEquipo($idEquipo){
        $jugadores = Jugador::where('equipo_id',$idEquipo)
            ->orderBy('posicion')
            ->get()
            ;
        return response()->json($jugadores, 200);
    }

    public function getJugador($idJugador){
        $jugador = Jugador::find($idJugador);
        return response()->json($jugador, 200);
    }

    public function getEstadisticasJugador($idJugador){
        $jugador = EstadisticasJugador::where('jugador_id',$idJugador)->get();
        return response()->json($jugador, 200);
    }

    
}
