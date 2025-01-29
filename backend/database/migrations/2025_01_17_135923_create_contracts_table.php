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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->onDelete('cascade'); // Relación con la tabla services
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade'); // Relación con la tabla users (cliente)
            $table->foreignId('freelancer_id')->constrained('users')->onDelete('cascade'); // Relación con la tabla users (freelancer)
            $table->enum('status', allowed: ['pending','active', 'confirmed', 'completed', 'cancelled'])->default('pending'); // Estado del contrato
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
