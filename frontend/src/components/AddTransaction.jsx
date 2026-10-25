import { useState } from 'react'

function AddTransaction({ onTransactionAdded }) {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toLocaleDateString('en-CA')
  })

  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setSaving(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/transactions/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...form,
            amount: Number(form.amount)
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to add transaction')
      }

      setMessage('Transaction added successfully!')

      setForm({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toLocaleDateString('en-CA')
      })

      if (onTransactionAdded) {
        await onTransactionAdded()
      }

    } catch (error) {
      setMessage(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="transaction-form">
      <h2>➕ Add Transaction</h2>

      <form onSubmit={handleSubmit}>

        <label>Transaction Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <label>Amount</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={form.amount}
          onChange={handleChange}
          min="0.01"
          step="0.01"
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          placeholder="Food, Travel, Salary..."
          value={form.category}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={form.description}
          onChange={handleChange}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Add Transaction'}
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default AddTransaction