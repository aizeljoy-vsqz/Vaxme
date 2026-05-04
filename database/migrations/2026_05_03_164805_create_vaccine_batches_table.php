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
        Schema::create('vaccine_batches', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            // $table->foreignId('rhu_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('vaccine_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('batch_number');
            $table->date('expiration_date');
            $table->integer('current_balance');
            $table->integer('stock_receive');
            $table->boolean('status')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccine_batches');
    }
};
