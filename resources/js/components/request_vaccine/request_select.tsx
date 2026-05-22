import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { VaccineType } from "@/pages/vaccine-management/column";

type RequestSelectProps = {
    value: string;
    vaccines: VaccineType[];
    onChange: (value: string) => void;
};

export default function Request_Select({ value, vaccines, onChange }: RequestSelectProps) {

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Vaccine" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
                <SelectGroup>
                    {vaccines.map((vaccine) => (
                        <SelectItem
                            key={vaccine.id}
                            value={vaccine.id.toString()}
                        >
                            {vaccine.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )

}

