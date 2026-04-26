import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

export default function TrackVaccine() {
    return (
        <>
            <Card className="p-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label>Vaccine Return</Label>
                    <Label className="text-gray-400">current status</Label>
                </div>
                <div className="flex items-center w-full">
                    <Badge className="px-8 bg-green-500">Submitted <Check/></Badge>
                    <Separator className="shrink" />
                    <Badge className="px-8 bg-gray-200 text-gray-500">Reviewed</Badge>
                    <Separator className="shrink" />
                    <Badge className="px-8 bg-gray-200 text-gray-500">Approved</Badge>
                </div>
            </Card>
        </>
    )
}