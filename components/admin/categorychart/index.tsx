'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import styles from './categorychart.module.scss'

interface CategoryChartProps {
  data: {
    id: string
    name: string
    productCount: number
  }[]
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
  
  const chartData = data.map(item => ({
    name: item.name,
    value: item.productCount
  }))

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}