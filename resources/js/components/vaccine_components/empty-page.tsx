import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { MessageSquare } from "lucide-react"

interface emptyPageType{
    title: string,
    description: string
}

export default function EmptyPage({title, description}:emptyPageType) {
    return (
        <div className='flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4'>
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <MessageSquare />
                    </EmptyMedia>
                    <EmptyTitle>{title}</EmptyTitle>
                    <EmptyDescription>{description}</EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    )
}