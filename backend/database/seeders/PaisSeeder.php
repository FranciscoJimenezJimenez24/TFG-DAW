<?php

namespace Database\Seeders;

use App\Models\Pais;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paises = ['España', 'Inglaterra', 'Alemania', 'Italia', 'Francia', 'Argentina', 'Brasil', 'Portugal', 'Países Bajos', 'México'];
        foreach ($paises as $pais) {
            Pais::create([
                'nombre' => $pais,
                'bandera' => "https://flagcdn.com/w320/" . strtolower(substr($pais, 0, 2)) . ".png"
            ]);
        }
    }
}
