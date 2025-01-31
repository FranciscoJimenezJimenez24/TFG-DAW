<?php

namespace App\Http\Controllers;

use App\Models\Liga;
use Illuminate\Http\Request;

class LigaController extends Controller
{
    public function getLigas(){
        $ligas = Liga::all();
        return response()->json($ligas, 200);
    }

    public function getLiga($id){
        $liga = Liga::find($id);
        return response()->json($liga, 200);
    }
}
