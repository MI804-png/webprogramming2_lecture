<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dishes = [
            // Pizza Palace dishes
            [
                'restaurant_id' => 1,
                'name' => 'Margherita Pizza',
                'description' => 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
                'price' => 12.99,
                'category' => 'Pizza',
                'image_url' => 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
                'is_available' => true,
                'preparation_time' => 15,
            ],
            [
                'restaurant_id' => 1,
                'name' => 'Pepperoni Pizza',
                'description' => 'Traditional pizza topped with pepperoni and mozzarella cheese',
                'price' => 14.99,
                'category' => 'Pizza',
                'image_url' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
                'is_available' => true,
                'preparation_time' => 15,
            ],
            // Sushi Heaven dishes
            [
                'restaurant_id' => 2,
                'name' => 'California Roll',
                'description' => 'Crab, avocado, and cucumber wrapped in seaweed and rice',
                'price' => 8.99,
                'category' => 'Sushi',
                'image_url' => 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
                'is_available' => true,
                'preparation_time' => 10,
            ],
            [
                'restaurant_id' => 2,
                'name' => 'Salmon Sashimi',
                'description' => 'Fresh salmon sliced and served without rice',
                'price' => 16.99,
                'category' => 'Sashimi',
                'image_url' => 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
                'is_available' => true,
                'preparation_time' => 5,
            ],
            // Burger Barn dishes
            [
                'restaurant_id' => 3,
                'name' => 'Classic Cheeseburger',
                'description' => 'Beef patty with cheese, lettuce, tomato, and special sauce',
                'price' => 11.99,
                'category' => 'Burger',
                'image_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
                'is_available' => true,
                'preparation_time' => 12,
            ],
            [
                'restaurant_id' => 3,
                'name' => 'BBQ Bacon Burger',
                'description' => 'Beef patty with bacon, BBQ sauce, and onion rings',
                'price' => 15.99,
                'category' => 'Burger',
                'image_url' => 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop',
                'is_available' => true,
                'preparation_time' => 15,
            ],
        ];

        foreach ($dishes as $dish) {
            \App\Models\Dish::create($dish);
        }
    }
}
