import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
const status = [
    {
        name: "Penta",
        status: "Low Stock",
    },
    {
        name: "Influenza",
        status: "Low Stock",
    },
    {
        name: "Tetanus",
        status: "Low Stock",
    },
   
]

export function TableVaccineAvailability() {
    return (
        <Table>   
            <TableBody>
                {status.map((stats) => (
                    <TableRow>
                        <TableCell>{stats.name}</TableCell>
                        <TableCell className="text-right"><Badge className="bg-orange-100 text-orange-400 border border-none" variant="outline">{stats.status}</Badge></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
