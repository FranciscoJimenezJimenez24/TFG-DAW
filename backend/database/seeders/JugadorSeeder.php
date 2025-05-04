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
                        $factor_minutos = $minutos_jugados / 3420;

                        switch ($jugador->posicion) {
                            case 'Portero':
                                $goles = 0;
                                $asistencias = rand(0, round(1 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(2 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(1 * $factor_minutos));
                                $paradas = rand(20, round(150 * $factor_minutos));
                                $intercepciones = rand(0, round(5 * $factor_minutos));
                                $pases_completos = rand(100, round(300 * $factor_minutos));
                                $pases_totales = $pases_completos + rand(0, 20);
                                $entradas = rand(0, 1);
                                $faltas = rand(0, 2);
                                $despejes = rand(10, round(50 * $factor_minutos));
                                $duelos_ganados = rand(5, round(30 * $factor_minutos));
                                break;

                            case 'Defensa':
                                $goles = rand(0, round(5 * $factor_minutos));
                                $asistencias = rand(0, round(5 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(15 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(3 * $factor_minutos));
                                $paradas = 0;
                                $intercepciones = rand(10, round(50 * $factor_minutos));
                                $pases_completos = rand(300, round(800 * $factor_minutos));
                                $pases_totales = $pases_completos + rand(10, 50);
                                $entradas = rand(10, round(50 * $factor_minutos));
                                $faltas = rand(5, round(20 * $factor_minutos));
                                $despejes = rand(20, round(80 * $factor_minutos));
                                $duelos_ganados = rand(20, round(70 * $factor_minutos));
                                break;

                            case 'Centrocampista':
                                $goles = rand(0, round(10 * $factor_minutos));
                                $asistencias = rand(0, round(15 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(10 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(2 * $factor_minutos));
                                $paradas = 0;
                                $intercepciones = rand(10, round(40 * $factor_minutos));
                                $pases_completos = rand(400, round(1000 * $factor_minutos));
                                $pases_totales = $pases_completos + rand(20, 60);
                                $entradas = rand(5, round(30 * $factor_minutos));
                                $faltas = rand(5, round(20 * $factor_minutos));
                                $despejes = rand(5, round(20 * $factor_minutos));
                                $duelos_ganados = rand(20, round(80 * $factor_minutos));
                                break;

                            case 'Delantero':
                                $goles = rand(0, round(30 * $factor_minutos));
                                $asistencias = rand(0, round(10 * $factor_minutos));
                                $tarjetas_amarillas = rand(0, round(5 * $factor_minutos));
                                $tarjetas_rojas = rand(0, round(1 * $factor_minutos));
                                $paradas = 0;
                                $intercepciones = rand(2, round(10 * $factor_minutos));
                                $pases_completos = rand(200, round(600 * $factor_minutos));
                                $pases_totales = $pases_completos + rand(10, 40);
                                $entradas = rand(2, round(15 * $factor_minutos));
                                $faltas = rand(5, round(25 * $factor_minutos));
                                $despejes = rand(2, round(10 * $factor_minutos));
                                $duelos_ganados = rand(20, round(70 * $factor_minutos));
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
                            'paradas' => $paradas,
                            'intercepciones' => $intercepciones,
                            'pases_completos' => $pases_completos,
                            'pases_totales' => $pases_totales,
                            'entradas' => $entradas,
                            'faltas' => $faltas,
                            'despejes' => $despejes,
                            'duelos_ganados' => $duelos_ganados,
                        ]);
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

        // Minutos totales por línea
        $minutosPorLinea = [
            'porteros' => 3420,
            'defensas' => $numDefensas * 3420,
            'centrocampistas' => $numCentros * 3420,
            'delanteros' => $numDelanteros * 3420
        ];

        // Repartir porteros (1 a 3 porteros)
        $numPorteros = rand(1, 3);
        $porteros = array_fill(0, $numPorteros, 0); // Inicializar array de porteros

        // Repartir defensas
        $numDefensasTotal = rand($numDefensas, $numDefensas + 3); // Ajustar según necesidades
        $defensas = array_fill(0, $numDefensasTotal, 0); // Inicializar array de defensas

        // Repartir centrocampistas
        $numCentrocampistasTotal = rand($numCentros, $numCentros + 3); // Ajustar según necesidades
        $centrocampistas = array_fill(0, $numCentrocampistasTotal, 0); // Inicializar array de centrocampistas

        // Repartir delanteros
        $numDelanterosTotal = rand($numDelanteros, $numDelanteros + 2); // Ajustar según necesidades
        $delanteros = array_fill(0, $numDelanterosTotal, 0); // Inicializar array de delanteros

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

        // Distribuir minutos de forma aleatoria
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