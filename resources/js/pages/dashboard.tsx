import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/*container for 4 cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {/*container for charts */}
                    <div className='lg:col-span-3 flex flex-col gap-4'>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern className=''></PlaceholderPattern>
                        </div>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern></PlaceholderPattern>
                        </div>
                    </div>
                    {/*container for calendar and others */}
                    <div className='flex flex-col gap-4'>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern></PlaceholderPattern>
                        </div>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern></PlaceholderPattern>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
