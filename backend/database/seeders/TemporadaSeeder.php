<?php

namespace Database\Seeders;

use App\Models\Temporada;
use Illuminate\Database\Seeder;

class TemporadaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $anios = ['2020/2021', '2021/2022', '2022/2023', '2023/2024', '2024/2025'];
        foreach ($anios as $anio) {
            Temporada::create(['nombre' => "Temporada $anio"]);
        }
    }
}
