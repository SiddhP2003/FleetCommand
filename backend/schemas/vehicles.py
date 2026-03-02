from pydantic import BaseModel
from typing import Optional 

class VehicleBase(BaseModel):
    vehicle_number: str
    model: str
    manufacturer: str
    year: int 

class VehicleCreate(VehicleBase):
   pass 

class VehicleUpdate(VehicleBase):
    vehicle_number: Optional[str] = None
    model: Optional[str] = None
    manufacturer: Optional[str] = None
    year: Optional[int] = None

class VehicleOut(VehicleBase):
    id: int 
    owner_id: int 

    class Config:
        from_attributes = True
