<?php

namespace Database\Seeders;

use App\Models\EstadisticasJugador;
use App\Models\Partido;
use App\Models\Puntuacion;
use App\Models\Temporada;
use Illuminate\Database\Seeder;

class PuntuacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $temporadas = Temporada::all();

        foreach ($temporadas as $temporada) {
            $estadisticas = EstadisticasJugador::with('jugador.equipo')
                ->where('temporada_id', $temporada->id)
                ->get();

            foreach ($estadisticas as $estadistica) {

                $jugador = $estadistica->jugador;
                // Si no hay jugador o no tiene equipo, saltamos
                if (!$jugador || !$jugador->equipo) {
                    continue;
                }

                $equipo = $jugador->equipo;

                // Calcular victorias
                $victorias = Partido::where('temporada_id', $temporada->id)
                    ->where(function ($q) use ($equipo) {
                        $q->where(function ($q2) use ($equipo) {
                            $q2->where('equipo_local_id', $equipo->id)
                                ->whereColumn('goles_local', '>', 'goles_visitante');
                        })->orWhere(function ($q2) use ($equipo) {
                            $q2->where('equipo_visitante_id', $equipo->id)
                                ->whereColumn('goles_visitante', '>', 'goles_local');
                        });
                    })->count();

                // Calcular puntuación
                $mult_p = [
                    'Portero' => 1,
                    'Defensa' => 0.95,
                    'Centrocampista' => 0.90,
                    'Delantero' => 0.95
                ];
                
                $pos = $jugador->posicion;
                $mult = $mult_p[$pos] ?? 1;
                
                $puntuacion = 0;
                $puntuacion += $estadistica->goles * 5;
                $puntuacion += $estadistica->asistencias * 2;
                $puntuacion += $estadistica->minutos_jugados * 0.03;
                $puntuacion -= $estadistica->tarjetas_amarillas * 1;
                $puntuacion -= $estadistica->tarjetas_rojas * 3;
                $puntuacion += $estadistica->paradas * 1.5;
                $puntuacion += $estadistica->intercepciones * 0.75;
                $puntuacion += $estadistica->pases_completos * 0.02;
                $puntuacion -= ($estadistica->pases_totales - $estadistica->pases_completos) * 0.05; 
                $puntuacion += $estadistica->entradas * 0.4;
                $puntuacion -= $estadistica->faltas * 0.2;
                $puntuacion += $estadistica->despejes * 0.3;
                $puntuacion += $estadistica->duelos_ganados * 0.2;
                $puntuacion += $victorias * 3;
                
                // Aplicar multiplicador por posición
                $puntuacion *= $mult;
                
                // Guardar puntuación
                Puntuacion::create([
                    'jugador_id' => $jugador->id,
                    'temporada_id' => $temporada->id,
                    'equipo_id' => $equipo->id,
                    'puntuacion' => round($puntuacion, 2),
                ]);
            }
        }
    }

}
