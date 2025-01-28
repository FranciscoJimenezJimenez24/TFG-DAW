<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\EstadisticasJugador;
use App\Models\Jugador;
use App\Models\Liga;
use App\Models\Temporada;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class JugadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $ligas = Liga::all();
        $temporadas = Temporada::all();
        foreach ($ligas as $liga) {
            $equipos = Equipo::where('liga_id', $liga->id)->get();
            foreach ($equipos as $equipo) {
                $num_jugadores = rand(15, 30);
                $minutos = [];
                for ($a = 0; $a < 5; $a++) {
                    // Inicializar la lista de minutos con valores aleatorios
                    $minutosTemporada = array();
                    for ($i = 0; $i < $num_jugadores; $i++) {
                        $minutosTemporada[] = rand(0, 3420);
                    }

                    // Ajustar los minutos para que sumen exactamente total_minutos
                    $suma_actual = array_sum($minutosTemporada);
                    while ($suma_actual != 37620) {
                        for ($i = 0; $i < $num_jugadores; $i++) {
                            if ($suma_actual < 37620 && $minutosTemporada[$i] < 3420) {
                                $minutosTemporada[$i]++;
                                $suma_actual++;
                            } elseif ($suma_actual > 37620 && $minutosTemporada[$i] > 0) {
                                $minutosTemporada[$i]--;
                                $suma_actual--;
                            }
                            if ($suma_actual == 37620) {
                                break;
                            }
                        }
                    }

                    $minutos[] = $minutosTemporada;
                }
                $posiciones = ['Portero', 'Defensa', 'Centrocampista', 'Delantero'];
                for ($i = 0; $i < $num_jugadores; $i++) {
                    $posicion = $posiciones[rand(0, 3)];
                    $jugador = Jugador::create([
                        'nombre' => fake()->name(),
                        'posicion' => $posicion,
                        'equipo_id' => $equipo->id,
                    ]);
                    $edad = rand(16, 37) - 1;
                    foreach ($temporadas as $j => $temporada) {
                        $minutos_jugados = $minutos[$j][$i];
                        $goles = $asistencias = $tarjetas_amarillas = $tarjetas_rojas = 0;
                        $factor_minutos = $minutos_jugados / 3420; // Factor proporcional basado en los minutos jugados

                        switch ($posicion) {
                            case 'Portero':
                                $goles = 0;
                                $asistencias = rand(0, round(5 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(2 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(1 * $factor_minutos));
                                break;
                            case 'Defensa':
                                $goles = rand(0, round(5 * $factor_minutos));
                                $asistencias = rand(0, round(5 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(15 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(3 * $factor_minutos));
                                break;
                            case 'Centrocampista':
                                $goles = rand(0, round(10 * $factor_minutos));
                                $asistencias = rand(0, round(20 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(10 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(2 * $factor_minutos));
                                break;
                            case 'Delantero':
                                $goles = rand(0, round(30 * $factor_minutos));
                                $asistencias = rand(0, round(10 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(5 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(1 * $factor_minutos));
                                break;
                        }
                        EstadisticasJugador::create([
                            'jugador_id' => $jugador->id,
                            'temporada_id' => $temporada->id,
                            'edad' => $edad++,
                            'goles' => $goles,
                            'asistencias' => $asistencias,
                            'minutos_jugados' => $minutos_jugados,
                            'tarjetas_amarillas' => $tarjetas_amarillas,
                            'tarjetas_rojas' => $tarjetas_rojas,
                        ]);

                    }
                }

            }
        }
    }
}
