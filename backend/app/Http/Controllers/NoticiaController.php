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
            'titulo' => 'required|string',
            'contenido' => 'required|string',
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

    public function updateNoticia(Request $request)
    {
        $id = $request->id;
        $noticia = Noticia::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string',
            'contenido' => 'required|string',
            'autor' => 'required|string',
            'fecha' => 'required|date'
        ]);

        $noticia->update($request->all());

        return response()->json($noticia, 200);
    }

    public function deleteNoticia($id)
    {
        $noticia = Noticia::findOrFail($id);
        $noticia->delete();

        return response()->json(null, 204);
    }


}
