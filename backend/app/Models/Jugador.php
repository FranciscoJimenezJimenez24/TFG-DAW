<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugador extends Model
{
    use HasFactory;

    protected $table = 'jugadores';

    protected $fillable = [
        'nombre',
        'posicion',
        'equipo_id',
        'pais_id',
        'fecha_nacimiento',
    ];

    public function equipo()
    {
        return $this->belongsTo(Equipo::class);
    }

}
