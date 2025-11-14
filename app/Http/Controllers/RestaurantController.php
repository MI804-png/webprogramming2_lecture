<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Dish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::where('is_active', true)->get();
        
        return Inertia::render('restaurants/index', [
            'restaurants' => $restaurants
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        $dishes = $restaurant->dishes()->where('is_available', true)->get();
        
        return Inertia::render('restaurants/show', [
            'restaurant' => $restaurant,
            'dishes' => $dishes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('restaurants/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'description' => 'nullable|string',
            'cuisine_type' => 'required|string|max:100',
            'rating' => 'nullable|numeric|min:1|max:5',
            'price_range' => 'nullable|string|max:10',
            'opening_hours' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'is_active' => 'boolean',
            'image_url' => 'nullable|url',
        ]);

        // Set default values for fields that can't be null
        $validated['rating'] = $validated['rating'] ?? 0;
        $validated['is_active'] = $validated['is_active'] ?? true;

        $restaurant = Restaurant::create($validated);

        return redirect()->route('restaurants.index')
            ->with('success', 'Restaurant created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        return Inertia::render('restaurants/edit', [
            'restaurant' => $restaurant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'description' => 'nullable|string',
            'cuisine_type' => 'required|string|max:100',
            'image_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $restaurant->update($validated);

        return redirect()->route('restaurants.show', $restaurant)
            ->with('success', 'Restaurant updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();

        return redirect()->route('restaurants.index')
            ->with('success', 'Restaurant deleted successfully.');
    }
}
