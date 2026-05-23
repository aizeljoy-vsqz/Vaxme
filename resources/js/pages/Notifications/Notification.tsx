import { router } from '@inertiajs/react';
import { Bell, BellOff, CheckCircle, Package, Clock3, AlertTriangle, PackageMinusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
  id: number
  type: "request" | "return" | "near_expired" | "expired" | "low_stock"
  bhc_id: number | null
  is_read: boolean
  created_at: string
  bhc?: {
    barangay_name: string
  }
  meta?: Record<string, any>
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);

    return () => clearTimeout(id);
  }, [])

  const fetchNotifications = () => {
    fetch("/api/notifications", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchNotifications()

    const handleNotificationsUpdated = () => {
      fetchNotifications()
    }

    window.addEventListener("notifications-updated", handleNotificationsUpdated)

    return () => {
      window.removeEventListener("notifications-updated", handleNotificationsUpdated)
    }
  }, [])

  const markAllAsRead = async () => {
    try {
      const token = typeof document !== 'undefined'
        ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        : ''

      const response = await fetch("/api/notifications/mark-all-read", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to mark notifications as read.")
      }

      setNotifications((previous) =>
        previous.map((notification) => ({ ...notification, is_read: true })),
      )

      window.dispatchEvent(new Event("notifications-updated"))
    } catch (error) {
      console.error(error)
    }
  }

  const markOneAsRead = async (notificationId: number) => {
    try {
      const token = typeof document !== 'undefined'
        ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        : ''

      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to mark notification as read.")
      }

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification,
        ),
      )

      window.dispatchEvent(new Event("notifications-updated"))
    } catch (error) {
      console.error(error)
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.is_read).length
  const hasNotifications = notifications.length > 0
  const canMarkAllAsRead = hasNotifications && unreadCount > 0

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Notifications</h3>
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={!canMarkAllAsRead}
              className="text-sm font-medium transition-colors disabled:text-gray-400 enabled:text-blue-600 enabled:hover:text-blue-700 cursor-pointer disabled:cursor-not-allowed"
            >
              Mark all as read
            </button>
          </div>

          {!hasNotifications ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white  px-6 py-12 text-center">
              <div className="rounded-full bg-white p-3 shadow-sm ring-1 ring-gray-200">
                <BellOff className="h-6 w-6 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">No notifications yet</p>
                <p className="text-sm text-gray-500">You will see updates here once available</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                role="button"
                tabIndex={0}
                className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 cursor-pointer"
                onClick={async () => {
                    if (!notification.is_read) {
                        await markOneAsRead(notification.id);
                    }

                    const url = notification.meta?.url;

                    if (url) {
                        router.visit(url);
                    }
                }}
              >
                <div className="shrink-0 mt-1">
                  {notification.type === "request" ? (
                    <Package className="h-6 w-6 text-blue-600" />
                  ) : notification.type === "return" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : notification.type === "low_stock" ? (
                    <PackageMinusIcon className="h-6 w-6 text-yellow-400" />
                  ) : notification.type === "near_expired" ? (
                    <Clock3 className="h-6 w-6 text-orange-400" />
                  ) : notification.type === "expired" ? (
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  ) : null}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">
                    {notification.type === 'request' ? (
                      'New vaccine request'
                    ) : notification.type === 'return' ? (
                      'Vaccine return submitted'
                    ) : notification.type === 'low_stock' ? (
                      'Low vaccine stock detected'
                    ) : notification.type === 'near_expired' ? (
                      'Vaccine batch near expiration (within 30 days)'
                    ) : notification.type === 'expired' ? (
                      'Critical vaccine expiration alert'
                    ) : (
                      'Notification'
                    )}
                  </p>

                  <p className="text-xs font-medium text-gray-700 mt-1">
                    {notification.bhc?.barangay_name ?? notification.meta?.barangay_name ?? 'Unknown barangay'}
                  </p>

                  {notification.type === 'low_stock' && notification.meta ? (
                    <p className="text-xs text-yellow-400 mt-1">
                      Current stock: {notification.meta.current_balance ?? 'N/A'} (below threshold)
                    </p>
                  ) : notification.type === 'near_expired' && notification.meta ? (
                    <p className="text-xs text-orange-400 mt-1">
                      Batch {notification.meta.batch_no ?? 'N/A'} expires on {notification.meta.expiration_date ?? 'N/A'}
                    </p>
                  ) : notification.type === 'expired' && notification.meta ? (
                    <p className="text-xs text-red-600 mt-1">
                      Batch {notification.meta.batch_no ?? 'N/A'} expired on {notification.meta.expiration_date ?? 'N/A'}
                    </p>
                  ) : null}

                  <p className="text-xs text-gray-500 mt-1">{mounted ? new Date(notification.created_at).toLocaleString() : notification.created_at}</p>
                </div>

                {!notification.is_read && (
                  <div className="shrink-0 h-3 w-3 bg-blue-600 rounded-full mt-2" />
                )}
              </div>
            ))}
            </div>
          )}

          <a href="/notifications" className="block mt-4 w-full border-t pt-4">
            <DropdownMenuItem
              disabled={!hasNotifications}
              className="flex w-full justify-center py-2 text-sm font-medium text-blue-600 hover:bg-transparent hover:text-blue-700 focus:bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
            >
              View all notifications
            </DropdownMenuItem>
          </a>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
