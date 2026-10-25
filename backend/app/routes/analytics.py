from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..models import Transaction

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):

    total_income = db.query(
        func.sum(Transaction.amount)
    ).filter(
        Transaction.type == "income"
    ).scalar() or 0

    total_expense = db.query(
        func.sum(Transaction.amount)
    ).filter(
        Transaction.type == "expense"
    ).scalar() or 0

    balance = total_income - total_expense

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": balance
    }
@router.get("/category")
def get_category_expenses(db: Session = Depends(get_db)):

    results = db.query(
        Transaction.category,
        func.sum(Transaction.amount).label("total")
    ).filter(
        Transaction.type == "expense"
    ).group_by(
        Transaction.category
    ).all()

    return [
        {
            "category": category,
            "total": total
        }
        for category, total in results
    ]
@router.get("/monthly")
def get_monthly_expenses(db: Session = Depends(get_db)):

    results = db.query(
        func.date_trunc("month", Transaction.date).label("month"),
        func.sum(Transaction.amount).label("total")
    ).filter(
        Transaction.type == "expense"
    ).group_by(
        func.date_trunc("month", Transaction.date)
    ).order_by(
        func.date_trunc("month", Transaction.date)
    ).all()

    return [
        {
            "month": month.strftime("%Y-%m"),
            "total": total
        }
        for month, total in results
    ]