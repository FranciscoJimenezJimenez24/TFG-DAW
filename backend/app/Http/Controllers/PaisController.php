<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use Illuminate\Http\Request;

class PaisController extends Controller
{
    public function getPais($id){
        $pais = Pais::find($id);
        return response()->json($pais);
    }
}
