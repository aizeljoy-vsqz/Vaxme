import { Head } from '@inertiajs/react';
import { BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function NotificationPage() {

    return (
        <>
            <Head title="Notifications" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-sm text-gray-600 mt-1">Stay updated with the latest activities and important alerts.</p>
                    </div>
                    <Button
                        className="disabled:opacity-50"
                    >
                        Mark all as read
                    </Button>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 px-6 py-16 text-center">
                    <div className="rounded-full bg-gray-100 p-3 shadow-sm ring-1 ring-gray-200">
                        <BellOff className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900">No notifications yet</p>
                        <p className="text-sm text-gray-500">You will see updates here once available</p>
                    </div>
                </div>

            </div>
        </>
    );
}

NotificationPage.layout = {
    breadcrumbs: [
        {
            href: '/notifications',
        },
    ],
};
