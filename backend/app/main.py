from fastapi import FastAPI
from .database import engine, Base
from . import models
from .routes import transactions, analytics
from fastapi.middleware.cors import CORSMiddleware


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Smart Expense Tracker API",
    description="Backend API for Smart Expense Tracker",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register transaction routes
app.include_router(transactions.router)
app.include_router(analytics.router)


@app.get("/")
def home():
    return {
        "message": "Smart Expense Tracker API is running!"
    }