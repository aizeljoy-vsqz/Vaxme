import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: '/inventory',
    },
];

export default function Inventory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* container for label & button */}
                <div className='flex justify-between'>
                    <div className='rounded-xl border'>
                        <PlaceholderPattern></PlaceholderPattern>
                    </div>
                    <div className='rounded-xl border'>
                        <PlaceholderPattern></PlaceholderPattern>
                    </div>
                </div>

                {/* container for table */}
                <div className='rounded-xl border'>
                    <PlaceholderPattern></PlaceholderPattern>
                </div>
            </div>
        </AppLayout>
    );
}
