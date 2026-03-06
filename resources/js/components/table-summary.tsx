import { Bookmark } from "lucide-react";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";



const status = [
    {
        status: "Pending Request",
        total: "5",
    },
    {
        status: "Approved Request",
        total: "10",
    },
    {
        status: "Rejected Request",
        total: "1",
    },
    {
        status: "Total Request",
        total: "16",
    },
]
export function DashboardSummary() {
    return (
        <Card className="p-4 gap-3 ">
            <div className='flex'>
                <Bookmark className='mr-2 h-5 text-yellow-500' />
                <label className="font-medium text-sm">Summary of request</label>
            </div>
            <Separator />
            <Table>
                <TableBody>
                    {status.map((stats) => (
                        <TableRow>
                            <TableCell>{stats.status}</TableCell>
                            <TableCell className="text-right">{stats.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}