import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type RequestSelectProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function Request_Select({ value, onChange }: RequestSelectProps) {

    return (
        <Select value={value} onValueChange={onChange}>
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

