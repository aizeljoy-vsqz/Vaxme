import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Request_Select() {

    return (
        <Select>
            <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Vaccine" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
                <SelectGroup>
                    <SelectItem value="light">Penta</SelectItem>
                    <SelectItem value="dark">Tetanus</SelectItem>
                    <SelectItem value="system">Zietza</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )

}

