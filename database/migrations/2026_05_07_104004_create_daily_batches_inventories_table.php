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
        Schema::create('daily_batches_inventories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('vaccine_batch_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->integer('stock_transferred');
            $table->integer('daily_dispense');
            $table->integer('number_of_receipients');
            $table->integer('current_balance');
            $table->integer('vaccine_lose');
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_batches_inventories');
    }
};
