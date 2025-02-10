<?php

use App\Http\Controllers\EquipoController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\TemporadaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
Route::get('ligas', [LigaController::class, 'getLigas']);
Route::get('ligas/{id}', [LigaController::class, 'getLiga']);
Route::get('equipos', [EquipoController::class, 'getEquiposLiga']);
Route::get('equipos/{id}', [EquipoController::class, 'getEquipo']);
Route::get('temporadas', [TemporadaController::class, 'getTemporadas']);
Route::get('partidos', [PartidoController::class, 'getPartidosLigasTemporadas']);
Route::get('jugadores/goleadores', [JugadorController::class, 'getMaximosGoleadoresTemporadaLiga']);
Route::get('jugadores/asistidores', [JugadorController::class, 'getMaximosAsistidoresTemporadaLiga']);
Route::get('jugadores/tarjetas-amarillas', [JugadorController::class, 'getMaximosTarjetasAmarillasTemporadaLiga']);
Route::get('jugadores/tarjetas-rojas', [JugadorController::class, 'getMaximosTarjetasRojasTemporadaLiga']);
Route::get('jugadores/equipos/{id}', [JugadorController::class, 'getJugadoresEquipo']);
Route::get('jugadores/{id}', [JugadorController::class, 'getJugador']);
Route::get('/jugadores/{id}/estadisticas',[JugadorController::class,'getEstadisticasJugador']);
Route::get('noticias',[NoticiaController::class,'getNoticias']);
Route::post('noticias', [NoticiaController::class, 'addNoticia']);

Route::group(['middleware' => 'api',], function ($router) {

    // Route::post('logout', 'AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');
    // Route::post('me', 'AuthController@me');

});