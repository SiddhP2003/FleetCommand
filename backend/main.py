import uvicorn 
from fastapi import FastAPI, status
from db.session import engine, create_tables
from db.base import Base
#from models import users, vehicles, maintenanceRecords
from api.routes import users, maintenanceRecords, vehicles
#from routers import maintenanceRecords, users, vehicles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

create_tables()

app = FastAPI(
    title="Fleet Command API",
    description="API for managing vehicles, users, and maintenance records.",
    docs_url="/docs",
    redoc_url="/redoc"
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

app.include_router(maintenanceRecords.router)
app.include_router(users.router)
app.include_router(vehicles.router)


