<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('estadisticas_jugador', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jugador_id')->constrained('jugadores')->onDelete('cascade');
            $table->foreignId('temporada_id')->constrained()->onDelete('cascade');
            $table->integer('edad');
            $table->integer('goles')->default(0);
            $table->integer('asistencias')->default(0);
            $table->integer('minutos_jugados')->default(0);
            $table->integer('tarjetas_amarillas')->default(0);
            $table->integer('tarjetas_rojas')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estadisticas_jugador');
    }
};
