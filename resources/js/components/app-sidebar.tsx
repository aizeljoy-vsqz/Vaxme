import { Link } from '@inertiajs/react';
import { Layers, LayoutGrid, SquareChartGantt, StickyNote, UsersRound } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { batchesVaccineInventory, dashboard, vaccineManagement, vaccineRequest } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: batchesVaccineInventory(),
        icon: Layers,
    },
    {
        title: 'Vaccine Management',
        href: vaccineManagement(),
        icon: SquareChartGantt,
    },
];
const BarangayNavItems: NavItem[] = [
    {
        title: 'Vaccine Request',
        href: vaccineRequest(),
        icon: StickyNote,
    },
    {
        title: 'Registration',
        href: '/registration',
        icon: UsersRound,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} sidebarLabel="Actions" />
                <NavMain items={BarangayNavItems} sidebarLabel="Barangay Management" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
