from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from db.session import get_db
from schemas.maintenanceRecords import(
    MaintenanceRecordCreate,
    MaintenanceRecordUpdate,
    MaintenanceRecordOut
)

from routers import maintenanceRecords as maintenance_crud

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

@router.post("/", response_model=MaintenanceRecordOut)
def create_maintenanceRecord(maintenanceRecord: MaintenanceRecordCreate, db: Session = Depends(get_db)):
    return maintenance_crud.create_maintenanceRecord(db, maintenanceRecord)

@router.get("/", response_model=List[MaintenanceRecordOut])
def get_vehicle_maintenance(vehicle_id: int, db: Session = Depends(get_db)):
    return maintenance_crud.get_maintenanceRecords_by_vehicle(db, vehicle_id)

@router.put("/{record_id}", response_model=MaintenanceRecordOut)
def update_maintenanceRecord(record_id: int, maintenance_update: MaintenanceRecordUpdate, db: Session = Depends(get_db)):
    record = maintenance_crud.update_maintenanceRecords(db, record_id, maintenance_update)
    if not record:
        raise HTTPException(status_code=404, detail="Record Not Found")
    return record 

# @router.delete("/{record_id}")
# def delete_maintenance(record_id: int, db: Session = Depends(get_db)):
#     record = maintenance_crud.delete_maintenanceRecord(db, record_id)
#     if not record:
#         raise HTTPException(status_code=404, detail="Record Not Found")
#     return {"message": "Record deleted"}

