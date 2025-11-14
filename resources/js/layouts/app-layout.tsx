/**
 * Restaurant Hub Application Layout  
 * UI/UX Design: Szabo Lilla (BDCRL0)
 * Technical Implementation: Mikhael Nabil Salama Rezk (IHUTSC)
 * 
 * Features:
 * - Responsive navigation with role-based menu items
 * - Modern gradient design with Tailwind CSS
 * - Mobile-first responsive layout
 * - Accessibility-focused component structure
 */

import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import DashboardWelcome from '@/components/dashboard-welcome';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    showDashboardWelcome?: boolean;
}

export default ({ children, breadcrumbs, showDashboardWelcome = true, ...props }: AppLayoutProps) => {
    const { props: pageProps } = usePage<{
        auth: {user: any}
    }>();

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {/* Show dashboard welcome on authenticated pages */}
            {pageProps.auth.user && showDashboardWelcome && (
                <div className="p-6 pb-0">
                    <DashboardWelcome />
                </div>
            )}
            <div className={pageProps.auth.user ? "p-6 pt-0" : "p-6"}>
                {children}
            </div>
        </AppLayoutTemplate>
    );
};
