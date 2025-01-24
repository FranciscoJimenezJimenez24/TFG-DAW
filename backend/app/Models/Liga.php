<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Liga extends Model
{
    protected $fillable = ['nombre', 'ciudad', 'pais', 'escudo', 'liga_id'];

    protected static function booted()
    {
        static::creating(function ($equipo) {
            $liga = Liga::find($equipo->liga_id);
            if ($liga) {
                $equipo->pais = $liga->pais; // Asigna el país de la liga al equipo
            }
        });

        static::updating(function ($equipo) {
            $liga = Liga::find($equipo->liga_id);
            if ($liga) {
                $equipo->pais = $liga->pais; // Actualiza el país si cambia la liga
            }
        });
    }
}
