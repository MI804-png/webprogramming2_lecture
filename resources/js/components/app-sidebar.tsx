import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, UtensilsCrossed, MessageSquare, BarChart, Mail, Shield, Plus, User, Settings, Home, LogIn } from 'lucide-react';
import AppLogo from './app-logo';

const iconMap = {
    'Home': Home,
    'LayoutDashboard': LayoutGrid,
    'UtensilsCrossed': UtensilsCrossed,
    'MessageSquare': MessageSquare,
    'BarChart': BarChart,
    'Mail': Mail,
    'Shield': Shield,
    'Plus': Plus,
    'User': User,
    'Settings': Settings,
    'LogIn': LogIn,
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/MI804-png/webprogramming2_lecture',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { props } = usePage<{
        navigation: Array<{name: string, href: string, icon: string}>,
        auth: {user: any},
        dashboardStats: any
    }>();

    const mainNavItems: NavItem[] = props.navigation?.map(item => ({
        title: item.name,
        href: item.href,
        icon: iconMap[item.icon as keyof typeof iconMap] || LayoutGrid,
    })) || [];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                
                {/* Dashboard Stats Widget */}
                {props.auth.user && props.dashboardStats && (
                    <div className="p-4 mx-2 mt-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Stats</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Restaurants</span>
                                <span className="font-medium text-purple-600 dark:text-purple-400">{props.dashboardStats.total_restaurants}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600 dark:text-gray-400">Messages</span>
                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                    {props.dashboardStats.total_messages}
                                    {props.dashboardStats.unread_messages > 0 && (
                                        <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
                                            {props.dashboardStats.unread_messages}
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-600 dark:text-gray-400">My Orders</span>
                                <span className="font-medium text-green-600 dark:text-green-400">{props.dashboardStats.user_orders}</span>
                            </div>
                        </div>
                    </div>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
