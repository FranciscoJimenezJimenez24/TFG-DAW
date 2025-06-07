<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PaisSeeder::class,
            CiudadSeeder::class,
            LigaSeeder::class,
            EquipoSeeder::class,
            TemporadaSeeder::class,
            JugadorSeeder::class,
            PartidoSeeder::class,
            PuntuacionSeeder::class,
            NoticiaSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
