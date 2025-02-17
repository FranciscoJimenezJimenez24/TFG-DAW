<?php

namespace App\Http\Controllers;

use App\Models\Solicitud;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{

    public function getSolicitudes()
    {
        $solicitudes = Solicitud::all();
        return response()->json($solicitudes, 200);
    }
    public function addSolicitud(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'email' => 'required|string',
        ]);

        $solicitud = Solicitud::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'email' => $request->email,
        ]);
        return response()->json($solicitud, 201);
    }

    public function deleteSolicitud($id)
    {
        $solicitud = Solicitud::findOrFail($id);
        $solicitud->delete();

        return response()->json(null, 204);
    }
}
