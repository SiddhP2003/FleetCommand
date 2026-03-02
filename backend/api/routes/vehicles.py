import uuid 
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session 
from typing import List

from db.session import get_db
from schemas.vehicles import VehicleCreate, VehicleUpdate, VehicleOut
from routers import vehicles as vehicle_crud

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])


@router.post("/", response_model=VehicleOut)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db)
):
    owner_id = 1 #Placeholder
    return vehicle_crud.create_vehicle(db, vehicle, owner_id)

@router.get("/{owner_id}", response_model=List[VehicleOut])
def get_vehicles_by_owner(owner_id: int, db: Session = Depends(get_db)):
    return vehicle_crud.get_vehicles_by_owner(db, owner_id)
        

@router.get("/{vehicle_id}", response_model=VehicleOut)
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    vehicle = vehicle_crud.get_vehicle(db, vehicle_id)
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle Not Found")
    return vehicle

@router.put("/{vehicle_id}", response_model=VehicleOut)
def update_vehicle(
    vehicle_id: int,
    vehicle_update: VehicleUpdate,
    db: Session = Depends(get_db)
):
        vehicle = vehicle_crud.update_vehicle(db, vehicle_id, vehicle_update)
        if not vehicle:
             raise HTTPException(status_code=404, detail="Vehicle Not Found")
        return vehicle

# @router.delete("/{vehicle_id}")
# def delete_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
#      vehicle = vehicle_crud.delete_vehicle(db, vehicle_id)
#      if not vehicle:
#           raise HTTPException(status_code=404, detail = "Vehicle Not Found")
#      return {"message": "Vehicle deleted successfully"}
