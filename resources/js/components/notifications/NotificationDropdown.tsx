import { usePage } from "@inertiajs/react"
import { format } from "date-fns";
import { Bell, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { VaccineBatch } from '@/pages/inventory/inventory-vaccine-batches/columns';

interface PageProps {
  [key: string]: unknown;
  lowStockBatches: VaccineBatch[];
  nearExpiryBatches: VaccineBatch[];
  expiredBatches: VaccineBatch[];
}

export function NotificationDropdown() {

  const { lowStockBatches, nearExpiryBatches, expiredBatches } = usePage<PageProps>().props;
  const [seenCount, setSeenCount] = useState(0);

  const notifications = [
    ...lowStockBatches.map((batch) => ({
      ...batch,
      type: "low_stock",
    })),

    ...nearExpiryBatches.map((batch) => ({
      ...batch,
      type: "near_expiry",
    })),

    ...expiredBatches.map((batch) => ({
      ...batch,
      type: "expired",
    })),
  ];

  const notificationCount = notifications.length;
  const unreadCount = notificationCount - seenCount;

  useEffect(() => {
    if (notificationCount > seenCount) {
      // new notifications arrived
    }
  }, [notificationCount, seenCount]);

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setSeenCount(notificationCount);
        }
      }}>

      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-2xs">

        <div className="p-2 border-b text-sm font-medium">
          Notifications
        </div>

        <div className="max-h-60 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={`${notification.type}-${notification.id}`}
                className="flex flex-col items-start gap-1"
              >
                <div className="flex items-center gap-2">

                  <AlertTriangle
                    className={`h-4 w-4 ${notification.type === "expired"
                      ? "text-red-500"
                      : notification.type === "near_expiry"
                        ? "text-orange-500"
                        : "text-yellow-500"
                      }`}
                  />

                  <span className="font-medium text-sm">
                    {notification.vaccine.name}
                  </span>
                </div>

                <span className="text-xs text-muted-foreground">

                  {notification.type === "low_stock" &&
                    `Low stock: ${notification.current_balance} remaining`}

                  {notification.type === "near_expiry" &&
                    `Near expiry: ${format(new Date(notification.expiration_date), "PPP")}`}

                  {notification.type === "expired" &&
                    `Expired: ${format(new Date(notification.expiration_date), "PPP")}`}

                </span>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              Empty. No notifications.
            </div>
          )}
        </div>


      </DropdownMenuContent>

    </DropdownMenu>
  );
}