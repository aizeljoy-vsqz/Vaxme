import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { 
        title: 'Inventory',
        href: '/inventory'
    },
];

export default function Inventory() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                HELLO WORLD!!!
            </div>

        </AppLayout>
    );
}