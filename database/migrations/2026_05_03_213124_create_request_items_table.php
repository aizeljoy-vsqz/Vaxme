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
        Schema::create('request_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('name'); // recipient -> can be foreignId
            $table->string('vaccine'); // to do: foreignId('vaccine_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean('is_vaccinated')->default(false);
            // $table->unique(['name', 'vaccine']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_items');
    }
};
