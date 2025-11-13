<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public routes
Route::resource('restaurants', App\Http\Controllers\RestaurantController::class)->only(['index', 'show']);
Route::get('/contact', [App\Http\Controllers\ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [App\Http\Controllers\ContactController::class, 'store'])->name('contact.store');

// Debug routes for CSRF and session testing
Route::get('/debug/csrf', function () {
    return response()->json([
        'csrf_token' => csrf_token(),
        'session_started' => session()->isStarted(),
        'session_id' => session()->getId(),
        'session_token' => session()->token(),
        'request_token' => request()->header('X-CSRF-TOKEN'),
        'cookies' => request()->cookies->all(),
    ]);
});

Route::post('/debug/test-csrf', function () {
    return response()->json([
        'message' => 'CSRF validation passed!',
        'token_from_request' => request()->input('_token'),
        'token_from_header' => request()->header('X-CSRF-TOKEN'),
        'session_token' => session()->token(),
    ]);
});

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // Messages (for registered users)
    Route::get('/messages', [App\Http\Controllers\MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [App\Http\Controllers\MessageController::class, 'show'])->name('messages.show');
    
    // Graphs
    Route::get('/graphs', [App\Http\Controllers\DashboardController::class, 'graphs'])->name('graphs.index');
});

// Admin routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/admin', [App\Http\Controllers\DashboardController::class, 'admin'])->name('admin.dashboard');
    
    // CRUD for restaurants (admin only)
    Route::resource('restaurants', App\Http\Controllers\RestaurantController::class)->except(['index', 'show']);
});

// Temporary route for seeding database on deployment
Route::get('/seed-database', function () {
    try {
        Artisan::call('db:seed');
        return 'Database seeded successfully! ' . Artisan::output();
    } catch (Exception $e) {
        return 'Seeding failed: ' . $e->getMessage();
    }
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
