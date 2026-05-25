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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bhc_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('rhu_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('batch_id')->nullable()->nullOnDelete()->cascadeOnUpdate();
            $table->foreignId('original_request_id')->nullable()->constrained('requests')->nullOnDelete();
            $table->enum('type', ['request', 'return']);
            $table->enum('status', ['submitted', 'reviewed', 'approved', 'rejected'])->default('submitted');
            $table->text('rejection_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
