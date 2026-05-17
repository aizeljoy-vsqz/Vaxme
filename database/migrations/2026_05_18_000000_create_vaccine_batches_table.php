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
            $table->foreignId('rhu_id')->constrained('rhus')->onDelete('cascade');
            $table->string('batch_number')->unique()->index();
            $table->string('vaccine_type')->index();
            $table->integer('total_quantity')->default(0);
            $table->integer('current_balance')->default(0);
            $table->date('expiration_date')->index();
            $table->timestamps();
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
