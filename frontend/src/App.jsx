import { useEffect, useState } from 'react'
import AddTransaction from './components/AddTransaction'
import TransactionHistory from './components/TransactionHistory'
import ExpensePieChart from './components/ExpensePieChart'
import MonthlyBarChart from './components/MonthlyBarChart'
import './App.css'

function App() {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0
  })

  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [error, setError] = useState('')

  const fetchSummary = async () => {
    try {
      setError('')

      const response = await fetch(
        'http://127.0.0.1:8000/analytics/summary'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch financial data')
      }

      const data = await response.json()
      setSummary(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  const handleTransactionAdded = async () => {
  await fetchSummary()
  setRefreshKey((previous) => previous + 1)
}
const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString('en-IN')}`

  return (
    <div className="dashboard">
      <header className="header">
        <h1>💰 Smart Expense Tracker</h1>
        <p>Manage your money smarter!</p>
      </header>

      <h2>Financial Overview</h2>

      {loading && <p>Loading financial data...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div className="cards">
          <div className="card income">
            <h3>Total Income</h3>
            <p>{formatCurrency(summary.total_income)}</p>
          </div>

          <div className="card expense">
            <h3>Total Expenses</h3>
            <p>{formatCurrency(summary.total_expense)}</p>
          </div>

          <div className="card balance">
            <h3>Current Balance</h3>
            <p>{formatCurrency(summary.balance)}</p>
          </div>
        </div>
      )}

      <AddTransaction onTransactionAdded={handleTransactionAdded} />

      <TransactionHistory
        refreshKey={refreshKey}
        onTransactionDeleted={handleTransactionAdded}
      />
      <ExpensePieChart refreshKey={refreshKey} />
      <MonthlyBarChart refreshKey={refreshKey} />
    </div>
  )
}

export default App