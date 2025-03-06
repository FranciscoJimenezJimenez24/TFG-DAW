<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\EstadisticasJugador;
use App\Models\Jugador;
use App\Models\Liga;
use App\Models\Pais;
use App\Models\Temporada;
use Illuminate\Database\Seeder;

class JugadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $ligas = Liga::all();
        $temporadas = Temporada::all();
        $paises = Pais::all();
        foreach ($ligas as $liga) {
            $equipos = Equipo::where('liga_id', $liga->id)->get();
            foreach ($equipos as $equipo) {
                // Selecciona una formación aleatoria
                $formacionSeleccionada = str_replace('-', '', $equipo->formacion);

                // Genera el equipo con minutos distribuidos
                $equipoGenerado = $this->generarEquipo($formacionSeleccionada);

                // Se calcula el número total de jugadores
                $num_jugadores = count($equipoGenerado['porteros']) + count($equipoGenerado['defensas']) +
                    count($equipoGenerado['centrocampistas']) + count($equipoGenerado['delanteros']);

                // Repartir los minutos para cada grupo de jugadores
                $jugadores = [];
                $posiciones = ['porteros', 'defensas', 'centrocampistas', 'delanteros'];
                foreach ($posiciones as $posicion) {
                    // Utiliza la clave correcta en minúsculas para acceder al array
                    $clavePosicion = strtolower($posicion);  // 'portero', 'defensa', 'centrocampista', 'delantero'
                    // Verifica si la clave de la posición existe
                    if (isset($equipoGenerado[$clavePosicion])) {
                        $minutosPorPosicion = $equipoGenerado[$clavePosicion];
                    } else {
                        continue;  // Si no existe, pasa a la siguiente posición
                    }
                    foreach ($minutosPorPosicion as $minutos_jugados) {
                        $jugador = Jugador::create([
                            'nombre' => fake()->name(),
                            'posicion' => ucfirst(substr($posicion, 0, -1)),
                            'fecha_nacimiento' => fake()->date(),
                            'pais_nacimiento' => $paises->random()->nombre,
                            'equipo_id' => $equipo->id,
                        ]);

                        // Guardar el jugador para asignar minutos en cada temporada
                        $jugadores[] = $jugador;
                    }
                }

                // Redistribuir minutos por temporada
                foreach ($temporadas as $temporada) {
                    $minutosTotales = 37620;
                    $minutosPorJugador = $this->repartirMinutosDesbalanceado(count($jugadores), $minutosTotales);

                    foreach ($jugadores as $index => $jugador) {
                        $minutos_jugados = $minutosPorJugador[$index];

                        // Asignación de estadísticas basada en la posición
                        $goles = $asistencias = $tarjetas_amarillas = $tarjetas_rojas = 0;
                        $factor_minutos = $minutos_jugados / 3420; // Factor proporcional basado en los minutos jugados

                        switch ($jugador->posicion) {
                            case 'Portero':
                                $goles = 0;
                                $asistencias = rand(0, round(1 * $factor_minutos));
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

    // Función para generar el equipo con minutos distribuidos
    private function generarEquipo($formacion)
    {
        $numJugadores = rand(15, 30);

        // Extraer los valores de la formación
        list($numDefensas, $numCentros, $numDelanteros) = str_split($formacion);

        // Minutos totales
        $totalMinutos = 11 * 3420;
        $minutosPorLinea = [
            'portero' => 3420,
            'defensa' => $numDefensas * 3420,
            'centrocampista' => $numCentros * 3420,
            'delantero' => $numDelanteros * 3420
        ];

        // Repartir porteros (1 a 3 porteros)
        $numPorteros = rand(1, 3);
        $porteros = $this->repartirMinutosDesbalanceado($numPorteros, $minutosPorLinea['portero']);

        // Repartir minutos en las otras posiciones
        $defensas = $this->repartirMinutosDesbalanceado(rand($numDefensas, $numJugadores - ($numCentros + $numDelanteros + $numPorteros)), $minutosPorLinea['defensa']);
        $centrocampistas = $this->repartirMinutosDesbalanceado(rand($numCentros, $numJugadores - (count($defensas) + $numDelanteros + $numPorteros)), $minutosPorLinea['centrocampista']);
        $delanteros = $this->repartirMinutosDesbalanceado(rand($numDelanteros, $numJugadores - (count($defensas) + count($centrocampistas) + $numPorteros)), $minutosPorLinea['delantero']);

        return [
            'formacion' => $formacion,
            'porteros' => $porteros,
            'defensas' => $defensas,
            'centrocampistas' => $centrocampistas,
            'delanteros' => $delanteros,
        ];
    }

    // Función para repartir los minutos desbalanceados
    private function repartirMinutosDesbalanceado($cantidad, $totalMinutos)
    {
        $minutos = array_fill(0, $cantidad, 0);

        // Distribuir minutos de forma aleatoria con variabilidad
        for ($i = 0; $i < $cantidad; $i++) {
            $minutos[$i] = rand(0, min(3420, $totalMinutos - ($cantidad - $i - 1)));
            $totalMinutos -= $minutos[$i];
        }

        // Ajustar si queda alguna diferencia por redondeos
        while ($totalMinutos > 0) {
            $indice = array_rand($minutos);
            if ($minutos[$indice] < 3420) {
                $incremento = min(rand(1, 100), $totalMinutos, 3420 - $minutos[$indice]);
                $minutos[$indice] += $incremento;
                $totalMinutos -= $incremento;
            }
        }

        return $minutos;
    }
}