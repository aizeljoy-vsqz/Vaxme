import { Link, usePage } from '@inertiajs/react';
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon, Clock, Layers, LayoutGrid, StickyNote, UsersRound } from 'lucide-react';
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
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: '',
        icon: Layers,
    },
];

const BarangayNavItems: NavItem[] = [
    {
        title: 'Vaccine Request',
        href: '',
        icon: StickyNote,
    },
    {
        title: 'Registration',
        href: '',
        icon: UsersRound,
    },
];

const BHCNavItems: NavItem[] = [
    {
        title: 'Request new vaccines',
        href: '',
        icon: ArrowBigRightDashIcon,
    },
    {
        title: 'Return vaccines',
        href: '',
        icon: ArrowBigLeftDashIcon,
    },
    {
        title: 'Vaccination History',
        href: '',
        icon: Clock,
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
