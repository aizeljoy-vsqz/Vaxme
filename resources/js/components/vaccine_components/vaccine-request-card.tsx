import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function VaccineRequestCard() {
    return (
        <Card className="gap-2 rounded-2xl border-border/50 bg-background/80 backdrop-blur shadow-sm transition-all hover:shadow-md w-xs
    ">
            <CardHeader>
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <CardTitle className="text-sm font-medium tracking-tight">
                            Vaccine Request
                        </CardTitle>

                        <CardDescription className="mt-1 text-xs">
                            Barangay San Roque
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
                        <p className="text-xs">BCG Vaccine</p>
                        <p className="text-xs">Hepatitis B</p>
                        <p className="text-xs">Oral Polio Vaccine</p>
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
                <Button variant={"outline"} className="border border-red-400 hover:text-red-500 text-red-500">Reject</Button>
                <Button variant={"ghost"} className="bg-blue-500 hover:bg-blue-600 hover:text-white text-white">Approve</Button>
            </CardFooter>
        </Card>
    )
}
