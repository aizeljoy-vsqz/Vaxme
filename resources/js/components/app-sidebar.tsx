import { Link, usePage } from '@inertiajs/react';
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon, Clock, Layers, LayoutGrid, PackageCheck, StickyNote, UsersRound, SquareChartGantt } from 'lucide-react';
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
import { dashboard, batchesVaccineInventory, vaccineManagement, vaccineRequest } from '@/routes';
import bhc from '@/routes/bhc';
import history from '@/routes/history';
import returnMethod from '@/routes/return';
import track from '@/routes/track';
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

const BHCNavItems: NavItem[] = [
    {
        title: 'Request new vaccines',
        href: bhc.dashboard(),
        icon: ArrowBigRightDashIcon,
    },
    {
        title: 'Track & Manage',
        href: track.vaccination(),
        icon: PackageCheck,
    },
    {
        title: 'Return vaccines',
        href: returnMethod.vaccine(),
        icon: ArrowBigLeftDashIcon,
    },
];

export function AppSidebar() {

    const { auth } = usePage().props;
    const userType = auth.user.user_type;

    // RHU Sidebar
    if (userType === 'rhu') {
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
                    <NavMain items={mainNavItems} sidebarLabel='Actions' />
                    <NavMain items={BarangayNavItems} sidebarLabel='Barangay Management' />
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        );
    }

    // BHC Sidebar
    if (userType === 'bhc') {
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
                    <NavMain items={BHCNavItems} sidebarLabel='Actions' />
                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        );
    }


}
