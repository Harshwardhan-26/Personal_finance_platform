from fastapi import FastAPI
from .database import engine, Base
from .routes import users
from .routes import transactions
from fastapi.middleware.cors import CORSMiddleware
from .routes import analytics
from . import models


app = FastAPI()

Base.metadata.create_all(bind=engine)
app.include_router(users.router, prefix="/auth")
app.include_router(transactions.router, prefix="/transactions")
app.include_router(analytics.router, prefix="/analytics")
@app.get("/")
def home():
    return {"message": "Finance AI Backend Running"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)