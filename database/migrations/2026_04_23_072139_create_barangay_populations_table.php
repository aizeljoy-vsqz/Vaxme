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
        if (Schema::hasTable('barangay_populations')) {
            return;
        }

        Schema::create('barangay_populations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bhc_id')->constrained()->cascadeOnDelete();
            $table->string('age_range');
            $table->integer('male')->default(0);
            $table->integer('female')->default(0);
            $table->integer('total')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barangay_populations');
    }
};
