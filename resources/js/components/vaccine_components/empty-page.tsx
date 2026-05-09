import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { MessageSquare } from "lucide-react"

export default function EmptyPage() {
    return (
        <div className="flex h-8/10">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <MessageSquare />
                    </EmptyMedia>
                    <EmptyTitle>No Vaccine Inventory Added</EmptyTitle>
                    <EmptyDescription>Please add a record</EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    )
}