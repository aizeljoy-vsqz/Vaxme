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
        Schema::table('vaccine_batches', function (Blueprint $table) {
            if (! Schema::hasColumn('vaccine_batches', 'vaccine_type')) {
                $table->string('vaccine_type')->index();
            }

            if (! Schema::hasColumn('vaccine_batches', 'total_quantity')) {
                $table->integer('total_quantity')->default(0);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vaccine_batches', function (Blueprint $table) {
            if (Schema::hasColumn('vaccine_batches', 'vaccine_type')) {
                $table->dropColumn('vaccine_type');
            }

            if (Schema::hasColumn('vaccine_batches', 'total_quantity')) {
                $table->dropColumn('total_quantity');
            }
        });
    }
};
