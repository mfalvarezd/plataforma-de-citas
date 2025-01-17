<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('availability_id')->constrained('availabilities')->onDelete('cascade'); //relacion con disponibilidades
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade'); // Relación con la tabla users
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled'])->default('pending'); // Estado de la cita
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
