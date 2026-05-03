<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('barangays')) {
            Schema::table('barangays', function (Blueprint $table) {
                if (! Schema::hasColumn('barangays', 'nurse_assigned')) {
                    $table->string('nurse_assigned')->nullable()->after('name');
                }
            });

            if (Schema::hasColumn('barangays', 'contact_name')) {
                DB::table('barangays')
                    ->whereNull('nurse_assigned')
                    ->update(['nurse_assigned' => DB::raw('contact_name')]);
            }

            Schema::table('barangays', function (Blueprint $table) {
                if (Schema::hasColumn('barangays', 'contact_name')) {
                    $table->dropColumn('contact_name');
                }

                if (Schema::hasColumn('barangays', 'contact_number')) {
                    $table->dropColumn('contact_number');
                }
            });
        }

        if (Schema::hasTable('barangay_populations')) {
            // No schema changes required for `user_id` or `rhu_id` in this migration.
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('barangays')) {
            Schema::table('barangays', function (Blueprint $table) {
                if (! Schema::hasColumn('barangays', 'contact_name')) {
                    $table->string('contact_name')->nullable()->after('name');
                }

                if (! Schema::hasColumn('barangays', 'contact_number')) {
                    $table->string('contact_number')->nullable()->after('contact_name');
                }
            });

            DB::table('barangays')
                ->whereNull('contact_name')
                ->update(['contact_name' => DB::raw('nurse_assigned')]);

            Schema::table('barangays', function (Blueprint $table) {
                if (Schema::hasColumn('barangays', 'nurse_assigned')) {
                    $table->dropColumn('nurse_assigned');
                }
            });
        }

        if (Schema::hasTable('barangay_populations')) {
            // No rollback changes for `user_id` or `rhu_id` since they were not added here.
        }
    }
};
