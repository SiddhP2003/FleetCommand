import uvicorn
from fastapi import FastAPI
from db.session import engine
from db.base import Base
from models import users
from models import vehicles
from models import maintenanceRecords
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="Fleet Command API",
    description="API for managing vehicles, users, and maintenance records.",
)

origins = [
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


