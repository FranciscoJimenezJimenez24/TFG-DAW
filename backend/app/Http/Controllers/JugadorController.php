<?php

namespace App\Http\Controllers;

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
}
