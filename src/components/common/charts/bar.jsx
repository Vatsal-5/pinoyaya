import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart as Chart, CartesianGrid, XAxis, YAxis } from "recharts"

const defaultColors = [
  "var(--color-text-2)",
  "var(--color-text-7)",
]

const BarChart = ({ className, data, dataKeys, barKeys, YAxisFormatter, colors }) => {
  const chartConfig = data.reduce((acc, curr, index) => {
    const [label] = Object.values(curr)

    acc[label] = {
      label: label,
      color: colors ? colors[index] : defaultColors[index],
    };

    return acc
  }, {})

  const updatedData = data.map((d, i) => ({ ...d, fill: colors ? colors[i] : defaultColors[i] }))
  return (
    <ChartContainer config={chartConfig} className={className}>
      <Chart accessibilityLayer data={colors ? updatedData : data}>
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={40}
          tickFormatter={YAxisFormatter}
        />
        <XAxis
          dataKey={dataKeys}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        {barKeys.map((key, index) => {
          const fillColor = colors ? colors[index] : defaultColors[index];
          return (
            <Bar
              key={index}
              dataKey={key}
              fill={fillColor}
              radius={20}
              maxBarSize={20}
            />
          );
        })}
      </Chart>
    </ChartContainer>
  );
}

export default BarChart