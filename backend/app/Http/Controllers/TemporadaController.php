<?php

namespace App\Http\Controllers;

use App\Models\Temporada;
use Illuminate\Http\Request;

class TemporadaController extends Controller
{
    public function getTemporadas(){
        $temporadas = Temporada::all();
        return response()->json($temporadas, 200);
    }
}
