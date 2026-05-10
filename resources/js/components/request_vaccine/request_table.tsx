import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { X } from "lucide-react";

type Props = {
  items: { name: string; vaccine: string }[];
  handleRemove: (ind:number) => void
};

export default function RequestTable({ items,  handleRemove}: Props) {

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
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => onDelete(item.id)}
                onClick={()=>handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  )

}

