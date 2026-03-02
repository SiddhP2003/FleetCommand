from typing import Optional
from datetime import date
from pydantic import BaseModel

class MaintenanceRecordBase(BaseModel):
    service_date : date
    service_type: str
    description: Optional[str] = None
    cost: float
    vehicle_id: int 

class MaintenanceRecordCreate(MaintenanceRecordBase):
    pass 

class MaintenanceRecordUpdate(BaseModel):
    service_date: Optional[date] = None
    service_type: Optional[str] = None
    description: Optional[str] = None
    cost: Optional[float] = None

class MaintenanceRecordOut(MaintenanceRecordBase):
    id: int

    class Config:
        from_attributes = True



