<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $dashboardStats = null;

        // Add dashboard stats for authenticated users
        if ($user) {
            $dashboardStats = [
                'total_restaurants' => \App\Models\Restaurant::count(),
                'total_dishes' => \App\Models\Dish::count(),
                'total_orders' => \App\Models\Order::count(),
                'total_messages' => \App\Models\Message::count(),
                'unread_messages' => \App\Models\Message::where('is_read', false)->count(),
                'user_orders' => \App\Models\Order::where('user_id', $user->id)->count(),
            ];
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
            ],
            'csrf_token' => csrf_token(),
            'app_url' => config('app.url'),
            'session_lifetime' => config('session.lifetime'),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'dashboardStats' => $dashboardStats,
            'navigation' => $this->getNavigationItems($user),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'info' => $request->session()->get('info'),
            ],
        ];
    }

    /**
     * Get navigation items based on user role
     */
    private function getNavigationItems($user): array
    {
        if (!$user) {
            return [
                ['name' => 'Home', 'href' => '/', 'icon' => 'Home'],
                ['name' => 'Restaurants', 'href' => '/restaurants', 'icon' => 'UtensilsCrossed'],
                ['name' => 'Contact', 'href' => '/contact', 'icon' => 'MessageSquare'],
                ['name' => 'Login', 'href' => '/login', 'icon' => 'LogIn'],
            ];
        }

        $navigation = [
            ['name' => 'Dashboard', 'href' => '/dashboard', 'icon' => 'LayoutDashboard'],
            ['name' => 'Restaurants', 'href' => '/restaurants', 'icon' => 'UtensilsCrossed'],
            ['name' => 'Messages', 'href' => '/messages', 'icon' => 'MessageSquare'],
            ['name' => 'Graphs', 'href' => '/graphs', 'icon' => 'BarChart'],
            ['name' => 'Contact', 'href' => '/contact', 'icon' => 'Mail'],
        ];

        // Add admin-only navigation items
        if ($user->role === 'admin') {
            $navigation[] = ['name' => 'Admin Panel', 'href' => '/admin', 'icon' => 'Shield'];
            $navigation[] = ['name' => 'Add Restaurant', 'href' => '/restaurants/create', 'icon' => 'Plus'];
        }

        // Add settings/profile items
        $navigation[] = ['name' => 'Profile', 'href' => '/settings/profile', 'icon' => 'User'];
        $navigation[] = ['name' => 'Settings', 'href' => '/settings/password', 'icon' => 'Settings'];

        return $navigation;
    }
}
