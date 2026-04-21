import { Head } from '@inertiajs/react';

export default function DailyInventory() {
    return (
        <>
            <Head title="Daily Inventory" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3>Daily Vaccine Inventory</h3>
            </div>
        </>
    );
}

DailyInventory.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '',
        },
    ],
};
