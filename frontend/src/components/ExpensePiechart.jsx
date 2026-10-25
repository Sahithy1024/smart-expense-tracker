import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const COLORS = [
  '#2563eb',
  '#16a34a',
  '#f97316',
  '#9333ea',
  '#ef4444',
  '#06b6d4'
]

function ExpensePieChart({ refreshKey }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://127.0.0.1:8000/analytics/category'
        )

        if (!response.ok) {
          throw new Error('Failed to load category analytics')
        }

        const result = await response.json()

        const formattedData = result.map((item) => ({
          name: item.category,
          value: Number(item.total)
        }))

        setData(formattedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryData()
  }, [refreshKey])

  return (
    <div className="transaction-history">
      <h2>🥧 Expenses by Category</h2>

      {loading && <p>Loading chart...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>No expense data available yet.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default ExpensePieChart