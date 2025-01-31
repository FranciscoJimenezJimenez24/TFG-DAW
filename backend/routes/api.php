<?php

use App\Http\Controllers\LigaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('signup', [AuthController::class,'signup']);
Route::post('login', [AuthController::class,'login']);
Route::post('ligas', [LigaController::class,'getLigas']);

Route::group(['middleware' => 'api',], function ($router) {

    // Route::post('logout', 'AuthController@logout');
    // Route::post('refresh', 'AuthController@refresh');
    // Route::post('me', 'AuthController@me');

});