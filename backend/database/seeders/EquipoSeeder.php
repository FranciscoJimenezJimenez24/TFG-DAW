<?php

namespace Database\Seeders;

use App\Models\Equipo;
use App\Models\Liga;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $arrayCiudadPorPais = [
            "Inglaterra" => ["Londres", "Manchester", "Liverpool", "Birmingham", "Leeds", "Sheffield", "Bristol", "Nottingham", "Leicester", "Newcastle"],
            "España" => ["Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao", "Málaga", "Zaragoza", "Vigo", "Alicante", "Granada"],
            "Alemania" => ["Berlín", "Múnich", "Hamburgo", "Colonia", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Bremen", "Dortmund"],
            "Italia" => ["Roma", "Milán", "Nápoles", "Turín", "Palermo", "Génova", "Bolonia", "Florencia", "Venecia", "Catania"],
            "Francia" => ["París", "Marsella", "Lyon", "Toulouse", "Niza", "Burdeos", "Lille", "Estrasburgo", "Rennes", "Le Havre"],
            "Países Bajos" => ["Ámsterdam", "Róterdam", "La Haya", "Utrecht", "Eindhoven", "Groninga", "Tilburgo", "Almere", "Arnhem", "Leiden"],
            "Portugal" => ["Lisboa", "Oporto", "Coímbra", "Amadora", "Braga", "Funchal", "Évora", "Aveiro", "Vila Real", "Cascais"],
            "Argentina" => ["Buenos Aires", "Córdoba", "Rosario", "La Plata", "Mendoza", "Tucumán", "Mar del Plata", "Salta", "San Juan", "Santa Fe"],
            "Brasil" => ["São Paulo", "Río de Janeiro", "Brasilia", "Salvador", "Fortaleza", "Belo Horizonte", "Manaos", "Porto Alegre", "Curitiba", "Recife"],
            "México" => ["Ciudad de México", "Guadalajara", "Monterrey", "Cancún", "Puebla", "Tijuana", "Mérida", "León", "Querétaro", "Chihuahua"],
        ];
        $ligas = Liga::all();
        foreach ($ligas as $liga) {
            for ($i = 0; $i < 20; $i++) {
                Equipo::create([
                    'nombre' => fake()->company() . " FC",
                    'ciudad' => $arrayCiudadPorPais[$liga->pais][random_int(0, 9)],
                    'pais' => $liga->pais,
                    'liga_id' => $liga->id,
                    'escudo' => fake()->imageUrl(100, 100, 'sports'),
                ]);
            }
        }
    }
}
