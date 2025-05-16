<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partido extends Model
{
    use HasFactory;

    protected $fillable = [
        'liga_id',
        'temporada_id',
        'equipo_local_id',
        'equipo_visitante_id',
        'fecha',
        'goles_local',
        'goles_visitante'
    ];

    public function liga()
    {
        return $this->belongsTo(Liga::class, 'liga_id');
    }

    public function temporada()
    {
        return $this->belongsTo(Temporada::class, 'temporada_id');
    }

    public function equipoLocal()
    {
        return $this->belongsTo(Equipo::class, 'equipo_local_id');
    }

    public function equipoVisitante()
    {
        return $this->belongsTo(Equipo::class, 'equipo_visitante_id');
    }


}
