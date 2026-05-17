
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function VaccineRequestCard() {
    return (
        <Card className="gap-2 rounded-2xl border-border/50 bg-background/80 backdrop-blur shadow-sm transition-all hover:shadow-md w-xs md:w-full ">
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <CardTitle className="text-sm font-medium tracking-tight">
                            Vaccine Request
                        </CardTitle>

                        <CardDescription className="mt-1 text-xs">
                            Barangay Cobeng-beng
                        </CardDescription>
                    </div>

                    <Badge
                        variant="secondary"
                        className="rounded-full px-3 py-1"
                    >
                        Pending
                    </Badge>
                </div>

                <Separator />
            </CardHeader>

            <CardContent className="py-2">

                <div>
                    <div>
                        <h4 className="text-xs font-medium text-muted-foreground">
                            Requested Details
                        </h4>
                    </div>

                    <div className="space-y-2 rounded-xl bg-muted/40 p-4">
                        <p className="text-xs">John John</p>
                        <p className="text-xs">Panget</p>
                        <p className="text-xs">Di Magana</p>
                    </div>
                </div>


                <div className="flex items-center justify-between rounded-xl border bg-muted/20 px-3 py-2">
                    <span className="text-xs text-muted-foreground">
                        Vaccine Needed
                    </span>

                    <span className="font-medium text-sm">
                        Penta
                    </span>
                </div>

            </CardContent>

            <CardFooter className="flex justify-end gap-3">
                <Button variant={"outline"} className="border border-red-400 hover:text-red-500 hover:bg-red-50 text-red-500">Reject</Button>
                {/* <Button variant={"ghost"} className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white">Approve</Button> */}
                <Dialog>
                    <DialogTrigger className="py-2 px-4 text-sm rounded-md bg-blue-500 hover:bg-blue-600 hover:text-white text-white">Approve</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select Vaccines</DialogTitle>
                            <DialogDescription>
                                Choose the vaccines batch to approve for this request.  
                            </DialogDescription>
                        </DialogHeader>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a vaccine batch" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="batch1">Batch 1 - Penta (100 doses)</SelectItem>
                                    <SelectItem value="batch2">Batch 2 - Penta (50 doses)</SelectItem>
                                    <SelectItem value="batch3">Batch 3 - Penta (200 doses)</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <DialogFooter>
                           <Button variant={"outline"} className="border border-red-400 hover:text-red-500 hover:bg-red-50 text-red-500">Cancel</Button>
                           <Button variant={"ghost"} className="bg-blue-600 hover:bg-blue-700 hover:text-white text-white">Confirm</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}
