<?php

namespace Database\Seeders;

use App\Models\Liga;
use Illuminate\Database\Seeder;

class LigaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paises = ['España', 'Inglaterra', 'Alemania', 'Italia', 'Francia', 'Argentina', 'Brasil', 'Portugal', 'Países Bajos', 'México'];

        foreach ($paises as $pais) {
            Liga::create([
                'nombre' => "Liga $pais",
                'pais' => $pais,
                'bandera' => "https://flagcdn.com/w320/" . strtolower(substr($pais, 0, 2)) . ".png"
            ]);
        }
    }
}
