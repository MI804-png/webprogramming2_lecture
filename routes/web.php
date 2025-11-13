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
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin', [App\Http\Controllers\DashboardController::class, 'admin'])->name('admin.dashboard');
    
    // CRUD for restaurants (admin only)
    Route::resource('restaurants', App\Http\Controllers\RestaurantController::class)->except(['index', 'show']);
});

// Debug route for admin testing
Route::get('/debug-admin', function () {
    $user = auth()->user();
    $adminUserExists = \App\Models\User::where('role', 'admin')->exists();
    $totalUsers = \App\Models\User::count();
    
    return response()->json([
        'authenticated' => auth()->check(),
        'user' => $user ? [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role ?? 'no role set',
        ] : null,
        'is_admin' => $user ? ($user->role === 'admin') : false,
        'database_info' => [
            'admin_user_exists' => $adminUserExists,
            'total_users' => $totalUsers,
            'admin_users' => \App\Models\User::where('role', 'admin')->pluck('email')->toArray(),
        ],
        'routes' => [
            'admin_exists' => \Route::has('admin.dashboard'),
            'admin_url' => route('admin.dashboard', [], false),
        ]
    ]);
});

// Simple admin user creation route for production setup
Route::get('/create-admin-user', function () {
    if (\App\Models\User::where('email', 'admin@restaurant.com')->exists()) {
        return 'Admin user already exists!';
    }
    
    \App\Models\User::create([
        'name' => 'Admin User',
        'email' => 'admin@restaurant.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
        'email_verified_at' => now(),
    ]);
    
    return 'Admin user created successfully! Email: admin@restaurant.com, Password: password';
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
