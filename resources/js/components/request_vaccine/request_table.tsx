import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function RequestTable() {

  return (
    <Table>
      {/* <TableCaption>A list of your request items</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">Name</TableHead>
          <TableHead>Drug</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Aizel Joy Vasquez</TableCell>
          <TableCell>Neozep</TableCell>
        </TableRow>
      </TableBody>  
    </Table>
  )

}

