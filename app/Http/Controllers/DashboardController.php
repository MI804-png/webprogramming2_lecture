<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Dish;
use App\Models\Order;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function graphs()
    {
        // Get restaurant count by cuisine type for chart
        $cuisineData = Restaurant::select('cuisine_type', DB::raw('count(*) as count'))
            ->groupBy('cuisine_type')
            ->get();

        // Get orders by month for the current year
        $ordersByMonth = Order::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
        ->whereYear('created_at', date('Y'))
        ->groupBy('month')
        ->orderBy('month')
        ->get();

        return Inertia::render('graphs/index', [
            'cuisineData' => $cuisineData,
            'ordersByMonth' => $ordersByMonth
        ]);
    }

    public function admin()
    {
        // Only allow admin users
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Access denied');
        }

        $stats = [
            'restaurants' => Restaurant::count(),
            'dishes' => Dish::count(),
            'orders' => Order::count(),
            'messages' => Message::count(),
            'unread_messages' => Message::where('is_read', false)->count(),
        ];

        $recentOrders = Order::with(['user', 'restaurant', 'dish'])
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get();

        $recentMessages = Message::orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'recentMessages' => $recentMessages
        ]);
    }
}
