<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Partido;
use App\Models\Temporada;
use DateTime;
use Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PartidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ligas = DB::table('ligas')->get();
        $temporadas = Temporada::all();

        foreach ($ligas as $liga) {
            $equipos = Equipo::where('liga_id', $liga->id)->get();
            $numEquipos = count($equipos);

            foreach ($temporadas as $temporada) {
                $equiposData = [];

                // 1. Obtener goles totales por equipo
                foreach ($equipos as $equipo) {
                    $golesTotales = DB::table('estadisticas_jugador')
                        ->join('jugadores', 'estadisticas_jugador.jugador_id', '=', 'jugadores.id')
                        ->where('jugadores.equipo_id', $equipo->id)
                        ->where('estadisticas_jugador.temporada_id', $temporada->id)
                        ->sum('estadisticas_jugador.goles');

                    $equiposData[] = [
                        'Equipo' => $equipo,
                        'Goles_Totales' => $golesTotales
                    ];
                }

                // 2. Generar todos los emparejamientos posibles (ida y vuelta)
                $partidos = [];
                for ($i = 0; $i < $numEquipos; $i++) {
                    for ($j = 0; $j < $numEquipos; $j++) {
                        if ($i != $j) { // Un equipo no juega contra sí mismo
                            $partidos[] = [
                                'local' => $equiposData[$i],
                                'visitante' => $equiposData[$j],
                                'goles_local' => 0,
                                'goles_visitante' => 0
                            ];
                        }
                    }
                }

                // 3. Distribuir goles proporcionalmente según el rendimiento del equipo
                foreach ($partidos as &$partido) {
                    $partido['goles_local'] = $this->asignarGolesIniciales(
                        $partido['local']['Goles_Totales'],
                        $partido['local']['Equipo']->id,
                        $partidos
                    );

                    $partido['goles_visitante'] = $this->asignarGolesIniciales(
                        $partido['visitante']['Goles_Totales'],
                        $partido['visitante']['Equipo']->id,
                        $partidos
                    );
                }
                unset($partido);

                // 4. Ajuste fino para igualar exactamente los goles
                foreach ($equiposData as $equipoData) {
                    $this->ajustePrecisoGoles($equipoData, $partidos);
                }

                // 5. Organizar en jornadas (sin modificar esta parte)
                $fechas_disponibles = $this->generarFechasTemporada($temporada);
                $jornadas = $this->distribuirEnJornadas($partidos, $numEquipos);

                // 6. Crear partidos en la base de datos
                foreach ($jornadas as $i => $jornada) {
                    foreach ($jornada as $partido) {
                        Partido::create([
                            'temporada_id' => $temporada->id,
                            'liga_id' => $liga->id,
                            'equipo_local_id' => $partido['local']['Equipo']->id,
                            'equipo_visitante_id' => $partido['visitante']['Equipo']->id,
                            'goles_local' => $partido['goles_local'],
                            'goles_visitante' => $partido['goles_visitante'],
                            'fecha' => $fechas_disponibles[$i]->format('Y-m-d'),
                        ]);
                    }
                }
            }
        }
    }

    /**
     * Asigna goles iniciales proporcionales al rendimiento del equipo.
     */
    private function asignarGolesIniciales($golesTotalesEquipo, $equipoId, &$partidos)
    {
        $partidosEquipo = array_filter($partidos, function ($p) use ($equipoId) {
            return $p['local']['Equipo']->id == $equipoId || $p['visitante']['Equipo']->id == $equipoId;
        });

        $numPartidos = count($partidosEquipo);
        if ($numPartidos == 0)
            return 0;

        // Distribución más precisa usando floats para evitar desviaciones
        $golesPorPartido = $golesTotalesEquipo / $numPartidos;
        $golesBase = floor($golesPorPartido);
        $probabilidadExtra = $golesPorPartido - $golesBase;

        return $golesBase + (rand(0, 100) < ($probabilidadExtra * 100) ? 1 : 0);
    }

    /**
     * Ajusta los goles para que coincidan exactamente con el total esperado.
     */
    private function ajustePrecisoGoles($equipoData, &$partidos)
    {
        $equipo = $equipoData['Equipo'];
        $golesTotales = $equipoData['Goles_Totales'];
        $golesActuales = $this->sumarGolesEquipo($partidos, $equipo->id);
        $diferencia = $golesTotales - $golesActuales;

        if ($diferencia == 0)
            return;

        // Ordenar partidos por aquellos donde el equipo tenga menos goles
        usort($partidos, function ($a, $b) use ($equipo) {
            $aGoles = $this->obtenerGolesEquipoEnPartido($a, $equipo->id);
            $bGoles = $this->obtenerGolesEquipoEnPartido($b, $equipo->id);
            return $aGoles <=> $bGoles;
        });

        foreach ($partidos as &$partido) {
            if ($diferencia == 0)
                break;

            $esLocal = ($partido['local']['Equipo']->id == $equipo->id);
            $esVisitante = ($partido['visitante']['Equipo']->id == $equipo->id);

            if ($esLocal) {
                if ($diferencia > 0) {
                    $partido['goles_local']++;
                    $diferencia--;
                } elseif ($diferencia < 0 && $partido['goles_local'] > 0) {
                    $partido['goles_local']--;
                    $diferencia++;
                }
            } elseif ($esVisitante) {
                if ($diferencia > 0) {
                    $partido['goles_visitante']++;
                    $diferencia--;
                } elseif ($diferencia < 0 && $partido['goles_visitante'] > 0) {
                    $partido['goles_visitante']--;
                    $diferencia++;
                }
            }
        }

        // Si aún hay diferencia, forzar ajuste en partidos aleatorios
        if ($diferencia != 0) {
            shuffle($partidos);
            foreach ($partidos as &$partido) {
                if ($diferencia == 0)
                    break;

                $esLocal = ($partido['local']['Equipo']->id == $equipo->id);
                $esVisitante = ($partido['visitante']['Equipo']->id == $equipo->id);

                if ($esLocal && $diferencia > 0) {
                    $partido['goles_local'] += $diferencia;
                    $diferencia = 0;
                } elseif ($esVisitante && $diferencia > 0) {
                    $partido['goles_visitante'] += $diferencia;
                    $diferencia = 0;
                }
            }
        }
    }

    /**
     * Obtiene los goles de un equipo en un partido específico.
     */
    private function obtenerGolesEquipoEnPartido($partido, $equipoId)
    {
        if ($partido['local']['Equipo']->id == $equipoId) {
            return $partido['goles_local'];
        } elseif ($partido['visitante']['Equipo']->id == $equipoId) {
            return $partido['goles_visitante'];
        }
        return 0;
    }

    /**
     * Suma los goles de un equipo en todos los partidos.
     */
    private function sumarGolesEquipo($partidos, $equipoId)
    {
        $total = 0;
        foreach ($partidos as $p) {
            if ($p['local']['Equipo']->id == $equipoId) {
                $total += $p['goles_local'];
            }
            if ($p['visitante']['Equipo']->id == $equipoId) {
                $total += $p['goles_visitante'];
            }
        }
        return $total;
    }

    private function generarFechasTemporada($temporada)
    {
        $fechas = [];
        $fechaInicio = new DateTime(substr($temporada->nombre, -9, 4) . "-08-08");

        for ($i = 0; $i < 38; $i++) {
            $fechas[] = clone $fechaInicio;
            $fechaInicio->modify("+7 days");
        }

        return $fechas;
    }

    private function distribuirEnJornadas($partidos, $numEquipos)
    {
        // 1. Separar partidos de ida y vuelta
        $partidosIda = [];
        $partidosVuelta = [];

        foreach ($partidos as $partido) {
            $localId = $partido['local']['Equipo']->id;
            $visitanteId = $partido['visitante']['Equipo']->id;

            if (!isset($partidosVuelta["$visitanteId-$localId"])) {
                $partidosIda["$localId-$visitanteId"] = $partido;
            } else {
                $partidosVuelta["$localId-$visitanteId"] = $partido;
            }
        }

        // 2. Generar calendario round-robin para la ida
        $jornadasIda = $this->generarCalendarioRoundRobin(array_values($partidosIda), $numEquipos);

        // 3. Generar vuelta invirtiendo local/visitante
        $jornadasVuelta = [];
        foreach ($jornadasIda as $jornada) {
            $nuevaJornada = [];
            foreach ($jornada as $partido) {
                $nuevaJornada[] = [
                    'local' => $partido['visitante'],
                    'visitante' => $partido['local'],
                    'goles_local' => $partido['goles_visitante'],
                    'goles_visitante' => $partido['goles_local']
                ];
            }
            $jornadasVuelta[] = $nuevaJornada;
        }

        return array_merge($jornadasIda, $jornadasVuelta);
    }

    private function generarCalendarioRoundRobin($partidos, $numEquipos)
    {
        $equipos = array_values(array_unique(array_map(function ($p) {
            return $p['local']['Equipo']->id;
        }, $partidos)));

        $jornadas = array_fill(0, $numEquipos - 1, []);
        $equipoFijo = $equipos[0];
        $equiposRotatorios = array_slice($equipos, 1);

        for ($jornada = 0; $jornada < $numEquipos - 1; $jornada++) {
            // Partido del equipo fijo
            $partido = $this->buscarPartido(
                $partidos,
                $equipoFijo,
                end($equiposRotatorios),
                true
            );
            $jornadas[$jornada][] = $partido;

            // Partidos entre equipos rotatorios
            for ($i = 1; $i < $numEquipos / 2; $i++) {
                $local = $equiposRotatorios[$i - 1];
                $visitante = $equiposRotatorios[count($equiposRotatorios) - $i - 1];

                $partido = $this->buscarPartido($partidos, $local, $visitante, true);
                $jornadas[$jornada][] = $partido;
            }

            // Rotar equipos
            array_unshift($equiposRotatorios, array_pop($equiposRotatorios));
        }

        return $jornadas;
    }

    private function buscarPartido($partidos, $localId, $visitanteId, $crearSiNoExiste = false)
    {
        foreach ($partidos as $partido) {
            if (
                $partido['local']['Equipo']->id == $localId &&
                $partido['visitante']['Equipo']->id == $visitanteId
            ) {
                return $partido;
            }
        }

        if ($crearSiNoExiste) {
            // Crear un partido básico si no existe (con goles 0-0)
            return [
                'local' => ['Equipo' => (object) ['id' => $localId]],
                'visitante' => ['Equipo' => (object) ['id' => $visitanteId]],
                'goles_local' => 0,
                'goles_visitante' => 0
            ];
        }

        throw new Exception("Partido no encontrado: $localId vs $visitanteId");
    }

}