import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, BellOff, CheckCircle, Package, Clock3, AlertTriangle, TriangleAlert } from "lucide-react"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    fetch("/notifications", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error(err))
  }, [])

  const markAllAsRead = async () => {
    try {
      const token = typeof document !== 'undefined'
        ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        : ''

      const response = await fetch("/notifications/mark-all-read", {
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
    } catch (error) {
      console.error(error)
    }
  }

  const markOneAsRead = async (notificationId: number) => {
    try {
      const token = typeof document !== 'undefined'
        ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        : ''

      const response = await fetch(`/notifications/${notificationId}/read`, {
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
    } catch (error) {
      console.error(error)
    }
  }

  const unreadCount = notifications.filter(n => (n.type === 'request' || n.type === 'return') && !n.is_read).length
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
              className="text-sm font-medium transition-colors disabled:text-gray-400 enabled:text-blue-600 enabled:hover:text-blue-700"
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
                onClick={() => {
                  if ((notification.type === 'request' || notification.type === 'return') && !notification.is_read) {
                    void markOneAsRead(notification.id)
                  }
                }}
              >
                <div className="shrink-0 mt-1">
                  {notification.type === "request" ? (
                    <Package className="h-6 w-6 text-blue-600" />
                  ) : notification.type === "return" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : notification.type === "low_stock" ? (
                    <TriangleAlert className="h-6 w-6 text-orange-600" />
                  ) : notification.type === "near_expired" ? (
                    <Clock3 className="h-6 w-6 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900">
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

                  <p className="text-xs font-medium text-gray-700 mt-1">
                    {notification.bhc?.barangay_name ?? 'Unknown barangay'}
                  </p>

                  {notification.type === 'low_stock' && notification.meta ? (
                    <p className="text-xs text-red-600 mt-1">
                      Current stock: {notification.meta.current_balance ?? 'N/A'} (below threshold)
                    </p>
                  ) : notification.type === 'near_expired' && notification.meta ? (
                    <p className="text-xs text-yellow-600 mt-1">
                      Batch {notification.meta.batch_no ?? 'N/A'} expires on {notification.meta.expiration_date ?? 'N/A'}
                    </p>
                  ) : notification.type === 'expired' && notification.meta ? (
                    <p className="text-xs text-red-600 mt-1">
                      Batch {notification.meta.batch_no ?? 'N/A'} expired on {notification.meta.expiration_date ?? 'N/A'}
                    </p>
                  ) : null}

                  <p className="text-xs text-gray-500 mt-1">{new Date(notification.created_at).toLocaleString()}</p>
                </div>

                {!notification.is_read && (
                  <div className="shrink-0 h-3 w-3 bg-blue-600 rounded-full mt-2" />
                )}
              </div>
            ))}
            </div>
          )}

          <DropdownMenuItem
            disabled={!hasNotifications}
            className="mt-4 flex w-full justify-center border-t pt-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-transparent hover:text-blue-700 focus:bg-transparent disabled:cursor-not-allowed disabled:text-gray-400"
            onSelect={() => {
              if (!hasNotifications) {
                return
              }

              window.location.href = "/notifications"
            }}
          >
            View all notifications
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
