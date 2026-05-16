
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface CardProps {
    total: string | number
    title: string
    description: string
}

export function SectionCards({ total, title, description }: CardProps) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                    {`${total}`}
                </CardTitle>
                <CardAction>
                </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">
                    {description}
                </div>
            </CardFooter>
        </Card>
    )
}
