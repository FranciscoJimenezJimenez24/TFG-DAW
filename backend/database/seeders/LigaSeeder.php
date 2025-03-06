<?php

namespace Database\Seeders;

use App\Models\Liga;
use App\Models\Pais;
use Illuminate\Database\Seeder;

class LigaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paises = Pais::all();
        foreach ($paises as $pais) {
            Liga::create([
                'nombre' => "Liga $pais->nombre",
                'pais_id' => $pais->id,
                'bandera' => $pais->bandera
            ]);
        }
    }
}
