"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent

} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "A simple area chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartAreaDefault({ data, selectedVaccine, vaccines, onSelectVaccine }: any) { // ngett baguhin mo yung any!
  return (
    <Card>
      <CardHeader className="flex">
        <div className="w-full">
          <CardTitle>Vaccine Usage</CardTitle>
          <CardDescription>
            2026
          </CardDescription>
        </div>
        <Select
          value={selectedVaccine}
          onValueChange={onSelectVaccine}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select vaccine" />
          </SelectTrigger>

          <SelectContent>
            {vaccines?.map((vaccine: string) => (
              <SelectItem key={vaccine} value={vaccine}>
                {vaccine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Monthly vaccination usage.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
