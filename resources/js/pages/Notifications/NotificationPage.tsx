import { Head } from '@inertiajs/react';
import { BellOff, CheckCircle, Package, Clock3, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: number
  type: "request" | "return" | "near_expired" | "expired" | "low_stock"
  bhc_id: number | null
  is_read: boolean
  created_at: string
    bhc?: {
        barangay_name: string;
        nurse_assigned?: string | null;
    } | null;
  meta?: Record<string, any>
}

export default function NotificationPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = () => {
        fetch('/api/notifications', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => setNotifications(data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchNotifications();

        const handleNotificationsUpdated = () => {
            fetchNotifications();
        };

        window.addEventListener('notifications-updated', handleNotificationsUpdated);

        return () => {
            window.removeEventListener('notifications-updated', handleNotificationsUpdated);
        };
    }, []);

    const markAllAsRead = async () => {
        try {
            const token = typeof document !== 'undefined'
                ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                : '';

            const response = await fetch('/api/notifications/mark-all-read', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to mark notifications as read.');
            }

            setNotifications((previous) =>
                previous.map((notification) => ({ ...notification, is_read: true })),
            );

            window.dispatchEvent(new Event('notifications-updated'));
        } catch (error) {
            console.error(error);
        }
    };

    const markOneAsRead = async (notificationId: number) => {
        try {
            const token = typeof document !== 'undefined'
                ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                : '';

            const response = await fetch(`/api/notifications/${notificationId}/read`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to mark notification as read.');
            }

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, is_read: true }
                        : notification,
                ),
            );

            window.dispatchEvent(new Event('notifications-updated'));
        } catch (error) {
            console.error(error);
        }
    };

    const unreadCount = notifications.filter(n => (n.type === 'request' || n.type === 'return') && !n.is_read).length;
    const hasNotifications = notifications.length > 0;
    const canMarkAllAsRead = hasNotifications && unreadCount > 0;

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
                        onClick={markAllAsRead}
                        disabled={!canMarkAllAsRead}
                        className="disabled:opacity-50"
                    >
                        Mark all as read
                    </Button>
                </div>

                {!hasNotifications ? (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 px-6 py-16 text-center">
                        <div className="rounded-full bg-gray-100 p-3 shadow-sm ring-1 ring-gray-200">
                            <BellOff className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">No notifications yet</p>
                            <p className="text-sm text-gray-500">You will see updates here once available</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <button
                                type="button"
                                key={notification.id}
                                data-href=""
                                className="flex w-full gap-4 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 cursor-pointer"
                                onClick={() => {
                                    if ((notification.type === 'request' || notification.type === 'return') && !notification.is_read) {
                                        void markOneAsRead(notification.id);
                                    }
                                }}
                            >
                                <div className="shrink-0 mt-1">
                                    {notification.type === 'request' ? (
                                        <Package className="h-6 w-6 text-blue-600" />
                                    ) : notification.type === 'return' ? (
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                    ) : notification.type === 'low_stock' ? (
                                        <Clock3 className="h-6 w-6 text-yellow-400" />
                                    ) : notification.type === 'near_expired' ? (
                                        <Clock3 className="h-6 w-6 text-orange-400" />
                                    ) : notification.type === 'expired' ? (
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                    ): null}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900">
                                        {notification.type === 'request' ? (
                                            'New vaccine request'
                                        ) : notification.type === 'return' ? (
                                            'Vaccine return submitted'
                                        ) : notification.type === 'near_expired' ? (
                                            'Vaccine batch near expiration'
                                        ) : notification.type === 'expired' ? (
                                            'Vaccine batch expired'
                                        ) : (
                                            'Low vaccine stock detected'
                                        )}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {notification.type === 'request' ? (
                                            'A new vaccine request has been submitted'
                                        ) : notification.type === 'return' ? (
                                            'A vaccine return has been successfully submitted'
                                        ) : notification.type === 'near_expired' ? (
                                            `Batch ${notification.meta?.batch_no ?? 'N/A'} expires in ${notification.meta?.expiration_date ?? 'N/A'}`
                                        ) : notification.type === 'expired' ? (
                                            `Batch ${notification.meta?.batch_no ?? 'N/A'} expired on ${notification.meta?.expiration_date ?? 'N/A'} (${notification.meta?.expiration_date ? 'expired' : 'N/A'})`
                                        ) : (
                                            'Inventory has fallen below the minimum threshold'
                                        )}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        Nurse assigned: {notification.bhc?.nurse_assigned ?? 'N/A'}
                                    </p>

                                     <p className="text-xs text-gray-500 mt-1">
                                        {notification.bhc?.barangay_name ?? notification.meta?.barangay_name ?? 'Unknown barangay'}
                                    </p>
                                </div>

                                {/* Time and Status */}
                                <div className="shrink-0 flex flex-col items-end ">
                                    <p className="text-xs text-gray-500">
                                        {new Date(notification.created_at).toLocaleString()}
                                    </p>
                                    {!notification.is_read && (
                                        <div className="h-3 w-3 bg-blue-600 rounded-full" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
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
