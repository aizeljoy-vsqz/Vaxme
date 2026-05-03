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
        if (Schema::hasTable('barangays')) {
            return;
        }

        Schema::create('barangays', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nurse_id')->default(0);
            $table->string('barangay_name');
            $table->string('nurse_assigned'); 
            $table->string('contact_number')->default('N/A');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barangays');
    }
};
