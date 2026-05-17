<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Rhu;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create RHU for test user
        $rhu = Rhu::create([
            'user_id' => $user->id,
            'facility_name' => 'Regional Health Unit - Test',
            'address' => 'Test Address, City',
            'nurse_assigned' => 'Nurse Maria',
        ]);

        // Assign RHU to user
        $user->update(['rhu_id' => $rhu->id]);
    }
}
