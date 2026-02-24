from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class TransactionCreate(BaseModel):
    amount: float
    description: str
    category: str
    date: str
    payment_method: str