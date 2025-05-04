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
        $paises = [
            'España' => 'es',
            'Inglaterra' => 'gb-eng',
            'Alemania' => 'de',
            'Italia' => 'it',
            'Francia' => 'fr',
            'Argentina' => 'ar',
            'Brasil' => 'br',
            'Portugal' => 'pt',
            'Países Bajos' => 'nl',
            'México' => 'mx',
        ];
        
        foreach ($paises as $nombre => $codigo) {
            Pais::create([
                'nombre' => $nombre,
                'bandera' => "https://flagcdn.com/w320/$codigo.png"
            ]);
        }
    }
}
