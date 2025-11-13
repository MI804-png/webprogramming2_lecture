<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@restaurant.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Create regular user
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);

        // Seed restaurants and dishes
        $this->call([
            RestaurantSeeder::class,
            DishSeeder::class,
        ]);
    }
}
