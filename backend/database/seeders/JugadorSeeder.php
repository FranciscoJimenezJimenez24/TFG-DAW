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

                // Crear jugadores
                $jugadores = [];
                $posiciones = ['porteros', 'defensas', 'centrocampistas', 'delanteros'];
                foreach ($posiciones as $posicion) {
                    $clavePosicion = strtolower($posicion);
                    if (isset($equipoGenerado[$clavePosicion])) {
                        foreach ($equipoGenerado[$clavePosicion] as $minutos_jugados) {
                            $jugador = Jugador::create([
                                'nombre' => fake()->name(),
                                'posicion' => ucfirst(substr($posicion, 0, -1)),
                                'fecha_nacimiento' => fake()->date(),
                                'pais_id' => $paises->random()->id,
                                'equipo_id' => $equipo->id,
                            ]);
                            $jugadores[] = $jugador;
                        }
                    }
                }

                // Asignar minutos y estadísticas por temporada
                foreach ($temporadas as $temporada) {
                    // Generar minutos por posición para esta temporada
                    $minutosPorPosicion = $this->generarMinutosPorTemporada($equipoGenerado);

                    // Asignar minutos a los jugadores
                    foreach ($jugadores as $jugador) {
                        $posicion = strtolower($jugador->posicion) . 's'; // Convertir a clave del array
                        $minutos_jugados = array_shift($minutosPorPosicion[$posicion]);

                        // Asignación de estadísticas basada en la posición
                        $goles = $asistencias = $tarjetas_amarillas = $tarjetas_rojas = $paradas = $intercepciones = $pases_completos = $pases_totales = $entradas = $faltas = $despejes = $duelos_ganados = 0;

                        switch ($jugador->posicion) {
                            case 'Portero':
                                $factor = $minutos_jugados / 3420;
                                $jugo = $minutos_jugados > 10 ? 1 : (rand(0, 100) < ($minutos_jugados * 10) ? 1 : 0);
                                
                                $goles = 0;
                                $asistencias = $jugo ? rand(0, max(1, round(1 * $factor))) : 0;
                                $tarjetas_amarillas = $jugo ? rand(0, max(1, round(2 * $factor))) : 0;
                                $tarjetas_rojas = rand(0, 100) < (5 * $factor) ? 1 : 0;
                                $paradas = $jugo ? rand(
                                    max(0, round(20 * $factor - 10)), 
                                    round(150 * $factor)
                                ) : 0;
                                $intercepciones = $jugo ? rand(0, round(5 * $factor)) : 0;
                                $pases_completos = $jugo ? rand(
                                    max(0, round(100 * $factor - 50)), 
                                    round(300 * $factor)
                                ) : 0;
                                $pases_totales = $jugo ? $pases_completos + rand(0, max(1, round(20 * $factor))) : 0;
                                $entradas = $jugo ? rand(0, round(15 * $factor)) : 0;
                                $faltas = $jugo ? rand(0, round(15 * $factor)) : 0;
                                $despejes = $jugo ? rand(
                                    max(0, round(10 * $factor - 5)), 
                                    round(50 * $factor)
                                ) : 0;
                                $duelos_ganados = $jugo ? rand(0, round(10 * $factor)) : 0;
                                break;

                            case 'Defensa':
                                $factor = $minutos_jugados / 3420;
                                $jugo = $minutos_jugados > 10 ? 1 : (rand(0, 100) < ($minutos_jugados * 10) ? 1 : 0);
                                
                                $goles = $jugo ? rand(0, round(5 * $factor)) : 0;
                                $asistencias = $jugo ? rand(0, round(5 * $factor)) : 0;
                                $tarjetas_amarillas = $jugo ? rand(0, round(15 * $factor)) : 0;
                                $tarjetas_rojas = rand(0, 100) < (3 * $factor) ? 1 : 0;
                                $paradas = 0;
                                $intercepciones = $jugo ? rand(
                                    max(0, round(50 * $factor - 25)), 
                                    round(150 * $factor)
                                ) : 0;
                                $pases_completos = $jugo ? rand(
                                    max(0, round(300 * $factor - 150)), 
                                    round(800 * $factor)
                                ) : 0;
                                $pases_totales = $jugo ? $pases_completos + rand(10, round(50 * $factor)) : 0;
                                $entradas = $jugo ? rand(
                                    max(0, round(20 * $factor - 10)), 
                                    round(160 * $factor)
                                ) : 0;
                                $faltas = $jugo ? rand(
                                    max(0, round(10 * $factor - 5)), 
                                    round(90 * $factor)
                                ) : 0;
                                $despejes = $jugo ? rand(
                                    max(0, round(50 * $factor - 25)), 
                                    round(150 * $factor)
                                ) : 0;
                                $duelos_ganados = $jugo ? rand(
                                    max(0, round(150 * $factor - 75)), 
                                    round(250 * $factor)
                                ) : 0;
                                break;

                            case 'Centrocampista':
                                $factor = $minutos_jugados / 3420;
                                $jugo = $minutos_jugados > 10 ? 1 : (rand(0, 100) < ($minutos_jugados * 10) ? 1 : 0);
                                
                                $goles = $jugo ? rand(0, round(8 * $factor)) : 0;
                                $asistencias = $jugo ? rand(0, round(12 * $factor)) : 0;
                                $tarjetas_amarillas = $jugo ? rand(0, round(10 * $factor)) : 0;
                                $tarjetas_rojas = rand(0, 100) < (2 * $factor) ? 1 : 0;
                                $paradas = 0;
                                $intercepciones = $jugo ? rand(
                                    max(0, round(30 * $factor - 15)), 
                                    round(100 * $factor)
                                ) : 0;
                                $pases_completos = $jugo ? rand(
                                    max(0, round(400 * $factor - 200)), 
                                    round(1000 * $factor)
                                ) : 0;
                                $pases_totales = $jugo ? $pases_completos + rand(20, round(60 * $factor)) : 0;
                                $entradas = $jugo ? rand(
                                    max(0, round(30 * $factor - 15)), 
                                    round(180 * $factor)
                                ) : 0;
                                $faltas = $jugo ? rand(
                                    max(0, round(15 * $factor - 7)), 
                                    round(100 * $factor)
                                ) : 0;
                                $despejes = $jugo ? rand(0, round(50 * $factor)) : 0;
                                $duelos_ganados = $jugo ? rand(
                                    max(0, round(200 * $factor - 100)), 
                                    round(350 * $factor)
                                ) : 0;
                                break;

                            case 'Delantero':
                                $factor = $minutos_jugados / 3420;
                                $jugo = $minutos_jugados > 10 ? 1 : (rand(0, 100) < ($minutos_jugados * 10) ? 1 : 0);
                                
                                $goles = $jugo ? rand(0, round(25 * $factor)) : 0;
                                $asistencias = $jugo ? rand(0, round(10 * $factor)) : 0;
                                $tarjetas_amarillas = $jugo ? rand(0, round(5 * $factor)) : 0;
                                $tarjetas_rojas = rand(0, 100) < (1 * $factor) ? 1 : 0;
                                $paradas = 0;
                                $intercepciones = $jugo ? rand(0, round(10 * $factor)) : 0;
                                $pases_completos = $jugo ? rand(
                                    max(0, round(200 * $factor - 100)), 
                                    round(600 * $factor)
                                ) : 0;
                                $pases_totales = $jugo ? $pases_completos + rand(10, round(40 * $factor)) : 0;
                                $entradas = $jugo ? rand(0, round(80 * $factor)) : 0;
                                $faltas = $jugo ? rand(0, round(60 * $factor)) : 0;
                                $despejes = $jugo ? rand(0, round(10 * $factor)) : 0;
                                $duelos_ganados = $jugo ? rand(
                                    max(0, round(50 * $factor - 25)), 
                                    round(150 * $factor)
                                ) : 0;
                                break;
                        }

                        $estadistica = EstadisticasJugador::create([
                            'jugador_id' => $jugador->id,
                            'temporada_id' => $temporada->id,
                            'goles' => $goles,
                            'asistencias' => $asistencias,
                            'minutos_jugados' => $minutos_jugados,
                            'tarjetas_amarillas' => $tarjetas_amarillas,
                            'tarjetas_rojas' => $tarjetas_rojas,
                            'paradas' => $paradas,
                            'intercepciones' => $intercepciones,
                            'pases_completos' => $pases_completos,
                            'pases_totales' => $pases_totales,
                            'entradas' => $entradas,
                            'faltas' => $faltas,
                            'despejes' => $despejes,
                            'duelos_ganados' => $duelos_ganados,
                        ]);

                        $estadisticasEquipo[] = $estadistica->toArray();
                    }
                    $golesEquipo = array_sum(array_column($estadisticasEquipo, 'goles'));
                    $asistenciasTotales = array_sum(array_column($estadisticasEquipo, 'asistencias'));

                    if ($asistenciasTotales > $golesEquipo) {
                        $factorReduccion = $golesEquipo / max(1, $asistenciasTotales);
                        foreach ($estadisticasEquipo as &$estadistica) {
                            EstadisticasJugador::where('id', $estadistica['id'])
                                ->update([
                                    'asistencias' => round($estadistica['asistencias'] * $factorReduccion)
                                ]);
                        }
                    }
                }
            }
        }
    }

    // Función para generar el equipo con minutos distribuidos
    private function generarEquipo($formacion)
    {
        // Extraer los valores de la formación
        list($numDefensas, $numCentros, $numDelanteros) = str_split($formacion);

        // Calcular número base de jugadores por posición según formación
        $basePorteros = 2; // Mínimo 2 porteros
        $baseDefensas = $numDefensas * 2;
        $baseCentros = $numCentros * 2;
        $baseDelanteros = $numDelanteros * 2;

        // Añadir 3 jugadores extra (para llegar a 25)
        $extra = 3;

        // Distribuir los extras aleatoriamente entre posiciones
        $posicionesExtra = ['defensas', 'centrocampistas', 'delanteros'];
        $distribucionExtra = array_fill_keys($posicionesExtra, 0);

        for ($i = 0; $i < $extra; $i++) {
            $pos = $posicionesExtra[array_rand($posicionesExtra)];
            $distribucionExtra[$pos]++;
        }

        // Crear arrays de jugadores
        $porteros = array_fill(0, $basePorteros, 0);
        $defensas = array_fill(0, $baseDefensas + $distribucionExtra['defensas'], 0);
        $centrocampistas = array_fill(0, $baseCentros + $distribucionExtra['centrocampistas'], 0);
        $delanteros = array_fill(0, $baseDelanteros + $distribucionExtra['delanteros'], 0);

        return [
            'formacion' => $formacion,
            'porteros' => $porteros,
            'defensas' => $defensas,
            'centrocampistas' => $centrocampistas,
            'delanteros' => $delanteros,
        ];
    }

    // Función para generar minutos por temporada
    private function generarMinutosPorTemporada($equipoGenerado)
    {
        $minutosPorPosicion = [];

        // Extraer la formación del equipo
        $formacion = $equipoGenerado['formacion'];
        list($numDefensas, $numCentros, $numDelanteros) = str_split($formacion);

        foreach ($equipoGenerado as $posicion => $jugadores) {
            // Excluir la clave "formacion"
            if ($posicion === 'formacion') {
                continue;
            }

            // Calcular el total de minutos según la formación
            $totalMinutos = 0;
            switch ($posicion) {
                case 'porteros':
                    $totalMinutos = 3420; // Siempre 3420 para porteros
                    break;
                case 'defensas':
                    $totalMinutos = $numDefensas * 3420; // Minutos según la formación
                    break;
                case 'centrocampistas':
                    $totalMinutos = $numCentros * 3420; // Minutos según la formación
                    break;
                case 'delanteros':
                    $totalMinutos = $numDelanteros * 3420; // Minutos según la formación
                    break;
            }

            // Repartir minutos de forma aleatoria pero asegurando la suma total
            $minutosPorPosicion[$posicion] = $this->repartirMinutosAleatorios(count($jugadores), $totalMinutos);
        }

        return $minutosPorPosicion;
    }

    // Función para repartir minutos de forma aleatoria
    private function repartirMinutosAleatorios($cantidad, $totalMinutos)
    {
        $minutos = array_fill(0, $cantidad, 0);

        // Primero asignar minutos base a todos
        $minBase = min(500, floor($totalMinutos / $cantidad));
        for ($i = 0; $i < $cantidad; $i++) {
            $minutos[$i] = $minBase;
            $totalMinutos -= $minBase;
        }

        // Distribuir el resto favoreciendo a algunos jugadores
        while ($totalMinutos > 0) {
            $indice = rand(0, $cantidad - 1);
            $asignar = rand(100, 500);
            $asignar = min($asignar, $totalMinutos, 3420 - $minutos[$indice]);

            $minutos[$indice] += $asignar;
            $totalMinutos -= $asignar;
        }

        // Asegurar que al menos 2-3 jugadores tengan muchos minutos
        for ($i = 0; $i < min(3, $cantidad); $i++) {
            if ($minutos[$i] < 2500) {
                $necesario = 2500 - $minutos[$i];
                $donar = rand(0, $cantidad - 1);
                $puedeDonar = $minutos[$donar] - 500;

                if ($puedeDonar > 0) {
                    $transferir = min($necesario, $puedeDonar);
                    $minutos[$i] += $transferir;
                    $minutos[$donar] -= $transferir;
                }
            }
        }

        return $minutos;
    }
}