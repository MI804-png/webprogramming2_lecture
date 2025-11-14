import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { props } = usePage<{
        auth: {user: any},
        dashboardStats: any
    }>();

    // Default dashboard breadcrumbs if none provided
    const defaultBreadcrumbs: BreadcrumbItemType[] = props.auth.user ? [
        { title: 'Dashboard', href: '/dashboard' }
    ] : [
        { title: 'Home', href: '/' }
    ];

    const activeBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 flex-1">
                <SidebarTrigger className="-ml-1" />
                <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-purple-600" />
                    <Breadcrumbs breadcrumbs={activeBreadcrumbs} />
                </div>
            </div>
            
            {/* Quick dashboard indicator for authenticated users */}
            {props.auth.user && props.dashboardStats && (
                <div className="hidden md:flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <span>Restaurants:</span>
                        <span className="font-medium text-purple-600">{props.dashboardStats.total_restaurants}</span>
                    </div>
                    {props.dashboardStats.unread_messages > 0 && (
                        <div className="flex items-center gap-1">
                            <span>Unread:</span>
                            <span className="font-medium text-red-600">{props.dashboardStats.unread_messages}</span>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
