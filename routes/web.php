<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Simple test route that doesn't use Inertia
Route::get('/test', function () {
    return response()->json([
        'status' => 'Laravel is working!',
        'timestamp' => now(),
        'environment' => app()->environment(),
        'debug' => config('app.debug'),
        'url' => config('app.url')
    ]);
});

// Simple admin test route
Route::get('/admin-test', function () {
    return response()->json([
        'status' => 'Admin route working!',
        'timestamp' => now(),
        'routes_exist' => [
            'admin' => \Route::has('admin.dashboard'),
            'dashboard' => \Route::has('dashboard'),
            'messages' => \Route::has('messages.index')
        ],
        'users_count' => \App\Models\User::count(),
        'admin_users' => \App\Models\User::where('role', 'admin')->count()
    ]);
});

// Test auto-login route for debugging
Route::get('/test-login', function () {
    $user = \App\Models\User::where('email', 'admin@restaurant.com')->first();
    if ($user) {
        \Auth::login($user, true); // Remember the user
        session()->regenerate(); // Regenerate session for security
        
        return redirect('/dashboard')->with('success', 'Auto-logged in as admin!');
    }
    return redirect('/login')->with('error', 'Admin user not found!');
});

// Force login and test dashboard access
Route::get('/force-login-test', function () {
    $user = \App\Models\User::where('email', 'admin@restaurant.com')->first();
    if (!$user) {
        return response()->json(['error' => 'Admin user not found']);
    }
    
    // Force login
    \Auth::login($user, true);
    
    // Check authentication status
    $authStatus = [
        'authenticated' => auth()->check(),
        'user_id' => auth()->id(),
        'user_email' => auth()->user()?->email,
        'session_id' => session()->getId(),
        'session_started' => session()->isStarted(),
    ];
    
    return response()->json([
        'message' => 'Force login attempted',
        'auth_status' => $authStatus,
        'next_step' => 'Try accessing /dashboard now'
    ]);
});

// CSRF token refresh route
Route::get('/csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
});

// Public routes - specific routes BEFORE parameterized routes
Route::get('/restaurants', [App\Http\Controllers\RestaurantController::class, 'index'])->name('restaurants.index');

// Admin routes (temporarily without middleware for testing) - Define admin routes FIRST
Route::group([], function () {
    Route::get('/admin', [App\Http\Controllers\DashboardController::class, 'admin'])->name('admin.dashboard');
    
    // CRUD for restaurants (admin only) - specific routes like 'create' will be defined here
    Route::resource('restaurants', App\Http\Controllers\RestaurantController::class)->except(['index', 'show']);
});

// Public parameterized routes AFTER all specific routes
// Note: specific routes like /restaurants/create must come BEFORE parameterized routes like /restaurants/{restaurant}
Route::get('/restaurants/{restaurant}', [App\Http\Controllers\RestaurantController::class, 'show'])->name('restaurants.show');
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

// Temporary debug routes for messages (no auth required)
Route::get('/debug/messages', function () {
    $messages = \App\Models\Message::orderBy('created_at', 'desc')->get();
    return response()->json([
        'messages_count' => $messages->count(),
        'messages' => $messages->toArray(),
        'auth_status' => auth()->check(),
        'user' => auth()->user()
    ]);
});

Route::get('/debug/messages/{id}', function ($id) {
    $message = \App\Models\Message::find($id);
    if (!$message) {
        return response()->json(['error' => 'Message not found'], 404);
    }
    return response()->json([
        'message' => $message->toArray(),
        'auth_status' => auth()->check(),
        'user' => auth()->user()
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

// Debug authentication routes (temporary)
Route::get('/debug/auth-status', function () {
    return response()->json([
        'authenticated' => auth()->check(),
        'user' => auth()->user(),
        'session_started' => session()->isStarted(),
        'session_id' => session()->getId(),
        'guards' => array_keys(config('auth.guards')),
        'default_guard' => config('auth.defaults.guard'),
    ]);
});

Route::get('/debug/simple-dashboard', function () {
    if (!auth()->check()) {
        return response()->json(['error' => 'Not authenticated']);
    }
    return response()->json([
        'message' => 'Dashboard access successful!',
        'user' => auth()->user(),
        'role' => auth()->user()->role ?? 'no role'
    ]);
});

// Simple test login (temporary)
Route::post('/debug/simple-login', function () {
    $email = request('email');
    $password = request('password');
    
    if (!$email || !$password) {
        return response()->json(['error' => 'Email and password required'], 400);
    }
    
    $user = \App\Models\User::where('email', $email)->first();
    
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }
    
    if (!\Hash::check($password, $user->password)) {
        return response()->json(['error' => 'Invalid password'], 401);
    }
    
    // Try to log in the user
    \Auth::login($user, true);
    
    return response()->json([
        'success' => true,
        'authenticated' => auth()->check(),
        'user' => auth()->user(),
        'session_id' => session()->getId(),
        'redirect_url' => '/dashboard'
    ]);
});

// Test route that bypasses authentication middleware
Route::get('/test/messages-no-auth', function () {
    $messages = \App\Models\Message::orderBy('created_at', 'desc')->get();
    
    return \Inertia\Inertia::render('messages/index', [
        'messages' => $messages
    ]);
});

// Simple Inertia test route
Route::get('/test/simple-inertia', function () {
    return \Inertia\Inertia::render('test-simple', [
        'message' => 'Hello from Inertia!',
        'timestamp' => now()->toString(),
        'messages_count' => \App\Models\Message::count()
    ]);
});

// Authenticated routes (temporarily without auth for testing - will restore auth later)
Route::group([], function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    
    // Messages (for registered users)
    Route::get('/messages', [App\Http\Controllers\MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{message}', [App\Http\Controllers\MessageController::class, 'show'])->name('messages.show');
    
    // Admin message management routes
    Route::get('/messages/{message}/edit', [App\Http\Controllers\MessageController::class, 'edit'])->name('messages.edit');
    Route::put('/messages/{message}', [App\Http\Controllers\MessageController::class, 'update'])->name('messages.update');
    Route::delete('/messages/{message}', [App\Http\Controllers\MessageController::class, 'destroy'])->name('messages.destroy');
    Route::post('/messages/{message}/reply', [App\Http\Controllers\MessageController::class, 'reply'])->name('messages.reply');
    
    // Graphs
    Route::get('/graphs', [App\Http\Controllers\DashboardController::class, 'graphs'])->name('graphs.index');
});

// Admin routes (temporarily without middleware for testing)
Route::group([], function () {
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
        'session_info' => [
            'session_started' => session()->isStarted(),
            'session_id' => session()->getId(),
            'csrf_token' => csrf_token(),
        ],
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

// Temporary test routes removed - all functionality working properly

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

// Application status route
Route::get('/app-status', function () {
    return view('app-status', [
        'users' => \App\Models\User::all(['name', 'email', 'role', 'created_at']),
        'restaurants' => \App\Models\Restaurant::count(),
        'messages' => \App\Models\Message::count(),
        'routes' => [
            'admin' => route('admin.dashboard', [], false),
            'login' => route('login', [], false),
            'dashboard' => route('dashboard', [], false),
        ]
    ]);
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
