import {
    Card,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "./ui/separator"
import { TableVaccineAvailability } from "./table-vaccine-availability"

export function VaccineTab() {
    return (
        <Card className="p-4 gap-3">
            <div className="flex justify-between text-center">
                <label className="font-medium text-sm">Vaccines</label>
                <span className="text-blue-500 text-xs cursor-pointer">View all</span>
            </div>
            <Separator></Separator>

            <Tabs defaultValue="availability" className="px-2" >
                <TabsList variant={"line"} className="flex justify-between w-full">
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                    <TabsTrigger value="expiredStatus">Expired Status</TabsTrigger>
                </TabsList>
                <TabsContent value='availability'>
                    <TableVaccineAvailability></TableVaccineAvailability>
                </TabsContent>
                <TabsContent value='expiredStatus'>
                    <TableVaccineAvailability></TableVaccineAvailability>
                </TabsContent>
            </Tabs>

        </Card>

    )
}
`1-`