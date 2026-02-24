from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Transaction
from ..schemas import TransactionCreate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.post("/add")
def add_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    new_txn = Transaction(
        user_id=1,  # temporary until auth fully wired
        amount=data.amount,
        description=data.description,
        category=data.category,
        date=data.date,
        payment_method=data.payment_method
    )

    db.add(new_txn)
    db.commit()
    return {"message": "Transaction added"}

@router.get("/")
def get_transactions(db: Session = Depends(get_db)):
    txns = db.query(Transaction).all()

    result = []
    for t in txns:
        result.append({
            "id": t.id,
            "date": str(t.date),
            "description": t.description,
            "category": t.category,
            "paymentMethod": t.payment_method,  # 🔥 map field name
            "amount": t.amount,
            "type": "income" if t.category == "Income" else "expense"
        })

    return result

@router.put("/{txn_id}")
def update_transaction(txn_id: int, data: TransactionCreate, db: Session = Depends(get_db)):
    txn = db.query(Transaction).filter(Transaction.id == txn_id).first()

    txn.amount = data.amount
    txn.description = data.description
    txn.category = data.category
    txn.date = data.date
    txn.payment_method = data.payment_method

    db.commit()
    return {"message": "Transaction updated"}

@router.delete("/{txn_id}")
def delete_transaction(txn_id: int, db: Session = Depends(get_db)):
    txn = db.query(Transaction).filter(Transaction.id == txn_id).first()
    db.delete(txn)
    db.commit()
    return {"message": "Transaction deleted"}