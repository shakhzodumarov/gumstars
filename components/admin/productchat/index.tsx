// components/admin/productchat.tsx
'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './productchart.module.scss'

interface ProductChartProps {
  data: {
    date: string
    count: number
  }[]
}

export default function ProductChart({ data }: ProductChartProps) {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getDate()}/${date.getMonth() + 1}`
            }}
          />
          <YAxis allowDecimals={false} />
          <Tooltip
            formatter={(value) => [`${value} products`, 'Count']}
            labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
          />
          <Bar dataKey="count" fill="#4f46e5" name="Products Created" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}