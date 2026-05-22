import { Bell, AlertTriangle } from 'lucide-react';
import { usePage } from "@inertiajs/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { VaccineBatch } from '@/pages/inventory/inventory-vaccine-batches/columns';

interface PageProps {
  [key: string]: unknown;
  lowStockBatches: VaccineBatch[];
}

export function NotificationDropdown() {

  const { lowStockBatches } = usePage<PageProps>().props;

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="h-5 w-5" />

          {lowStockBatches.length > 0 && (
            <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1 text-xs text-white">
              {lowStockBatches.length}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80">

        <div className="p-2 border-b text-sm font-medium">
          Low Stock Notifications
        </div>

        {lowStockBatches.length > 0 ? (
          lowStockBatches.map((batch) => (
            <DropdownMenuItem
              key={batch.id}
              className="flex flex-col items-start gap-1"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="font-medium text-sm">
                  {batch.vaccine.name}
                </span>
              </div>

              <span className="text-xs text-muted-foreground">
                Remaining stock: {batch.current_balance}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-3 text-sm text-muted-foreground">
            No low stock alerts
          </div>
        )}

      </DropdownMenuContent>

    </DropdownMenu>
  );
}