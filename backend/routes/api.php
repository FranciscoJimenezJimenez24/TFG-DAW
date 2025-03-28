<?php

use App\Http\Controllers\EquipoController;
use App\Http\Controllers\JugadorController;
use App\Http\Controllers\LigaController;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\PaisController;
use App\Http\Controllers\PartidoController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\TemporadaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'role:admin'])->get('/admin/dashboard', function () {
    return response()->json(['message' => 'Welcome to the admin dashboard']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');  // Cambié 'auth:sanctum' a 'auth:api'

Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);

// Rutas públicas
Route::get('ligas', [LigaController::class, 'getLigas']);
Route::get('ligas/{id}', [LigaController::class, 'getLiga']);
Route::get('equipos', [EquipoController::class, 'getEquiposLiga']);
Route::get('equipos/{id}', [EquipoController::class, 'getEquipo']);
Route::get('temporadas', [TemporadaController::class, 'getTemporadas']);
Route::get('partidos', [PartidoController::class, 'getPartidosLigasTemporadas']);
Route::get('partidos/equipo/{id}', [PartidoController::class, 'getPartidosEquipo']);
Route::get('jugadores/goleadores', [JugadorController::class, 'getMaximosGoleadoresTemporadaLiga']);
Route::get('jugadores/asistidores', [JugadorController::class, 'getMaximosAsistidoresTemporadaLiga']);
Route::get('jugadores/tarjetas-amarillas', [JugadorController::class, 'getMaximosTarjetasAmarillasTemporadaLiga']);
Route::get('jugadores/tarjetas-rojas', [JugadorController::class, 'getMaximosTarjetasRojasTemporadaLiga']);
Route::get('jugadores/equipos/{id}', [JugadorController::class, 'getJugadoresEquipo']);
Route::get('jugadores/{id}', [JugadorController::class, 'getJugador']);
Route::get('/jugadores/{id}/estadisticas', [JugadorController::class, 'getEstadisticasJugador']);
Route::get('noticias', [NoticiaController::class, 'getNoticias']);
Route::post('noticias', [NoticiaController::class, 'addNoticia']);
Route::put('/noticias', [NoticiaController::class, 'updateNoticia']);
Route::delete('/noticias/{id}', [NoticiaController::class, 'deleteNoticia']);
Route::get('usuarios',[UsuarioController::class,'getUsuarios']);
Route::get('usuarios/{email}',[UsuarioController::class,'getUsuarioByEmail']);
Route::post('usuarios',[UsuarioController::class,'addUsuario']);
Route::put('/usuarios',[UsuarioController::class,'updateUsuario']);
Route::delete('/usuarios/{id}',[UsuarioController::class,'deleteUsuario']);
Route::get('solicitudes',[SolicitudController::class,'getSolicitudes']);
Route::post('solicitudes',[SolicitudController::class,'addSolicitud']);
Route::delete('solicitudes/{id}',[SolicitudController::class,'deleteSolicitud']);
Route::get('paises/{id}', [PaisController::class, 'getPais']);

// Rutas protegidas por autenticación
Route::middleware(['auth:api'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});
