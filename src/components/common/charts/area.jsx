import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, CartesianGrid, AreaChart as Chart, XAxis, YAxis } from "recharts"

const defaultColors = [
  "var(--color-text-2)",
  "var(--color-text-3)",
  "var(--color-text-4)",
  "var(--color-primary)",
]

const AreaChart = ({ className, tooltipContentClassName, data, dataKeys = ["user"], labelName, YAxisFormatter }) => {
  const chartConfig = dataKeys.reduce((acc, key, index) => {
    acc[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: defaultColors[index % defaultColors.length],
    }
    return acc
  }, {})

  return (
    <ChartContainer config={chartConfig} className={className}>
      <Chart accessibilityLayer data={data} margin={{ top: 16 }}>
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={40}
          tickFormatter={YAxisFormatter}
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent className={tooltipContentClassName} labelName={labelName} />} />

        <defs>
          {dataKeys.map((key, index) => {
            const updatedKey = key.split(" ").join("_")
            return (
              <linearGradient
                key={updatedKey}
                id={`fill-${updatedKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={defaultColors[index % defaultColors.length]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#E1E8FF00"
                  stopOpacity={0.1}
                />
              </linearGradient>
            )
          })}
        </defs>

        {dataKeys.map((key, index) => {
          const updatedKey = key.split(" ").join("_")
          return (
            <Area
              key={updatedKey}
              dataKey={key}
              type="natural"
              stroke={defaultColors[index % defaultColors.length]}
              fill={`url(#fill-${updatedKey})`}
              fillOpacity={0.4}
              stackId="a"
            />
          )
        })}
      </Chart>
    </ChartContainer>
  )
}

export default AreaChart