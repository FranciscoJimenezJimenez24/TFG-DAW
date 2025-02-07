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
    private function distribuirMinutosPorteros($numPorteros, $totalMinutos)
    {
        $minutos = [];
        $minutosRestantes = $totalMinutos;

        // Asignar la mayor parte de los minutos al primer portero (90%)
        $minutos[0] = round(0.9 * $totalMinutos);
        $minutosRestantes -= $minutos[0];

        // Distribuir el resto de minutos entre los demás porteros
        if ($numPorteros > 1) {
            $minutos[1] = round($minutosRestantes / 2);
            $minutosRestantes -= $minutos[1];
        }

        if ($numPorteros > 2) {
            $minutos[2] = $minutosRestantes;
        }

        // Asegurarse de que la suma de los minutos sea exactamente 3420
        $sumaMinutos = array_sum($minutos);
        if ($sumaMinutos != $totalMinutos) {
            $diferencia = $totalMinutos - $sumaMinutos;
            $minutos[0] += $diferencia;
        }

        return $minutos;
    }

    public function run()
    {
        $ligas = Liga::all();
        $temporadas = Temporada::all();
        foreach ($ligas as $liga) {
            $equipos = Equipo::where('liga_id', $liga->id)->get();
            foreach ($equipos as $equipo) {
                // Aseguramos que el número de jugadores esté entre 15 y 30
                $num_jugadores = rand(15, 30);

                $minutos = [];
                for ($a = 0; $a < 5; $a++) {
                    // Inicializar la lista de minutos con valores aleatorios para jugadores
                    $minutosTemporada = array();
                    for ($i = 0; $i < $num_jugadores; $i++) {
                        $minutosTemporada[] = rand(0, 3420);
                    }

                    // Ajustar los minutos para que sumen exactamente 37620
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

                $posiciones = ['Defensa', 'Centrocampista', 'Delantero']; // Quitamos la posición de "Portero"
                $porteros = [];  // Guardamos los porteros de este equipo

                // Asignamos los porteros de forma controlada
                $num_porteros = rand(1, 3); // Elegimos entre 1 y 3 porteros
                for ($p = 0; $p < $num_porteros; $p++) {
                    $porteros[] = 'Portero';
                }

                // Asignar el resto de jugadores en las otras posiciones
                $porteros_minutos = $this->distribuirMinutosPorteros($num_porteros, 3420);
                $portero_index = 0; // Índice para los porteros

                for ($i = 0; $i < $num_jugadores; $i++) {
                    if ($i < $num_porteros) {
                        // Asignamos la posición de portero a los primeros $num_porteros jugadores
                        $posicion = 'Portero';
                        $minutos_jugados = $porteros_minutos[$portero_index];
                        $portero_index++; // Incrementamos el índice para el siguiente portero
                    } else {
                        // Asignamos una posición aleatoria para los demás jugadores
                        $posicion = $posiciones[rand(0, count($posiciones) - 1)];
                        $minutos_jugados = $minutos[0][$i]; // Asignamos minutos a jugadores no porteros
                    }

                    $jugador = Jugador::create([
                        'nombre' => fake()->name(),
                        'posicion' => $posicion,
                        'equipo_id' => $equipo->id,
                    ]);

                    $edad = rand(16, 37) - 1;
                    foreach ($temporadas as $j => $temporada) {
                        $goles = $asistencias = $tarjetas_amarillas = $tarjetas_rojas = 0;
                        $factor_minutos = $minutos_jugados / 3420; // Factor proporcional basado en los minutos jugados

                        switch ($posicion) {
                            case 'Portero':
                                $goles = 0;
                                $asistencias = rand(0, round(1 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(3 * $factor_minutos));
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
                                $asistencias = rand(0, round(15 * $factor_minutos));
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
