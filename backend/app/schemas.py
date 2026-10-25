from datetime import date
from pydantic import BaseModel


class TransactionCreate(BaseModel):
    type: str
    amount: float
    category: str
    description: str | None = None
    date: date


class TransactionResponse(TransactionCreate):
    id: int

    class Config:
        from_attributes = True