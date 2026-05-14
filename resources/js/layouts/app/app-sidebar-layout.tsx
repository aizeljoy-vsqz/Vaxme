import { usePage } from '@inertiajs/react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { FirstLoginPasswordDialog } from '@/components/first-login-password-dialog';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { auth } = usePage<{
        auth?: {
            user?: {
                user_type?: string | null;
                is_first_login?: boolean;
            };
        };
    }>().props;
    const user = auth?.user;

    // Show first login dialog only for barangay users on first login
    const showFirstLoginDialog =
        !!user &&
        (user.user_type ?? '') === 'barangay' &&
        user.is_first_login === true;

    return (
        <>
            <AppShell variant="sidebar">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>

            {/* First Login Password Change Dialog - Barangay accounts only */}
            <FirstLoginPasswordDialog open={showFirstLoginDialog} />
        </>
    );
}
