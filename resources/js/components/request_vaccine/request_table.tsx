import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  items: { name: string; vaccine: string }[];
};

export default function RequestTable({ items }: Props) {

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
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.vaccine}</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )

}

