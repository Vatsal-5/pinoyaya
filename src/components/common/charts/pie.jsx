import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { PieChart as Chart, Pie } from "recharts"

const defaultColors = [
  "var(--color-text-7)",
  "var(--color-text-12)",
  "var(--color-text-25)",
  "var(--color-text-11)",
  "var(--color-text-2)",
  "var(--color-text-4)",
]

const PieChart = ({ className, data, dataKeys, nameKey, colors }) => {
  const updatedData = data.map((d, i) => ({ ...d, fill: (colors ?? defaultColors)[i] }))

  const chartConfig = data.reduce((acc, curr, index) => {
    const [label] = Object.values(curr)

    acc[label] = {
      label: label,
      color: (colors ?? defaultColors)[index],
    }

    return acc
  }, {})

  return (
    <ChartContainer
      config={chartConfig}
      className={className}
    >
      <Chart>
        <Pie data={updatedData} dataKey={dataKeys} />
        <ChartLegend
          content={<ChartLegendContent nameKey={nameKey} />}
          className="w-full max-w-[400px] mx-auto -translate-y-2 flex-wrap gap-y-5 *:basis-1/4 *:pl-6"
        />
      </Chart>
    </ChartContainer>
  )
}

export default PieChart