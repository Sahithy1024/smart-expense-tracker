import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function MonthlyBarChart({ refreshKey }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMonthlyData() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://127.0.0.1:8000/analytics/monthly'
        )

        if (!response.ok) {
          throw new Error('Failed to load monthly analytics')
        }

        const result = await response.json()

        const formattedData = result.map((item) => ({
          month: String(item.month).slice(0, 7),
          amount: Number(item.total)
        }))

        setData(formattedData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMonthlyData()
  }, [refreshKey])

  return (
    <div className="transaction-history">
      <h2>📊 Monthly Expenses</h2>

      {loading && <p>Loading chart...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>No monthly expense data available yet.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
                formatter={(value) => `₹${value}`}
              />

              <Bar
                dataKey="amount"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default MonthlyBarChart