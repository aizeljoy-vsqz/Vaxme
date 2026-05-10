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
        if (Schema::hasTable('barangays') && !Schema::hasColumn('barangays', 'bhc_id')) {
            Schema::table('barangays', function (Blueprint $table) {

                $table->foreignId('bhc_id')
                    ->nullable()
                    ->after('id')
                    ->constrained('bhcs')
                    ->nullOnDelete()
                    ->cascadeOnUpdate();

            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('barangays') && Schema::hasColumn('barangays', 'bhc_id')) {
            Schema::table('barangays', function (Blueprint $table) {
                try {
                    $table->dropForeign(['bhc_id']);
                } catch (\Throwable $throwable) {
                    // SQLite may not support dropping the foreign key in the same way as MySQL.
                }

                $table->dropColumn('bhc_id');
            });
        }
    }
};
