<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Partido;
use App\Models\Temporada;
use DateTime;
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

            foreach ($temporadas as $temporada) {
                $equiposData = [];
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

                $partidos = [];
                for ($i = 0; $i < count($equiposData); $i++) {
                    for ($j = $i + 1; $j < count($equiposData); $j++) {
                        $partidos[] = [
                            'local' => $equiposData[$i],
                            'visitante' => $equiposData[$j],
                            'goles_local' => 0,
                            'goles_visitante' => 0
                        ];
                        $partidos[] = [
                            'local' => $equiposData[$j],
                            'visitante' => $equiposData[$i],
                            'goles_local' => 0,
                            'goles_visitante' => 0
                        ];
                    }
                }

                shuffle($partidos);

                foreach ($partidos as &$partido) {
                    $equipoLocal = $partido['local'];
                    $equipoVisitante = $partido['visitante'];
                    $partido['goles_local'] = $this->generarGoles($equipoLocal['Goles_Totales']);
                    $partido['goles_visitante'] = $this->generarGoles($equipoVisitante['Goles_Totales']);
                }
                unset($partido);

                $fecha_inicio = new DateTime(substr($temporada->nombre, -9, 4) . "-08-08");
                $fechas_disponibles = [];
                for ($i = 0; $i < 38; $i++) {
                    $fechas_disponibles[] = clone $fecha_inicio;
                    $fecha_inicio->modify("+7 days");
                }

                $jornadas = [];
                $equiposUsados = [];
                foreach ($fechas_disponibles as $fecha) {
                    $jornada = [];
                    $equiposUsados = [];
                    foreach ($partidos as $key => $partido) {
                        if (!in_array($partido['local']['Equipo']->id, $equiposUsados) && !in_array($partido['visitante']['Equipo']->id, $equiposUsados)) {
                            $jornada[] = $partido;
                            $equiposUsados[] = $partido['local']['Equipo']->id;
                            $equiposUsados[] = $partido['visitante']['Equipo']->id;
                            unset($partidos[$key]);
                        }
                        if (count($jornada) == 10) {
                            break;
                        }
                    }
                    $jornadas[] = $jornada;
                }

                foreach ($jornadas as $i => $jornada) {
                    foreach ($jornada as $partido) {
                        if (isset($partido['local']['Equipo']) && isset($partido['visitante']['Equipo'])) {
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
    }

    /**
     * Genera goles de manera probabilística basado en el total.
     */
    private function generarGoles($golesTotales)
    {
        $probabilidad = rand(0, 100);

        if ($golesTotales < 50) {
            if ($probabilidad < 50)
                return 0;
            if ($probabilidad < 80)
                return 1;
            if ($probabilidad < 95)
                return 2;
            return rand(3, 5);
        } else {
            if ($probabilidad < 30)
                return 0;
            if ($probabilidad < 60)
                return 1;
            if ($probabilidad < 85)
                return 2;
            return rand(3, 5);
        }
    }

    /**
     * Ajustar goles totales para un equipo.
     */
    private function ajustarGolesTotales($equipoData, &$partidos)
    {
        $equipo = $equipoData['Equipo'];
        $golesTotales = $equipoData['Goles_Totales'];
        $golesAcumulados = $this->sumarGolesEquipo($partidos, $equipo->id);
        $diferencia = $golesTotales - $golesAcumulados;

        foreach ($partidos as &$partido) {
            if ($diferencia === 0)
                break;


            // Ajustar goles como local
            if (isset($partido['local']['Equipo']) && $partido['local']['Equipo'] != null) {
                if ($partido['local']['Equipo']->id === $equipo->id && $diferencia > 0 && $partido['goles_local'] < 5) {
                    $partido['goles_local']++;
                    $diferencia--;
                } elseif ($partido['local']['Equipo']->id === $equipo->id && $diferencia < 0 && $partido['goles_local'] > 0) {
                    $partido['goles_local']--;
                    $diferencia++;
                }
            }

            // Ajustar goles como visitante
            if (isset($partido['visitante']['Equipo']) && $partido['visitante']['Equipo'] != null) {
                if ($partido['visitante']['Equipo']->id === $equipo->id && $diferencia > 0 && $partido['goles_visitante'] < 5) {
                    $partido['goles_visitante']++;
                    $diferencia--;
                } elseif ($partido['visitante']['Equipo']->id === $equipo->id && $diferencia < 0 && $partido['goles_visitante'] > 0) {
                    $partido['goles_visitante']--;
                    $diferencia++;
                }
            }
        }
        unset($partido);
    }

    /**
     * Suma los goles totales de un equipo en todos los partidos.
     */
    private function sumarGolesEquipo($partidos, $equipoId)
    {
        $totalGoles = 0;
        foreach ($partidos as $partido) {
            if (isset($partido['local']['Equipo']) && $partido['local']['Equipo']->id === $equipoId) {
                $totalGoles += $partido['goles_local'];
            }
            if (isset($partido['visitante']['Equipo']) && $partido['visitante']['Equipo']->id === $equipoId) {
                $totalGoles += $partido['goles_visitante'];
            }
        }

        return $totalGoles;
    }
}
