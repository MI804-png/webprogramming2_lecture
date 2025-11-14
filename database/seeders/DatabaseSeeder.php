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

        // Create personal admin account
        User::create([
            'name' => 'Mikhael Nabil',
            'email' => 'mikha.nabil13@gmail.com',
            'password' => bcrypt('mikha@2001'),
            'role' => 'admin',
        ]);

        // Create regular user
        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
        ]);

        // Create sample messages
        \App\Models\Message::create([
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'subject' => 'Question about reservations',
            'message' => 'Hi, I would like to know if you accept reservations for parties of 8 or more. We are planning a birthday celebration next weekend.',
            'is_read' => false,
        ]);

        \App\Models\Message::create([
            'name' => 'Sarah Johnson',
            'email' => 'sarah.johnson@email.com',
            'subject' => 'Catering Services',
            'message' => 'Hello! I am interested in your catering services for a corporate event. Could you please provide information about your menu options and pricing for 50 people?',
            'is_read' => true,
        ]);

        \App\Models\Message::create([
            'name' => 'Mike Wilson',
            'email' => 'mike.wilson@company.com',
            'subject' => 'Dietary Restrictions',
            'message' => 'Do you have options for people with gluten sensitivity and vegan dietary preferences? I am planning to visit with my family next week.',
            'is_read' => false,
        ]);

        // Seed restaurants and dishes
        $this->call([
            RestaurantSeeder::class,
            DishSeeder::class,
        ]);
    }
}
