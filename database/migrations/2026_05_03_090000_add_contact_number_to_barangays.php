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
        if (Schema::hasTable('barangays') && !Schema::hasColumn('barangays', 'contact_number')) {
            Schema::table('barangays', function (Blueprint $table) {
                $table->string('contact_number')->default('N/A');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('barangays') && Schema::hasColumn('barangays', 'contact_number')) {
            try {
                Schema::table('barangays', function (Blueprint $table) {
                    $table->dropColumn('contact_number');
                });
            } catch (\Exception $e) {
                // ignore for SQLite/backwards compatibility
            }
        }
    }
};
