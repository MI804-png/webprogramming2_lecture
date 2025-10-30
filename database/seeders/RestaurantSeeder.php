<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurants = [
            [
                'name' => 'Pizza Palace',
                'address' => '123 Main Street, Downtown',
                'phone' => '+1-555-0123',
                'email' => 'info@pizzapalace.com',
                'description' => 'Authentic Italian pizza made with fresh ingredients and traditional recipes.',
                'cuisine_type' => 'Italian',
                'rating' => 4.5,
                'image_url' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Sushi Heaven',
                'address' => '456 Ocean Drive, Seaside',
                'phone' => '+1-555-0456',
                'email' => 'contact@sushiheaven.com',
                'description' => 'Fresh sushi and Japanese cuisine prepared by master chefs.',
                'cuisine_type' => 'Japanese',
                'rating' => 4.8,
                'image_url' => 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
            [
                'name' => 'Burger Barn',
                'address' => '789 Food Court, Mall District',
                'phone' => '+1-555-0789',
                'email' => 'orders@burgerbarn.com',
                'description' => 'Gourmet burgers made with premium beef and artisanal buns.',
                'cuisine_type' => 'American',
                'rating' => 4.2,
                'image_url' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
                'is_active' => true,
            ],
        ];

        foreach ($restaurants as $restaurant) {
            \App\Models\Restaurant::create($restaurant);
        }
    }
}
