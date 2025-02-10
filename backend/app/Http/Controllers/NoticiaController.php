<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Illuminate\Http\Request;

class NoticiaController extends Controller
{
    public function getNoticias()
    {
        $noticias = Noticia::all();
        return response()->json($noticias, 200);
    }

    public function addNoticia(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|min:5',
            'contenido' => 'required|string|min:20',
            'autor' => 'required|string',
            'fecha' => 'required|date'
        ]);

        $noticia = Noticia::create([
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'autor' => $request->autor,
            'fecha' => $request->fecha
        ]);

        return response()->json($noticia, 201);
    }
}
