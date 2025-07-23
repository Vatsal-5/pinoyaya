import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const defaultColors = [
  "var(--color-text-2)",
  "#8193CF",
  "#97A8E2",
  "#B3C1F3",
  "#C7D1F3",
  "#B3C1F3",
  "#97A8E2",
]

const HorizontalBarChart = ({ className, data, dataKeys }) => {
  const chartConfig = data.reduce((acc, curr, index) => {
    const [label] = Object.values(curr)

    acc[label] = {
      label: label,
      color: defaultColors[index],
    }

    return acc
  }, {})

  const updatedData = data.map((d, i) => ({ ...d, fill: defaultColors[i] }))
  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart layout="vertical" accessibilityLayer data={updatedData} margin={{ left: 8, top: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} />

        <YAxis
          type="category"
          dataKey={dataKeys}
          tickLine={false}
          tickMargin={6}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value]?.label
          }
        />
        <XAxis dataKey="value" type="number" hide />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="value" layout="vertical" radius={10} maxBarSize={20} />
      </BarChart>
    </ChartContainer>
  )
}

export default HorizontalBarChart