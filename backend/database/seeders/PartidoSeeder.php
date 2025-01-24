<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Partido;
use App\Models\Temporada;
use Illuminate\Database\Seeder;
use \App\Models\Liga;

class PartidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ligas = Liga::all();
        $temporadas = Temporada::all();
        foreach ($ligas as $liga) {
            $equipos = Equipo::get()->where('liga_id', $liga->id);
            foreach ($temporadas as $temporada) {
                for ($i = 0; $i < count($equipos); $i++) {
                    Partido::create(
                        [
                            'temporada_id' => $temporada->id,
                            'liga_id' => $liga->id,
                            'equipo_local_id' => $equipos[$i]->id,
                            'equipo_visitante_id' => $equipos[$i]->id,
                            'goles_local' => rand(0, 5),
                            'goles_visitante' => rand(0, 5),
                            'fecha' => $temporada->fecha_inicio->addDays(rand(0, 365))
                        ]);
                }
            }
        }
    }
}
