<?php

namespace Database\Seeders;

use App\Models\Ciudad;
use App\Models\Pais;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CiudadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paises = Pais::all();
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
        for ($i = 0; $i < count($paises); $i++) {
            $pais = $paises[$i];
            $ciudades = $arrayCiudadPorPais[$pais->nombre];
            foreach ($ciudades as $ciudad) {
                Ciudad::create([
                    'nombre' => $ciudad,
                    'pais_id' => $pais->id
                ]);
            }
        }
    }
}
