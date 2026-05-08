'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData extends Record<string, unknown>, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = React.useState<string>("");
    const filteredData = React.useMemo(() => {
        if (!globalFilter) return data;
        const q = globalFilter.trim().toLowerCase();
        const rangeMatch = q.match(/^(\d{1,3})\s*[-–]\s*(\d{1,3})$/);
        const isRange = !!rangeMatch;
        const qLow = isRange ? parseInt(rangeMatch![1], 10) : null;
        const qHigh = isRange ? parseInt(rangeMatch![2], 10) : null;

        const parseAgeRange = (ageRange: string | undefined) => {
            if (!ageRange) return null;
            const s = ageRange.replace(/\s+/g, "");
            // formats: "20-24", "65+", "18-59"
            const m = s.match(/^(\d{1,3})-(\d{1,3})$/);
            if (m) return [parseInt(m[1], 10), parseInt(m[2], 10)];
            const plus = s.match(/^(\d{1,3})\+$/);
            if (plus) return [parseInt(plus[1], 10), Infinity];
            const single = s.match(/^(\d{1,3})$/);
            if (single) return [parseInt(single[1], 10), parseInt(single[1], 10)];
            return null;
        };

        return data.filter((row) => {
            // if query is a numeric range, try to match against `ageRange` field
            if (isRange) {
                const ar = (row as any).ageRange as string | undefined;
                const parsed = parseAgeRange(ar);
                if (!parsed) return false;
                const [aLow, aHigh] = parsed;
                return !(aHigh < (qLow as number) || aLow > (qHigh as number));
            }

            // otherwise perform a general text search across row values (including ageRange)
            return Object.values(row).some((v) =>
                String(v ?? "").toLowerCase().includes(q),
            );
        });
    }, [data, globalFilter]);
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div>
           <div className="flex items-center py-4 text-black">
            <Input
                            placeholder="Search..."
                            value={globalFilter}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="max-w-sm"
            />
          </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='text-black'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className='text-black'>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="data-[state=selected]:bg-transparent"
                                    >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4 text-black">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}