import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Vehicle(BaseModel):
    id: int
    user_id: int
    vehicle_number: str
    model: str
    manufacturer: str
    year : int

class Vehicles(BaseModel):
    vehicles: List[Vehicle]

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str

class MaintenanceRecord(BaseModel):
    id: int
    vehicle_id: int
    service_date: str
    service_type: str
    description: str
    cost: float
    created_at: str

app = FastAPI()

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

memory_db = {"vehicles": [], "users": [], "maintenance_records": []}

@app.get("/vehicles", response_model=Vehicles)
def get_vehicles():
    return Vehicles(vehicles=memory_db["vehicles"])

@app.post("/vehicles")
def add_vehicle(vehicle: Vehicle):
    memory_db["vehicles"].append(vehicle)
    return vehicle

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)




