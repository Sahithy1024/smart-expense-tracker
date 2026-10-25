import { useEffect, useState } from 'react'
import EditTransaction from './EditTransaction'

function TransactionHistory({ refreshKey, onTransactionDeleted }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://127.0.0.1:8000/transactions/'
        )

        if (!response.ok) {
          throw new Error('Failed to load transactions')
        }

        const data = await response.json()
        setTransactions(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [refreshKey])

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this transaction?'
  )

  if (!confirmed) return

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/transactions/${id}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete transaction')
    }

    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    )

    if (onTransactionDeleted) {
      await onTransactionDeleted()
    }
  } catch (err) {
    alert(err.message)
  }
}
const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString('en-IN')}`
const filteredTransactions = transactions
  .filter((transaction) => {
    const matchesSearch =
      transaction.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (transaction.description || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesType =
      filterType === 'all' || transaction.type === filterType

    return matchesSearch && matchesType
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  const handleExportCSV = () => {
  if (filteredTransactions.length === 0) {
    alert('No transactions to export')
    return
  }

  const headers = [
    'Date',
    'Type',
    'Category',
    'Description',
    'Amount'
  ]

  const escapeCSV = (value) =>
    `"${String(value ?? '').replace(/"/g, '""')}"`

  const rows = filteredTransactions.map((transaction) => [
    transaction.date,
    transaction.type,
    transaction.category,
    transaction.description,
    transaction.amount
  ])

  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map((row) => row.map(escapeCSV).join(','))
  ].join('\r\n')

  const blob = new Blob(['\uFEFF', csvContent], {
    type: 'text/csv;charset=utf-8;'
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = 'expense-transactions.csv'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

  return (
    <div className="transaction-history">
      <h2>📋 Transaction History</h2>
      <button
  type="button"
  className="export-btn"
  onClick={handleExportCSV}
>
  📥 Export CSV
</button>
      <div className="transaction-filters">
  <input
    type="text"
    placeholder="🔎 Search category or description..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
  >
    <option value="all">All Transactions</option>
    <option value="income">Income Only</option>
    <option value="expense">Expenses Only</option>
  </select>
</div>

      {loading && <p>Loading transactions...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && transactions.length === 0 && (
        <p>No transactions found. Add your first transaction!</p>
      )}

      {!loading && !error && transactions.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>

                    <td>{transaction.type}</td>

                    <td>{transaction.category}</td>

                    <td>{transaction.description || '-'}</td>

                    <td
                      className={
                        transaction.type === 'income'
                          ? 'amount-income'
                          : 'amount-expense'
                      }
                    >
                      {transaction.type === 'income' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </td>
                                        <td>
                    <button
                        type="button"
                        className="edit-btn"
                        onClick={() => setEditingTransaction(transaction)}
                        >
                        ✏️ Edit
                    </button>

                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleDelete(transaction.id)}
                    >
                        🗑️ Delete
                    </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    {editingTransaction && (
  <EditTransaction
    key={editingTransaction.id}
    transaction={editingTransaction}
    onClose={() => setEditingTransaction(null)}
    onUpdated={async () => {
      if (onTransactionDeleted) {
        await onTransactionDeleted()
      }
    }}
  />
)}
</div>
  )
}

export default TransactionHistory