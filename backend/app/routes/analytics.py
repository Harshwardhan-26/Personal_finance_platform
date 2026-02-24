from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Transaction

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    txns = db.query(Transaction).all()

    total_income = sum(t.amount for t in txns if t.category == "Income")
    total_expense = sum(t.amount for t in txns if t.category != "Income")
    total_balance = total_income - total_expense

    return {
        "total_balance": total_balance,
        "total_income": total_income,
        "total_expense": total_expense,
        "savings": total_balance
    }