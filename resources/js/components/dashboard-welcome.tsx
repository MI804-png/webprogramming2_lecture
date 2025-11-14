import { usePage } from '@inertiajs/react';
import { LayoutGrid, TrendingUp, Users, MessageSquare } from 'lucide-react';

export function DashboardWelcome() {
    const { props } = usePage<{
        auth: {user: any},
        dashboardStats: any
    }>();

    if (!props.auth.user) return null;

    const user = props.auth.user;
    const stats = props.dashboardStats;

    return (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-2">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="text-purple-100">
                        {user.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'} • Restaurant Hub
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{stats?.total_restaurants || 0}</div>
                        <div className="text-xs text-purple-200">Restaurants</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{stats?.user_orders || 0}</div>
                        <div className="text-xs text-purple-200">My Orders</div>
                    </div>
                    {stats?.unread_messages > 0 && (
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-300">{stats.unread_messages}</div>
                            <div className="text-xs text-purple-200">New Messages</div>
                        </div>
                    )}
                </div>
            </div>

            {user.role === 'admin' && (
                <div className="mt-4 pt-4 border-t border-purple-400/30">
                    <div className="flex items-center gap-4 text-sm text-purple-100">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>Total Messages: {stats?.total_messages || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>Total Orders: {stats?.total_orders || 0}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardWelcome;
