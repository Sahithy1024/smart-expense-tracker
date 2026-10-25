# 💰 Smart Expense Tracker with Analytics

A full-stack personal finance management application that helps users track income, manage expenses, and understand spending patterns through interactive charts.

Built using **React, FastAPI, PostgreSQL, and SQLAlchemy**.

## ✨ Features

- **Financial Dashboard:** View total income, total expenses, and current balance.
- **Transaction Management:** Add, view, edit, and delete income and expense transactions.
- **Search and Filter:** Search transactions by category or description and filter by transaction type.
- **Expense Analytics:** Visualize spending by category using an interactive pie chart.
- **Monthly Analytics:** Track monthly expenses using a bar chart.
- **CSV Export:** Download filtered transaction history as a CSV file.
- **Responsive Interface:** Clean dashboard with layouts that adapt to different screen sizes.

## 🛠️ Technologies Used

### Frontend
- React
- JavaScript
- Vite
- Recharts
- HTML and CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic

### Database
- PostgreSQL

## 📁 Project Structure

```text
smart-expense-tracker/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── transactions.py
│   │   │   └── analytics.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTransaction.jsx
│   │   │   ├── EditTransaction.jsx
│   │   │   ├── TransactionHistory.jsx
│   │   │   ├── ExpensePieChart.jsx
│   │   │   └── MonthlyBarChart.jsx
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Sahithy1024/smart-expense-tracker
cd smart-expense-tracker
```

Replace `<your-repository-url>` with your GitHub repository URL.

### 2. Set Up the Database

Create a PostgreSQL database named:

```text
expense_tracker
```

### 3. Set Up the Backend

Open a terminal in the `backend` directory.

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `backend` and add:

```env
DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/expense_tracker
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

**Never commit your actual `.env` file to GitHub.**

Start the backend:

```bash
uvicorn app.main:app --reload
```

The API runs at:

`http://127.0.0.1:8000`

Interactive API documentation:

`http://127.0.0.1:8000/docs`

### 4. Set Up the Frontend

Open another terminal in the `frontend` directory.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application at:

`http://localhost:5173`

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/transactions/` | Retrieve transactions |
| POST | `/transactions/` | Add a transaction |
| PUT | `/transactions/{transaction_id}` | Update a transaction |
| DELETE | `/transactions/{transaction_id}` | Delete a transaction |
| GET | `/analytics/summary` | Retrieve financial summary |
| GET | `/analytics/category` | Retrieve expenses by category |
| GET | `/analytics/monthly` | Retrieve monthly expense totals |

## 📊 How It Works

1. Users add income or expense transactions through the React interface.
2. React sends requests to the FastAPI backend.
3. FastAPI uses SQLAlchemy to store and retrieve data from PostgreSQL.
4. The dashboard displays financial summaries and transaction history.
5. Recharts visualizes category-wise and monthly spending.
6. Users can edit, delete, search, filter, and export transactions.

## 🔮 Future Improvements

- User authentication and individual accounts
- Budget limits and spending alerts
- Date-range filtering
- Recurring transactions
- Cloud deployment

## 📄 License

This project is intended for learning and portfolio demonstration.