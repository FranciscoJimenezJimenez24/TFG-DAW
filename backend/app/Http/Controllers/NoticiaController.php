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

    public function getNoticia($id)
    {
        $noticia = Noticia::findOrFail($id);
        return response()->json($noticia, 200);
    }

    public function addNoticia(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'autor' => 'required|string',
            'fecha_publicacion' => 'required|date'
        ]);

        $noticia = Noticia::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'autor' => $request->autor,
            'fecha_publicacion' => $request->fecha_publicacion
        ]);

        return response()->json($noticia, 201);
    }

    public function updateNoticia(Request $request)
    {
        $id = $request->id;
        $noticia = Noticia::findOrFail($id);

        $request->validate([
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'autor' => 'required|string',
            'fecha_publicacion' => 'required|date'
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

    public function getUltimasNoticias()
    {
        $noticias = Noticia::orderBy('fecha_publicacion', 'desc')
            ->take(6)
            ->get();
        return response()->json($noticias, 200);
    }
}
